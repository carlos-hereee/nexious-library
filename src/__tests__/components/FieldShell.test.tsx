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
