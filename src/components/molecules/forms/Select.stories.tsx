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
 * to "Choose Selection", pass a localized string to avoid hardcoded English).
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
    className: { control: "text" },
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

const foods = [
  { uid: "fruit", label: "Fruit", options: [{ uid: "apple", name: "apple", value: "apple", label: "Apple" }] },
  {
    uid: "veg",
    label: "Vegetables",
    options: [
      { uid: "kale", name: "kale", value: "kale", label: "Kale" },
      { uid: "leek", name: "leek", value: "leek", label: "Leek" },
    ],
  },
];

/** `value` selects by option value (2026-11 item 337); `active` is ignored when it is set. */
export const ByValue: Story = {
  args: { name: "currency", label: "Currency", list: currencies, value: "mxn" },
};

/** `groups` renders optgroups after `list`, here selected by value with a localized clear label. */
export const OptionGroups: Story = {
  args: {
    name: "food",
    label: "Food",
    list: [],
    groups: foods,
    value: "leek",
    placeholder: "Pick a food",
    clearSelection: true,
    clearLabel: "Clear the food",
  },
};

/** `labelId` names the control by a label the caller already renders, with no aria-label fallback. */
export const NamedByLabelId: Story = {
  render: (args) => (
    <>
      <p id="story-currency-heading">Payout currency</p>
      <Select {...args} name="payout-currency" list={currencies} labelId="story-currency-heading" value="" placeholder="Choose a currency" />
    </>
  ),
};
