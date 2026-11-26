import type { Meta, StoryObj } from "@storybook/react";
import Icon from "@nxs-atoms/assets/Icon";
import SelectCard from "./SelectCard";

const meta: Meta<typeof SelectCard> = {
  title: "Molecules/SelectCard",
  component: SelectCard,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SelectCard>;

// onClick only: the card renders as a button.
export const Button: Story = {
  args: {
    title: "Pages",
    subtitle: "Three published, one draft",
    icon: <Icon icon="home" />,
    onClick: () => {},
  },
};

// href only: a plain anchor. Pass linkAs with your router's Link for an in-app route.
export const Link: Story = {
  args: { ...Button.args, onClick: undefined, href: "#pages" },
};

export const Selected: Story = {
  args: { ...Button.args, selected: true },
};

// disabled: an inert tile that announces itself as disabled and never lifts. The badge rides in
// as children.
export const Disabled: Story = {
  args: {
    title: "Analytics",
    subtitle: "Charts for your store",
    icon: <Icon icon="star" />,
    disabled: true,
    children: <span>Coming soon</span>,
  },
};
