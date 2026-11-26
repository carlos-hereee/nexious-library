import type { Meta, StoryObj } from "@storybook/react";
import StatusPill from "./StatusPill";

// StatusPill (2026-11 item 337, Phase 5): the word is required, so color never carries the state
// alone; the glyph is an optional second shape.
const meta: Meta<typeof StatusPill> = {
  title: "Molecules/StatusPill",
  component: StatusPill,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusPill>;

export const Neutral: Story = { args: { label: "Pending" } };

export const EveryTone: Story = {
  render: () => (
    <p>
      <StatusPill label="Pending" /> <StatusPill label="Shipped" tone="info" /> <StatusPill label="Paid" tone="success" icon="+" />{" "}
      <StatusPill label="On hold" tone="warning" /> <StatusPill label="Refunded" tone="danger" />{" "}
      <StatusPill label="Paid" tone="success" size="medium" />
    </p>
  ),
};
