import type { Meta, StoryObj } from "@storybook/react";
import DialogOverlay from "./DialogOverlay";

/**
 * DialogOverlay is the complete, drop-in modal: a portaled (to `document.body`),
 * scroll-locked, dimmed backdrop wrapping `Dialog` with `asModal` (focus trap + Escape +
 * `role="dialog"` / `aria-modal`). Click the backdrop or press Escape to close.
 *
 * Reach for this when you want a conformant modal out of the box. Use the bare `Dialog`
 * instead when you already own a modal shell and only need the panel markup.
 */
const meta: Meta<typeof DialogOverlay> = {
  title: "Templates/DialogOverlay",
  component: DialogOverlay,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    theme: { control: "text" },
    closeOnBackdropClick: { control: "boolean" },
    onDialogClose: { action: "close" },
  },
};

export default meta;
type Story = StoryObj<typeof DialogOverlay>;

/** Default modal: backdrop click and Escape both dismiss. */
export const Default: Story = {
  args: {
    header: { heading: "Delete project?", subtitle: "This cannot be undone" },
    children: "Focus is trapped here, the page behind cannot scroll, and Escape or a backdrop click closes it.",
  },
};

/** Destructive confirm: disable backdrop dismiss so the choice is deliberate (Escape still closes). */
export const NoBackdropDismiss: Story = {
  name: "Backdrop dismiss disabled",
  args: {
    closeOnBackdropClick: false,
    header: { heading: "Confirm payment" },
    children: "With closeOnBackdropClick={false}, a stray backdrop click cannot cancel the flow.",
  },
};
