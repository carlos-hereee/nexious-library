import type { Meta, StoryObj } from "@storybook/react";
import Button from "@nxs-atoms/buttons/Button";
import ActiveSelectionBar from "./ActiveSelectionBar";

const meta: Meta<typeof ActiveSelectionBar> = {
  title: "Molecules/ActiveSelectionBar",
  component: ActiveSelectionBar,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof ActiveSelectionBar>;

export const Default: Story = {
  args: {
    label: "Studying",
    value: "Fractions and decimals",
    changeLabel: "Change",
  },
};

// The caller's own controls sit before the change button, inside the same actions group.
export const WithActions: Story = {
  args: {
    ...Default.args,
    changeAriaLabel: "Change the deck you are studying",
    actions: <Button variant="ghost" size="small" label="Theme" />,
  },
};
