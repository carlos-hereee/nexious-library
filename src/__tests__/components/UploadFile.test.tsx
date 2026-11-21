// UploadFile's two modes (2026-11 item 385 Phase 3, D6 option (a)).
//
// The default mode is pinned first, because every existing consumer (the Form's file field through
// fieldRegistry renderFile, and the client docs preview) passes no renderTrigger and must render and
// behave exactly as before the prop existed. The renderTrigger mode is pinned second: the
// consumer's own element opens the picker, the picked File reaches onSelect, and nothing is echoed
// back that the consumer did not pick. jsdom has no native button activation (Enter and Space on a
// focused <button> do not synthesize a click there, and the library carries no user-event), so the
// keyboard and touch path is pinned by asserting the trigger is a real <button type="button">,
// which is what gives it Enter, Space and tap activation in a browser.
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import UploadFile from "@nxs-molecules/forms/UploadFile";
import Field from "@nxs-molecules/forms/Field";
import type { FormFieldProps, UploadFileTriggerProps } from "nxs-form";

expect.extend(toHaveNoViolations);

const axeClean = async (container: HTMLElement) =>
  // Isolated renders are not pages, so the landmark rule only false positives here.
  expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();

const PICKED_PREVIEW_URL = "blob:picked-preview";

const makeImage = (fileName = "hero.png") => new File(["pixels"], fileName, { type: "image/png" });

const fileInputOf = (container: HTMLElement) => {
  const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]');
  if (!fileInput) throw new Error("UploadFile rendered no file input");
  return fileInput;
};

const pickFile = (fileInput: HTMLInputElement, file: File) =>
  fireEvent.change(fileInput, { target: { files: [file] } });

// The consumer an in place image editor would write: a real button named by the consumer, with
// the consumer's own preview inside it.
const ImageTrigger = ({ openPicker, isDisabled }: UploadFileTriggerProps) => (
  <button type="button" onClick={openPicker} aria-disabled={isDisabled || undefined}>
    <img src="/hero.png" alt="" />
    <span className="sr-only">Change hero image</span>
  </button>
);

let createObjectURL: jest.Mock;
let clickSpy: jest.SpyInstance;

beforeEach(() => {
  // jsdom implements neither, and the default mode previews a picked File through an object URL.
  createObjectURL = jest.fn(() => PICKED_PREVIEW_URL);
  Object.defineProperty(URL, "createObjectURL", { configurable: true, value: createObjectURL });
  clickSpy = jest.spyOn(HTMLInputElement.prototype, "click").mockImplementation(() => {});
});

afterEach(() => {
  clickSpy.mockRestore();
});

