import type { Meta, StoryObj } from "@storybook/react";
import RankList from "./RankList";

// RankList (2026-11 item 337, Phase 5): ranked rows with a caller formatted figure.
const meta: Meta<typeof RankList> = {
  title: "Molecules/RankList",
  component: RankList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RankList>;

export const TopPages: Story = {
  args: {
    ariaLabel: "Top pages",
    emptyLabel: "No visits yet",
    rows: [
      { id: "home", label: "Home", meta: "/", value: "1,204" },
      { id: "store", label: "Store", meta: "/store", value: "482" },
      { id: "long", label: "A very long page title that ends in an ellipsis instead of pushing the figure out", value: "17" },
    ],
  },
};

export const Empty: Story = {
  args: { rows: [], emptyLabel: "No visits yet" },
};
