import { formatInitialFormValues, formatFieldEntry } from "@nxs-utils/form/formatForm";
import type { AddEntryProps } from "nxs-form";

describe("formatInitialFormValues", () => {
  it("converts an object into an array of single-key objects", () => {
    expect(formatInitialFormValues({ name: "alice", age: 30 })).toEqual([{ name: "alice" }, { age: 30 }]);
  });

  it("returns an empty array for undefined input", () => {
    // @ts-expect-error — function signature allows undefined at runtime
    expect(formatInitialFormValues(undefined)).toEqual([]);
  });

  it("returns an empty array for an empty object", () => {
    expect(formatInitialFormValues({})).toEqual([]);
  });
});

describe("formatFieldEntry", () => {
  const formatValues = [{ email: "" }, { password: "" }, { customField: "hello" }];

  it("uses initLabels when no override is provided", () => {
    const out = formatFieldEntry({ formatValues });
    expect(out.find((f) => f.name === "email")?.label).toBe("Email");
    expect(out.find((f) => f.name === "password")?.label).toBe("Password");
  });

  it('falls back to "No label added" when the field has no init label and no override', () => {
    const out = formatFieldEntry({ formatValues });
    expect(out.find((f) => f.name === "customField")?.label).toBe("No label added");
  });

  it("prefers caller-provided labels over initLabels", () => {
    const out = formatFieldEntry({ formatValues, labels: { email: "Your email" } });
    expect(out.find((f) => f.name === "email")?.label).toBe("Your email");
  });

  it("applies caller-provided types", () => {
    const out = formatFieldEntry({ formatValues, types: { password: "password" } });
    expect(out.find((f) => f.name === "password")?.type).toBe("password");
  });

  it("coerces null/undefined to false when the field type is a checkbox", () => {
    // value is "" (falsy) and type is "checkbox" — should become false
    const out = formatFieldEntry({
      formatValues: [{ subscribe: "" }],
      types: { subscribe: "checkbox" },
    });
    expect(out[0].value).toBe(false);
    expect(out[0].type).toBe("checkbox");
  });

  it("uses caller placeholder if provided, else falls back to initPlaceholders", () => {
    const out = formatFieldEntry({ formatValues, placeholders: { email: "you@here.com" } });
    expect(out.find((f) => f.name === "email")?.placeholder).toBe("you@here.com");
    // password keeps the init default
    expect(out.find((f) => f.name === "password")?.placeholder).toBe("Enter password ..");
  });

  it("generates a unique fieldId for every entry", () => {
    const out = formatFieldEntry({ formatValues });
    const ids = out.map((f) => f.fieldId);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toBeTruthy());
  });

  it("attaches addEntry metadata when provided", () => {
    const addEntry: AddEntryProps = {
      additionLabel: "Add address",
      removalLabel: "Remove",
      groupName: "addresses",
      initialValues: { street: "" },
      types: {},
      labels: {},
      fieldHeading: {},
      onMultiply: { additionLabel: "Add", name: "addresses", removalLabel: "Remove" },
      canMultiply: true,
    };
    const out = formatFieldEntry({ formatValues: [{ street: "" }], addEntry, sharedKey: "k1", group: "addresses" });
    expect(out[0].groupName).toBe("addresses");
    expect(out[0].canMultiply).toBe(true);
    expect(out[0].canRemove).toBe(true);
    expect(out[0].onMultiply).toEqual({
      additionLabel: "Add address",
      name: "addresses",
      removalLabel: "Remove",
    });
    expect(out[0].sharedKey).toBe("k1");
  });

  it("defaults canMultiply to false when not specified on addEntry", () => {
    const addEntry: AddEntryProps = {
      additionLabel: "Add",
      removalLabel: "Remove",
      groupName: "addresses",
      initialValues: {},
      types: {},
      labels: {},
      fieldHeading: {},
      onMultiply: { additionLabel: "Add", name: "addresses", removalLabel: "Remove" },
    };
    const out = formatFieldEntry({ formatValues: [{ street: "" }], addEntry });
    expect(out[0].canMultiply).toBe(false);
  });
});
