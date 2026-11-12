import type { Meta, StoryObj } from "@storybook/react";
import DiscountNote from "./DiscountNote";

// DiscountNote (2026-11 item 337, Phase 5): one money line under a total, both parts caller formatted.
const meta: Meta<typeof DiscountNote> = {
  title: "Molecules/DiscountNote",
  component: DiscountNote,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DiscountNote>;

export const MemberDiscount: Story = {
  args: { label: "Member discount (20% off)", amount: "-$4.00" },
};
