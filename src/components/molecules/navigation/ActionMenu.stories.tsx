import type { Meta, StoryObj } from "@storybook/react";
import ActionMenu from "./ActionMenu";

// The shared dropdown menu (2026-11 item 337, Phase 5). Open it, then walk it with the arrows,
// Home and End; Escape returns focus to the trigger. The disabled entry stays focusable so a screen
// reader still announces it.
const meta: Meta<typeof ActionMenu> = {
  title: "Molecules/ActionMenu",
  component: ActionMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

export const RowActions: Story = {
  args: {
    label: "Barber actions",
    entries: [
      { id: "edit", label: "Edit", onSelect: () => {} },
      { id: "schedule", label: "View schedule", href: "https://example.com/schedule" },
      { id: "archive", label: "Archive", isDisabled: true, hint: "Barbers with bookings cannot be archived" },
      { id: "remove", label: "Remove", isDanger: true, onSelect: () => {} },
    ],
  },
};

export const OpensFromTheStartEdge: Story = {
  args: {
    label: "Deck actions",
    align: "start",
    trigger: <span>Actions</span>,
    entries: [
      { id: "rename", label: "Rename", onSelect: () => {} },
      { id: "duplicate", label: "Duplicate", onSelect: () => {} },
    ],
  },
};
