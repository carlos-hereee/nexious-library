import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Form from "@nxs-template/Form";
import FormField from "@nxs-molecules/forms/FormField";
import type { AddEntryProps, FieldValueProps } from "nxs-form";

expect.extend(toHaveNoViolations);

// ── Form.fieldAddons ──
// The map is keyed by field NAME, the key a consumer's form config already speaks, while Form keys
// the fields it renders by a generated fieldId. These cases pin that the lookup goes by name, that
// the node lands on exactly the field named and no other, that a form without the prop renders no
// trace of the slot, and that a repeating entry group never receives one. A native button stands in
// for the consumer's node because the library Button drops props it does not list.

const addon = <button type="button">Help</button>;

const shellOf = (labelText: string) => screen.getByLabelText(labelText).closest(".field-shell") as HTMLElement;

const hoursEntry: AddEntryProps = {
  additionLabel: "Add another",
  removalLabel: "Remove",
  groupName: "hours",
  initialValues: { day: "" },
  types: { day: "text" },
  fieldHeading: {},
  labels: { day: "Day" },
  onMultiply: { additionLabel: "Add another", name: "hours", removalLabel: "Remove" },
  max: 5,
  canMultiply: true,
};

const hoursSlot = (sharedKey: string): FieldValueProps[] => [
  {
    value: "",
    name: "day",
    placeholder: "",
    type: "text",
    label: "Day",
    fieldId: `${sharedKey}-day`,
    sharedKey,
    group: "hasHours",
    groupName: "hours",
    canMultiply: true,
    canRemove: true,
    onMultiply: hoursEntry.onMultiply,
  },
];

describe("Form fieldAddons", () => {
  it("renders no row or addon node when the prop is absent", () => {
    const { container } = render(
      <Form initialValues={{ title: "", tagline: "" }} labels={{ title: "Title", tagline: "Tagline" }} onSubmit={() => {}} />
    );
    expect(container.querySelector(".field-label-row")).toBeNull();
    expect(container.querySelector(".field-addon")).toBeNull();
  });

  it("puts the node beside the named field only", () => {
    const { container } = render(
      <Form
        initialValues={{ title: "", tagline: "" }}
        labels={{ title: "Title", tagline: "Tagline" }}
        fieldAddons={{ title: addon }}
        onSubmit={() => {}}
      />
    );
    expect(container.querySelectorAll(".field-addon")).toHaveLength(1);
    expect(shellOf("Title").querySelector(".field-label-row > .field-addon")).toContainElement(
      screen.getByRole("button", { name: "Help" })
    );
    expect(shellOf("Tagline").querySelector(".field-label-row")).toBeNull();
    expect(shellOf("Tagline").querySelector(".field-addon")).toBeNull();
  });

  it("ignores a key that names no field", () => {
    const { container } = render(
      <Form initialValues={{ title: "" }} labels={{ title: "Title" }} fieldAddons={{ body: addon }} onSubmit={() => {}} />
    );
    expect(container.querySelector(".field-addon")).toBeNull();
    expect(screen.queryByRole("button", { name: "Help" })).not.toBeInTheDocument();
  });

  it("renders the addon with hidden labels and keeps the label as the control's name", () => {
    const { container } = render(
      <Form initialValues={{ title: "" }} labels={{ title: "Title" }} hideLabels fieldAddons={{ title: addon }} onSubmit={() => {}} />
    );
    expect(container.querySelector(".field-label-row > label")).toHaveClass("sr-only");
    expect(screen.getByLabelText("Title")).toBe(screen.getByRole("textbox"));
    expect(screen.getByRole("button", { name: "Help" })).toBeInTheDocument();
  });

  it("never forwards an addon into a repeating entry group", () => {
    // Three keys on purpose: the top level title, the checkbox that opens the group (no shell, so
    // nowhere to render), and the group's own field name, which Form does look up because the
    // group's first field sits in the top level list. Only the first may render.
    render(
      <Form
        initialValues={{ title: "", hasHours: true }}
        labels={{ title: "Title", hasHours: "Set hours" }}
        types={{ hasHours: "checkbox" }}
        addEntry={{ hasHours: hoursEntry }}
        entries={{ hours: [{ day: "Monday" }] }}
        fieldAddons={{ title: addon, hasHours: addon, day: addon }}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Help" })).toHaveLength(1);
    expect(shellOf("Title").querySelector(".field-addon")).toBeInTheDocument();
    expect(shellOf("Day").querySelector(".field-label-row")).toBeNull();
    expect(shellOf("Day").querySelector(".field-addon")).toBeNull();
  });

  it("has no axe violations with an addon beside a shown label", async () => {
    const { container } = render(
      <Form initialValues={{ title: "" }} labels={{ title: "Title" }} fieldAddons={{ title: addon }} onSubmit={() => {}} />
    );
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it("has no axe violations with an addon beside a hidden label", async () => {
    const { container } = render(
      <Form initialValues={{ title: "" }} labels={{ title: "Title" }} hideLabels fieldAddons={{ title: addon }} onSubmit={() => {}} />
    );
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });
});

describe("FormField entry branch", () => {
  it("drops the addon it was handed before rendering the group's slots", () => {
    // The entry branch spreads its own props into every slot's Field, so without an explicit reset
    // a node meant for the group's checkbox would appear once per slot. Rendered directly so the
    // guard is tested on its own, without Form's seeding in the way.
    render(
      <FormField
        name="hasHours"
        type="checkbox"
        value
        placeholder=""
        label="Set hours"
        fieldId="hasHours"
        isEntry
        entry={hoursEntry}
        entries={{ "hours-1": hoursSlot("hours-1"), "hours-2": hoursSlot("hours-2") }}
        activeEntry="hours-1"
        addon={addon}
        confirmRemoval={false}
        handleChange={() => {}}
        setActiveEntry={() => {}}
        onMultiplyClick={() => {}}
        onRemovalClick={() => {}}
        setConfirmRemovals={() => {}}
      />
    );
    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Help" })).not.toBeInTheDocument();
  });
});
