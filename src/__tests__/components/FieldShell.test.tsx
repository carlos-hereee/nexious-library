import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Field from "@nxs-molecules/forms/Field";
import type { FormFieldProps } from "nxs-form";

const baseProps = (over: Partial<FormFieldProps> = {}): FormFieldProps => ({
  name: "title",
  value: "",
  placeholder: "",
  label: "Title",
  type: "text",
  fieldId: "title-id",
  handleChange: jest.fn(),
  ...over,
});

// Every control in the library points aria-describedby at `${name}-error` when it is invalid.
// Seven of the nine field types used to render that node INSIDE the Label, so hiding the label
// deleted the thing the description pointed at and a screen reader announced "invalid" with no
// reason. The shell owns the node now, which is what makes this true for all of them at once.
describe("the error node cannot dangle, with or without a visible label", () => {
  const types: [string, Partial<FormFieldProps>][] = [
    ["text", {}],
    ["textarea", { type: "textarea" }],
    ["select", { type: "select", dataList: { title: [] } }],
    ["number", { type: "number" }],
    ["date", { type: "date" }],
    ["date-time", { type: "date-time" }],
    ["date-day", { type: "date-day" }],
    ["price-dollars-cents", { type: "price-dollars-cents" }],
    ["datalist", { type: "datalist", dataList: { title: [] } }],
  ];

  it.each(types)("renders exactly one #title-error for type %s with the label hidden", (_label, over) => {
    const { container } = render(<Field {...baseProps({ ...over, hideLabels: true, formError: "Required" })} />);
    const nodes = container.querySelectorAll("#title-error");
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toHaveAttribute("role", "alert");
    expect(nodes[0]).toHaveTextContent("Required");
  });

  it.each(types)("renders exactly one #title-error for type %s with the label shown", (_label, over) => {
    const { container } = render(<Field {...baseProps({ ...over, formError: "Required" })} />);
    // One node, not two: the shell renders the error and deliberately does not also hand it to
    // the Label, or two elements would share the id that aria-describedby resolves.
    expect(container.querySelectorAll("#title-error")).toHaveLength(1);
  });

  it("renders no error node when there is no error", () => {
    const { container } = render(<Field {...baseProps()} />);
    expect(container.querySelectorAll("#title-error")).toHaveLength(0);
  });
});

describe("every field type renders through one shell", () => {
  it.each([
    ["text", {}],
    ["textarea", { type: "textarea" }],
    ["select", { type: "select", dataList: { title: [] } }],
    ["date", { type: "date" }],
    ["date-time", { type: "date-time" }],
    ["date-day", { type: "date-day" }],
    ["date-week", { type: "date-week" }],
  ] as [string, Partial<FormFieldProps>][])("wraps type %s in .field-shell", (_label, over) => {
    const { container } = render(<Field {...baseProps(over)} />);
    expect(container.querySelector(".field-shell")).toBeInTheDocument();
  });

  it("routes date-day and date-week to the same control", () => {
    // They used to be a Select and a DataList: two visual languages for one closed set of seven.
    const day = render(<Field {...baseProps({ type: "date-day" })} />);
    const dayTag = day.container.querySelector(".field-shell")?.querySelector("select")?.tagName;
    day.unmount();
    const week = render(<Field {...baseProps({ type: "date-week" })} />);
    const weekTag = week.container.querySelector(".field-shell")?.querySelector("select")?.tagName;
    expect(dayTag).toBe("SELECT");
    expect(weekTag).toBe("SELECT");
  });

  it("still dispatches auth fields by NAME ahead of the type map", () => {
    // auth dispatch keys on the field name, not its type. Folding it into the registry would
    // route a password field by type and silently lose the show/hide toggle.
    render(<Field {...baseProps({ name: "password", label: "Password" })} />);
    expect(screen.getByRole("button", { name: /show password/i })).toBeInTheDocument();
  });

  it("falls back to a text input for an unknown type instead of rendering nothing", () => {
    const { container } = render(<Field {...baseProps({ type: "not-a-real-type" })} />);
    expect(container.querySelector("input[type='text']")).toBeInTheDocument();
  });
});

