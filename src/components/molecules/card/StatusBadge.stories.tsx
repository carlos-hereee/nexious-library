import type { Meta, StoryObj } from "@storybook/react";
import StatusBadge from "./StatusBadge";

// StatusBadge (2026-11 item 337, Phase 5): a ladder rung on StatusPill. The library knows no
// ladder, so the Ladder story sets each tier's colors from tokens the way a caller's stylesheet
// would.
const meta: Meta<typeof StatusBadge> = {
  title: "Molecules/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

const LADDER_STYLES = `.nxs-status-badge-legend { --nxs-status-badge-bg: var(--info-bg); --nxs-status-badge-fg: var(--info-text); --nxs-status-badge-border: var(--info-border); }
.nxs-status-badge-owner { --nxs-status-badge-bg: var(--success-bg); --nxs-status-badge-fg: var(--success-text); --nxs-status-badge-border: var(--success-border); }`;

export const Neutral: Story = { args: { label: "Partner", tier: "partner", title: "Your platform standing" } };

export const Small: Story = { args: { label: "Partner", tier: "partner", size: "small" } };

export const Ladder: Story = {
  render: () => (
    <div>
      <style>{LADDER_STYLES}</style>
      <p>
        <StatusBadge label="Partner" tier="partner" /> <StatusBadge label="Legend" tier="legend" glyph="*" />{" "}
        <StatusBadge label="Owner" tier="owner" glyph="+" />
      </p>
    </div>
  ),
};
