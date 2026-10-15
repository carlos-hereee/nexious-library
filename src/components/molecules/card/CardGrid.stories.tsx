import type { Meta, StoryObj } from "@storybook/react";
import Icon from "@nxs-atoms/assets/Icon";
import CardGrid from "./CardGrid";
import SelectCard from "./SelectCard";

const meta: Meta<typeof CardGrid> = {
  title: "Molecules/CardGrid",
  component: CardGrid,
  tags: ["autodocs"],
  argTypes: {
    as: { control: "radio", options: ["div", "nav"] },
  },
};

export default meta;
type Story = StoryObj<typeof CardGrid>;

const cards = (
  <>
    <SelectCard title="Landing page" subtitle="Your home page" icon={<Icon icon="home" />} onClick={() => {}} />
    <SelectCard title="About" subtitle="Published" icon={<Icon icon="info" />} href="#about" />
    <SelectCard title="Gallery" subtitle="Draft" icon={<Icon icon="star" />} onClick={() => {}} selected />
    <SelectCard title="Analytics" subtitle="Not built yet" icon={<Icon icon="eye" />} disabled>
      <span>Coming soon</span>
    </SelectCard>
  </>
);

// Resize the canvas: the columns follow the width, down to one, with no breakpoint.
export const Default: Story = {
  args: { children: cards },
};

// The cards are the way through a section, so the grid is a named navigation landmark.
export const AsNav: Story = {
  args: { as: "nav", ariaLabel: "Quick links", children: cards },
};
