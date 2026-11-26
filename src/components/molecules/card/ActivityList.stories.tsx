import type { Meta, StoryObj } from "@storybook/react";
import ActivityList from "./ActivityList";

// ActivityList (2026-11 item 337, Phase 5): recent activity rows; the caller prints the timestamp
// and may pass its router link as linkComponent.
const meta: Meta<typeof ActivityList> = {
  title: "Molecules/ActivityList",
  component: ActivityList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActivityList>;

const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const recentItems = [
  { id: "order", title: "Order 1042", description: "Paid, 2 items", href: "#orders", timestamp: "2026-11-12T10:00:00Z", icon: "$" },
  { id: "booking", title: "Booking with Sam", description: "Friday at 3 pm", href: "#bookings", timestamp: "2026-11-11T10:00:00Z" },
  { id: "notice", title: "Store opened", timestamp: "2026-11-10T10:00:00Z" },
];

export const Recent: Story = {
  args: { ariaLabel: "Recent activity", formatTimestamp, items: recentItems },
};

export const Limited: Story = {
  args: { ariaLabel: "Recent activity", formatTimestamp, items: recentItems, limit: 2 },
};
