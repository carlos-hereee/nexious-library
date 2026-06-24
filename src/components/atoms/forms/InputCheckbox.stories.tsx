import type { Meta, StoryObj } from "@storybook/react";
import InputCheckbox from "./InputCheckbox";

/**
 * InputCheckbox: a single checkbox with an associated `<label>`.
 *
 * Gotcha: label/input association is by `name` — the input renders `id={name}`
 * and the Label renders `htmlFor={name}`. They MUST match or clicking the label
 * will not toggle the box (this is the DOM-structure regression item 38 flags).
 * `value` is the checked boolean and the control is fully controlled, so wire
 * `onChange` to flip it. `error` renders an `role="alert"` node above the box and
 * is wired to the input via `aria-describedby`. `populateLink` swaps the plain
 * label for one with inline hyperlinks (used for terms-of-service style copy).
 */
const meta: Meta<typeof InputCheckbox> = {
  title: "Atoms/InputCheckbox",
  component: InputCheckbox,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    value: { control: "boolean" },
    theme: { control: "text" },
    hideLabel: { control: "boolean" },
    error: { control: "text" },
    isDisabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof InputCheckbox>;

/** Unchecked. */
export const Unchecked: Story = {
  args: {
    name: "terms",
    label: "I agree to the terms",
    value: false,
  },
};

/** Checked. */
export const Checked: Story = {
  args: {
    name: "terms",
    label: "I agree to the terms",
    value: true,
  },
};

/** With a validation error (announced via role="alert" + aria-describedby). */
export const WithError: Story = {
  args: {
    name: "terms",
    label: "I agree to the terms",
    value: false,
    error: "You must accept the terms",
  },
};

/** Disabled. */
export const Disabled: Story = {
  args: {
    name: "terms",
    label: "Locked option",
    value: true,
    isDisabled: true,
  },
};
