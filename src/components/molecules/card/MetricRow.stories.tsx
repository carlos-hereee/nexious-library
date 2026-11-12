import type { Meta, StoryObj } from "@storybook/react";
import MetricRow from "./MetricRow";

// The stat band (2026-11 item 337, Phase 5). Values arrive formatted by the caller; a tile with no
// value shows its empty text instead of a misleading zero.
const meta: Meta<typeof MetricRow> = {
  title: "Molecules/MetricRow",
  component: MetricRow,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MetricRow>;

export const OwnerHome: Story = {
  args: {
    ariaLabel: "This month",
    entries: [
      { id: "sales", label: "Store sales", value: "$1,240.00", delta: "+12%", trend: "up", trendLabel: "Up" },
      { id: "members", label: "Members", value: "38", delta: "-3%", trend: "down", trendLabel: "Down" },
      { id: "bookings", label: "Bookings", value: "14", hint: "Confirmed only" },
      { id: "views", label: "Page views", emptyText: "Not available yet" },
    ],
  },
};

export const ScrollingStrip: Story = {
  args: {
    isScrollable: true,
    entries: [
      { id: "events", label: "Events", value: "6" },
      { id: "players", label: "Players", value: "120" },
      { id: "matches", label: "Matches", value: "48" },
      { id: "teams", label: "Teams", value: "16" },
      { id: "rounds", label: "Rounds", value: "4" },
    ],
  },
};
