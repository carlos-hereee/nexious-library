import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Molecules/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    theme: { control: "text" },
    title: { control: "text" },
    isDisable: { control: "boolean" },
    ping: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    title: "Home",
    icon: { icon: "home" },
  },
};

export const WithLabel: Story = {
  args: {
    title: "Settings",
    icon: { icon: "cog", label: "Settings" },
  },
};

export const WithPing: Story = {
  args: {
    title: "Notifications",
    icon: { icon: "bell" },
    ping: 3,
  },
};

export const Themed: Story = {
  args: {
    title: "Edit",
    icon: { icon: "edit" },
    theme: "btn-primary",
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled",
    icon: { icon: "lock" },
    isDisable: true,
  },
};