// ── The addon slot ──
// A consumer may place one node beside a field's label (Form fieldAddons, FieldShell addon). The
// library attaches no meaning to it. Two things make the slot safe to publish to every consumer at
// once: with no addon the markup is pinned byte for byte to what shipped before the slot existed,
// and with one the node is a SIBLING of the <label>, so it neither joins the control's accessible
// name nor focuses the control when pressed. A native button stands in for the consumer's node
// because the library Button drops props it does not list.
describe("the addon slot", () => {
  const addon = <button type="button">Help</button>;

  // Captured from the build BEFORE the slot existed. Never edit these to make a change pass: a
  // difference here is a change every consumer form on the platform would see on its next install.
  const TEXT_FIELD_BEFORE_THE_SLOT =
    '<div class="field-shell"><label for="title" class="field-label"><span class="label-name">Title</span> </label><input class="highlight" autocomplete="on" placeholder="" id="title" type="text" value="" name="title"></div>';
  const HIDDEN_LABEL_WITH_ERROR_BEFORE_THE_SLOT =
    '<div class="field-shell"><label for="title" class="field-label sr-only"><span class="label-name">Title</span> </label><input class="highlight" autocomplete="on" placeholder="" aria-invalid="true" aria-describedby="title-error" id="title" type="text" value="" name="title"><span class="required field-error" id="title-error" role="alert">Required</span></div>';
  const MESSAGE_AND_ERROR_BEFORE_THE_SLOT =
    '<div class="field-shell"><label for="title" class="field-label"><span class="label-name">Title</span> <span class="success">Looks good</span></label><input class="highlight" autocomplete="on" placeholder="" aria-invalid="true" aria-describedby="title-error" id="title" type="text" value="" name="title"><span class="required field-error" id="title-error" role="alert">Required</span></div>';

  it("renders the exact pre slot markup when no addon is given", () => {
    expect(render(<Field {...baseProps()} />).container.innerHTML).toBe(TEXT_FIELD_BEFORE_THE_SLOT);
  });

  it("renders the exact pre slot markup with a hidden label and an error", () => {
    const { container } = render(<Field {...baseProps({ hideLabels: true, formError: "Required" })} />);
    expect(container.innerHTML).toBe(HIDDEN_LABEL_WITH_ERROR_BEFORE_THE_SLOT);
  });

  it("renders the exact pre slot markup with a message and an error", () => {
    const { container } = render(<Field {...baseProps({ formError: "Required", formMessage: "Looks good" })} />);
    expect(container.innerHTML).toBe(MESSAGE_AND_ERROR_BEFORE_THE_SLOT);
  });

  // Every type the registry routes through the shell, the auth branch that builds its own, and the
  // text fallback for an unknown type. Miss one in the registry and that type alone loses its addon
  // with nothing else failing, which is what this list exists to catch.
  const shellTypes: [string, Partial<FormFieldProps>][] = [
    ["text", {}],
    ["textarea", { type: "textarea" }],
    ["select", { type: "select", dataList: { title: [] } }],
    ["datalist", { type: "datalist", dataList: { title: [] } }],
    ["number", { type: "number" }],
    ["file", { type: "file" }],
    ["price-dollars-cents", { type: "price-dollars-cents" }],
    ["date", { type: "date" }],
    ["date-time", { type: "date-time" }],
    ["date-day", { type: "date-day" }],
    ["date-week", { type: "date-week" }],
    ["auth, dispatched by name", { name: "password", label: "Password" }],
    ["unknown type, text fallback", { type: "not-a-real-type" }],
  ];

  it.each(shellTypes)("adds no row wrapper to %s without an addon", (_label, over) => {
    const { container } = render(<Field {...baseProps(over)} />);
    expect(container.querySelector(".field-label-row")).toBeNull();
    expect(container.querySelector(".field-addon")).toBeNull();
    // The label is a direct child of the shell, exactly where it has always been.
    expect(container.querySelector(".field-shell > label.field-label")).toBeInTheDocument();
  });

  it.each(shellTypes)("renders the addon for %s", (_label, over) => {
    const { container } = render(<Field {...baseProps({ ...over, addon })} />);
    expect(container.querySelectorAll(".field-shell > .field-label-row > .field-addon")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Help" })).toBeInTheDocument();
  });

  it("renders the label first and the addon last inside one row", () => {
    const { container } = render(<Field {...baseProps({ addon })} />);
    const row = container.querySelector(".field-shell > .field-label-row");
    expect(row).toBeInTheDocument();
    expect(row?.children).toHaveLength(2);
    expect(row?.children[0]).toBe(container.querySelector("label.field-label"));
    expect(row?.children[1]).toHaveClass("field-addon");
    expect(row?.children[1]).toContainElement(screen.getByRole("button", { name: "Help" }));
  });

  it("keeps the addon outside the label element", () => {
    const { container } = render(<Field {...baseProps({ addon })} />);
    expect(container.querySelector("label button")).toBeNull();
    // Exact match on purpose: had the button landed inside the label, the label would read
    // "Title Help" and the control's accessible name would carry the addon's copy.
    expect(screen.getByLabelText("Title")).toBe(screen.getByRole("textbox"));
  });

  it("still renders the addon when the label is hidden, and the hidden label still names the control", () => {
    const { container } = render(<Field {...baseProps({ addon, hideLabels: true })} />);
    const row = container.querySelector(".field-shell > .field-label-row");
    expect(row?.querySelector("label")).toHaveClass("field-label", "sr-only");
    expect(row?.querySelector(".field-addon button")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBe(screen.getByRole("textbox"));
  });

  it("keeps the error node owned by the shell, after the control, with an addon present", () => {
    const { container } = render(<Field {...baseProps({ addon, formError: "Required" })} />);
    const nodes = container.querySelectorAll("#title-error");
    expect(nodes).toHaveLength(1);
    const shell = container.querySelector(".field-shell") as HTMLElement;
    const children = Array.from(shell.children);
    // Row, then the control, then the error: the addon changes nothing below the label line.
    expect(children[0]).toHaveClass("field-label-row");
    expect(children[children.length - 1]).toBe(nodes[0]);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-describedby", "title-error");
  });

  it("ignores the addon on a checkbox, which renders no FieldShell", () => {
    // InputCheckbox owns its own <label> and has never rendered inside the FieldShell component
    // (its wrapper borrows the field-shell CLASS for spacing parity, which is why the class is not
    // asserted on here), so there is no label row to place a node in. Wrapping it only when an
    // addon is present would hand the field a second label and a layout that differs from the same
    // checkbox without one.
    const { container } = render(<Field {...baseProps({ type: "checkbox", value: false, addon })} />);
    expect(container.querySelector(".field-label-row")).toBeNull();
    expect(container.querySelector(".field-addon")).toBeNull();
    expect(screen.queryByRole("button", { name: "Help" })).not.toBeInTheDocument();
  });
});
