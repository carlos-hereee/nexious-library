import type { Meta, StoryObj } from "@storybook/react";
import Dialog from "./Dialog";

/**
 * Dialog is the modal/panel shell (close button, optional header, body slot).
 *
 * Gotcha: the focus trap + Escape-to-close are OPT-IN via `asModal`. Leave it
 * OFF when you already wrap Dialog in your own modal shell (e.g. the client's
 * DialogOverlay, which owns its own backdrop + focus trap) to avoid nested
 * dialog semantics and double-Escape handling; turn it ON for a standalone
 * modal. `header` is `{ heading, subtitle, data }` (all optional);
 * `onDialogClose` fires from the built-in X (and from Escape when asModal).
 */
const meta: Meta<typeof Dialog> = {
  title: "Templates/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "text" },
    asModal: { control: "boolean" },
    onDialogClose: { action: "close" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

/** Plain dialog (no focus trap) — the shape used inside a parent modal shell. */
export const Default: Story = {
  args: {
    header: { heading: "Confirm action", subtitle: "This cannot be undone" },
    children: "Dialog body content goes here.",
  },
};

/** Standalone modal: focus trap + Escape-to-close enabled. */
export const AsModal: Story = {
  name: "As modal (focus trap + Escape)",
  args: {
    asModal: true,
    header: { heading: "Modal dialog" },
    children: "Focus is trapped here and Escape closes the dialog.",
  },
};

/** No header: just the close button and a body. */
export const NoHeader: Story = {
  args: {
    children: "A bare dialog with only a body and the close button.",
  },
};