describe("UploadFile without renderTrigger keeps its default render and behavior", () => {
  it("draws the label, the choose button and the preview, and echoes value on mount", async () => {
    const onSelect = jest.fn();
    const { container } = render(
      <UploadFile input={{ name: "logo" }} label="Logo" value="/logo.png" onSelect={onSelect} selectLabel="Pick" />
    );
    expect(container.querySelector(".field-upload")).toBeInTheDocument();
    expect(container.querySelector("label")).toHaveTextContent("Logo");
    expect(screen.getByRole("button", { name: "Pick" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove File" })).toBeInTheDocument();
    expect(container.querySelector(".preview-hero-container")).toHaveTextContent("Image Preview");
    expect(fileInputOf(container)).toHaveAttribute("name", "logo");
    expect(onSelect).toHaveBeenCalledWith("/logo.png");
    await axeClean(container);
  });

  it("opens the picker from the choose button and hands back the picked File with a preview", () => {
    const onSelect = jest.fn();
    const { container } = render(<UploadFile input={{ name: "logo" }} label="Logo" value="" onSelect={onSelect} />);
    expect(onSelect).toHaveBeenLastCalledWith("");
    expect(screen.queryByRole("button", { name: "Remove File" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Choose a file" }));
    expect(clickSpy).toHaveBeenCalledTimes(1);
    const image = makeImage();
    pickFile(fileInputOf(container), image);
    expect(onSelect).toHaveBeenLastCalledWith(image);
    expect(createObjectURL).toHaveBeenCalledWith(image);
    expect(screen.getByRole("button", { name: "Remove File" })).toBeInTheDocument();
  });

  it("removes the file with an empty string", () => {
    const onSelect = jest.fn();
    render(<UploadFile input={{ name: "logo" }} label="Logo" value="/logo.png" onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: "Remove File" }));
    expect(onSelect).toHaveBeenLastCalledWith("");
    expect(screen.queryByRole("button", { name: "Remove File" })).not.toBeInTheDocument();
  });

  it("disables the choose button with input.isDisabled", () => {
    render(<UploadFile input={{ name: "logo", isDisabled: true }} label="Logo" value="" onSelect={jest.fn()} />);
    expect(screen.getByRole("button", { name: "Choose a file" })).toBeDisabled();
  });

  it("renders the default control through the Form's file field (fieldRegistry renderFile)", () => {
    const handleChange = jest.fn();
    const fieldProps: FormFieldProps = {
      name: "photo",
      value: "",
      placeholder: "",
      label: "Photo",
      type: "file",
      fieldId: "photo-id",
      handleChange,
    };
    const { container } = render(<Field {...fieldProps} />);
    expect(container.querySelector(".field-upload")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Choose a file" })).toBeInTheDocument();
    const image = makeImage("photo.png");
    pickFile(fileInputOf(container), image);
    expect(handleChange).toHaveBeenLastCalledWith(image);
  });
});

describe("UploadFile with renderTrigger hands the picker to the consumer's element", () => {
  it("renders only the consumer's trigger beside the hidden input", async () => {
    const { container } = render(
      <UploadFile
        input={{ name: "hero" }}
        label="Change hero image"
        value="/hero.png"
        onSelect={jest.fn()}
        selectLabel="Pick"
        renderTrigger={(trigger) => <ImageTrigger {...trigger} />}
      />
    );
    const trigger = screen.getByRole("button", { name: "Change hero image" });
    // A native button is what carries Enter, Space and touch activation in a browser.
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger).toHaveAttribute("type", "button");
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Pick" })).not.toBeInTheDocument();
    expect(container.querySelector(".field-upload")).not.toBeInTheDocument();
    expect(container.querySelector(".preview-hero-container")).not.toBeInTheDocument();
    expect(container.querySelector("label")).not.toBeInTheDocument();
    const fileInput = fileInputOf(container);
    expect(fileInput).toHaveAttribute("hidden");
    expect(fileInput).toHaveAttribute("accept", "image/*");
    expect(fileInput).not.toHaveAttribute("name");
    await axeClean(container);
  });

  it("opens the picker when the consumer's trigger is activated", () => {
    render(
      <UploadFile
        input={{ name: "hero" }}
        label="Change hero image"
        value=""
        onSelect={jest.fn()}
        renderTrigger={(trigger) => <ImageTrigger {...trigger} />}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Change hero image" }));
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("hands the picked File to onSelect, never echoes value, and mints no object URL", () => {
    const onSelect = jest.fn();
    const { container, rerender } = render(
      <UploadFile
        input={{ name: "hero" }}
        label="Change hero image"
        value="/hero.png"
        onSelect={onSelect}
        renderTrigger={(trigger) => <ImageTrigger {...trigger} />}
      />
    );
    rerender(
      <UploadFile
        input={{ name: "hero" }}
        label="Change hero image"
        value="/other.png"
        onSelect={onSelect}
        renderTrigger={(trigger) => <ImageTrigger {...trigger} />}
      />
    );
    expect(onSelect).not.toHaveBeenCalled();
    const image = makeImage();
    pickFile(fileInputOf(container), image);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(image);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it("clears the input after each pick so the same file can be picked again", () => {
    const onSelect = jest.fn();
    const { container } = render(
      <UploadFile
        input={{ name: "hero" }}
        label="Change hero image"
        value=""
        onSelect={onSelect}
        renderTrigger={(trigger) => <ImageTrigger {...trigger} />}
      />
    );
    const fileInput = fileInputOf(container);
    const valueSetter = jest.fn();
    Object.defineProperty(fileInput, "value", { configurable: true, get: () => "", set: valueSetter });
    pickFile(fileInput, makeImage());
    expect(valueSetter).toHaveBeenCalledWith("");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("ignores a change that carries no file", () => {
    const onSelect = jest.fn();
    const { container } = render(
      <UploadFile
        input={{ name: "hero" }}
        label="Change hero image"
        value=""
        onSelect={onSelect}
        renderTrigger={(trigger) => <ImageTrigger {...trigger} />}
      />
    );
    fireEvent.change(fileInputOf(container), { target: { files: [] } });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("passes isDisabled to the trigger and keeps the picker shut while disabled", () => {
    const renderTrigger = jest.fn((trigger: UploadFileTriggerProps) => <ImageTrigger {...trigger} />);
    render(
      <UploadFile
        input={{ name: "hero", isDisabled: true }}
        label="Change hero image"
        value=""
        onSelect={jest.fn()}
        renderTrigger={renderTrigger}
      />
    );
    expect(renderTrigger).toHaveBeenLastCalledWith(expect.objectContaining({ isDisabled: true }));
    const trigger = screen.getByRole("button", { name: "Change hero image" });
    expect(trigger).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(trigger);
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
