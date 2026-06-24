import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

/**
 * Select is a styled wrapper over a native `<select>`.
 *
 * Gotcha: `name` is REQUIRED. It is the id the visible `<Label htmlFor>` binds
 * to AND the aria-label fallback when labels are hidden, so omitting it leaves
 * screen-reader users with an unlabelled control (the historical "Select just
 * renders nothing / an error" symptom traces back to a missing name). Pass
 * `list` as `OptionProps[]` (`{ name, value, label, uid }`); `active` is the
 * currently selected value; `placeholder` is the disabled first row (defaults
 * to "Choose Selection" — pass a localized string to avoid hardcoded English).
 */
const meta: Meta<typeof Select> = {
  title: "Molecules/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    active: { control: "text" },
    placeholder: { control: "text" },
    theme: { control: "text" },
    hideLabels: { control: "boolean" },
    clearSelection: { control: "boolean" },
    isDisabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const currencies = [
  { uid: "usd", name: "usd", value: "usd", label: "US Dollar" },
  { uid: "eur", name: "eur", value: "eur", label: "Euro" },
  { uid: "mxn", name: "mxn", value: "mxn", label: "Mexican Peso" },
];

/** Default: a named select with a placeholder and nothing selected yet. */
export const Default: Story = {
  args: {
    name: "currency",
    label: "Currency",
    list: currencies,
    placeholder: "Choose a currency",
  },
};

/** A value is selected via `active`. */
export const WithSelection: Story = {
  args: {
    name: "currency",
    label: "Currency",
    list: currencies,
    active: "eur",
  },
};

/** `clearSelection` adds a clear (x) button once a value is chosen. */
export const Clearable: Story = {
  args: {
    name: "currency",
    label: "Currency",
    list: currencies,
    active: "usd",
    clearSelection: true,
  },
};

/** Disabled control. */
export const Disabled: Story = {
  args: {
    name: "currency",
    label: "Currency",
    list: currencies,
    active: "usd",
    isDisabled: true,
  },
};
