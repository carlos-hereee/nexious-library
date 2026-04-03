import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "text" },
    size: {
      control: "select",
      options: ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x"],
    },
    spin: {
      control: "select",
      options: [undefined, "spin", "pulse"],
    },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "home",
    hideHints: true,
  },
};

export const Large: Story = {
  args: {
    icon: "home",
    size: "3x",
    hideHints: true,
  },
};

export const Spinning: Story = {
  args: {
    icon: "cog",
    size: "2x",
    spin: "spin",
    hideHints: true,
  },
};

export const Colored: Story = {
  args: {
    icon: "star",
    size: "2x",
    color: "#f5a623",
    hideHints: true,
  },
};
