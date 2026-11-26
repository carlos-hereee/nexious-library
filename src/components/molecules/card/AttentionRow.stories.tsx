import type { Meta, StoryObj } from "@storybook/react";
import AttentionRow from "./AttentionRow";

// AttentionRow (2026-11 item 337, Phase 5): one attention item as a ListRow whose link name leads
// with the severity word. Every string arrives translated from the caller.
const meta: Meta<typeof AttentionRow> = {
  title: "Molecules/AttentionRow",
  component: AttentionRow,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AttentionRow>;

export const WithDismiss: Story = {
  args: {
    title: "Connect Stripe for Iron Forge",
    detail: "Its store is live but cannot take payments yet",
    severityLabel: "Revenue blocked",
    actionLabel: "Connect Stripe",
    href: "#store",
    lead: "!",
    onDismiss: () => undefined,
    dismissLabel: "Dismiss notification",
  },
};

export const TitleOnly: Story = {
  args: { title: "Two bookings need a reply", severityLabel: "Needs attention", href: "#bookings", lead: "?" },
};
