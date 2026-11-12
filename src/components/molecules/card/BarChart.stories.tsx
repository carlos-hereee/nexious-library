import type { Meta, StoryObj } from "@storybook/react";
import BarChart from "./BarChart";

// BarChart (2026-11 item 337, Phase 5): bars as one named image, a tick per bar up to
// maxTickLabels, then a first and last label plus a hidden table of every value.
const meta: Meta<typeof BarChart> = {
  title: "Molecules/BarChart",
  component: BarChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

const VALUES = [4, 9, 2, 14, 7, 0, 11, 6, 3, 12, 8, 5, 10, 1];
const points = VALUES.map((value, index) => ({ id: `2026-11-${String(index + 1).padStart(2, "0")}`, label: `11/${index + 1}`, value }));

export const OneWeek: Story = {
  args: { ariaLabel: "Visits per day, last 7 days", points: points.slice(0, 7) },
};

export const TwoWeeksRange: Story = {
  args: { ariaLabel: "Visits per day, last 14 days", points },
};

export const MoneyValues: Story = {
  args: {
    ariaLabel: "Sales per day",
    points: points.slice(0, 5),
    formatValue: (value: number) => `$${value.toFixed(2)}`,
    formatTick: (value: number) => `$${value}`,
  },
};
