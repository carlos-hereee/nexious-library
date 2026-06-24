import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

/**
 * Label is the form field label. It auto-capitalizes the first letter of the
 * text, so pass lowercase keys (`email`) and let it title-case for display.
 *
 * Gotcha: `name` is what wires accessibility — it sets `htmlFor={name}` (so the
 * label only toggles/focuses its input when that input renders `id={name}`),
 * and when `error` is present the error span renders under the predictable id
 * `${name}-error` with role="alert" so the matching input can point
 * `aria-describedby` at it. Always pass `name`, even when the label looks purely
 * decorative.
 */
const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    message: { control: "text" },
    theme: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/** Default label (note the auto-capitalized first letter). */
export const Default: Story = {
  args: { name: "email", label: "email address" },
};

/** With a validation error (role="alert" + `${name}-error` id). */
export const WithError: Story = {
  args: { name: "email", label: "email address", error: "Required" },
};

/** With a success message. */
export const WithSuccess: Story = {
  args: { name: "email", label: "email address", message: "Looks good" },
};
