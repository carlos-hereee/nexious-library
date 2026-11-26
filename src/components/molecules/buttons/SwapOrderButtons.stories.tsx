import type { Meta, StoryObj } from "@storybook/react";
import SwapOrderButtons from "./SwapOrderButtons";

const meta: Meta<typeof SwapOrderButtons> = {
  title: "Molecules/SwapOrderButtons",
  component: SwapOrderButtons,
  tags: ["autodocs"],
  argTypes: {
    onMove: { action: "moved" },
    position: { control: "number" },
    count: { control: "number" },
    disabled: { control: "boolean" },
  },
  // The pair renders as a fragment, so each story gives it the row it would sit in.
  decorators: [
    (Story) => (
      <div className="nxs-button-group">
        <span>Fractions</span>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SwapOrderButtons>;

export const Default: Story = {
  args: {
    position: 1,
    count: 3,
    upLabel: "Move Fractions up",
    downLabel: "Move Fractions down",
  },
};

// The first row: Move up disables itself, so no caller has to remember the top.
export const AtTop: Story = {
  args: { ...Default.args, position: 0 },
};

// The last row: Move down disables itself.
export const AtBottom: Story = {
  args: { ...Default.args, position: 2 },
};
