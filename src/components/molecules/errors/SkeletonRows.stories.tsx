import type { Meta, StoryObj } from "@storybook/react";
import SkeletonRows from "./SkeletonRows";

// SkeletonRows (2026-11 item 337, Phase 5): rows shaped like the real ones, aria-hidden beside the
// caller's live region. Below the tablet breakpoint the columns fold to two.
const meta: Meta<typeof SkeletonRows> = {
  title: "Molecules/SkeletonRows",
  component: SkeletonRows,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SkeletonRows>;

export const OrdersShape: Story = {
  args: {
    count: 5,
    columns: [{ width: "5rem" }, { width: "1fr" }, { width: "1fr" }, { width: "6rem", shape: "pill" }, { width: "4rem" }],
  },
};

export const WithLiveRegion: Story = {
  render: () => (
    <div>
      <p role="status">Loading orders</p>
      <SkeletonRows columns={[{ width: "1fr" }, { width: "8rem", shape: "pill" }]} />
    </div>
  ),
};
