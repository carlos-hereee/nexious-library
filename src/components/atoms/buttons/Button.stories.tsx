import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    onDragStart: { action: "dragStart" },
    onDragEnd: { action: "dragEnd" },
    theme: { control: "text" },
    label: { control: "text" },
    title: { control: "text" },
    isDisable: { control: "boolean" },
    ping: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Click me",
  },
};

export const Themed: Story = {
  args: {
    label: "Primary",
    theme: "btn-primary",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    isDisable: true,
  },
};

export const WithPing: Story = {
  args: {
    label: "Notifications",
    ping: 5,
  },
};

export const WithChildren: Story = {
  args: {
    children: "Custom content",
  },
};

export const AriaLabelOverride: Story = {
  name: "Accessible (aria-label)",
  args: {
    // icon-only close button — no visible label, aria-label provides the accessible name
    "aria-label": "Close dialog",
    theme: "btn-icon",
  },
};
