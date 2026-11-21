import type { Meta, StoryObj } from "@storybook/react";
import ProgressRing from "./ProgressRing";

// A percent as a circular arc (2026-11 item 387, Phase 1). The value always prints as text, so the
// arc is never the only carrier of the number; the hero shows its label, or the caller's children,
// as a caption inside the ring.
const meta: Meta<typeof ProgressRing> = {
  title: "Molecules/ProgressRing",
  component: ProgressRing,
  tags: ["autodocs"],
  args: { label: "Course ready", value: 50 },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const Hero: Story = { args: { size: "hero" } };

export const Empty: Story = { args: { value: 0, size: "large" } };
export const Half: Story = { args: { value: 50, size: "large" } };
export const Full: Story = { args: { value: 100, size: "large" } };

// The caller's own caption inside the hero ring, with a formatted value in place of the percent.
export const HeroWithChildren: Story = {
  args: {
    size: "hero",
    label: "Weekly goal",
    value: 60,
    valueText: "3 of 5",
    children: <span>applications</span>,
  },
};
