import type { Meta, StoryObj } from "@storybook/react";
import Card from "@nxs-organism/card/Card";
import GridSection from "./GridSection";

// GridSection (2026-11 item 337, Phase 5): a titled section over a CardGrid whose heading can take
// focus from an overview jump; an empty hint replaces the grid and keeps the header.
const meta: Meta<typeof GridSection> = {
  title: "Molecules/GridSection",
  component: GridSection,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GridSection>;

export const WithCards: Story = {
  args: {
    id: "installed",
    title: "Installed",
    supporting: "Plugins this app runs",
    children: (
      <>
        <Card title="Store" subtitle="Sell products and memberships" />
        <Card title="Calendar" subtitle="Events and bookings" />
      </>
    ),
  },
};

export const EmptyHint: Story = {
  args: { id: "available", title: "Available", emptyHint: "Nothing to add yet" },
};
