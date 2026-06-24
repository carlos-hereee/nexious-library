import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "@nxs-atoms/forms/Input";
import InputCheckbox from "@nxs-atoms/forms/InputCheckbox";
import Label from "@nxs-atoms/forms/Label";
import TextArea from "@nxs-molecules/forms/TextArea";

describe("Input accessibility", () => {
  it("sets aria-invalid and aria-describedby when an error is present", () => {
    render(<Input name="email" error="Required" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("omits the error wiring when there is no error", () => {
    render(<Input name="email" />);
    const input = screen.getByRole("textbox");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });
});

describe("Label error", () => {
  it("renders the error in an alert region carrying the id the input points to", () => {
    render(<Label name="email" label="Email" error="Required" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "email-error");
    expect(alert).toHaveTextContent("Required");
  });
});

describe("TextArea accessibility", () => {
  it("wires aria-invalid/aria-describedby and surfaces the error in an alert", () => {
    render(<TextArea input={{ name: "bio", value: "", label: "Bio" }} error="Required" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("aria-describedby", "bio-error");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "bio-error");
  });
});

describe("InputCheckbox accessibility", () => {
  it("wires aria-invalid/aria-describedby to a single alert error", () => {
    render(<InputCheckbox name="tos" value={false} label="Accept" error="Required" onChange={jest.fn()} />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-invalid", "true");
    expect(box).toHaveAttribute("aria-describedby", "tos-error");
    expect(screen.getByRole("alert")).toHaveAttribute("id", "tos-error");
  });
});
