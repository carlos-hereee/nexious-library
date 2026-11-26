import type { Meta, StoryObj } from "@storybook/react";
import Button from "@nxs-atoms/buttons/Button";
import CardGrid from "@nxs-molecules/card/CardGrid";
import Card from "./Card";

// The nxs-card recipe (2026-11 item 337). Every story passes its copy in, as a consumer would;
// the card has no text of its own. The legacy `data` branch is covered by Card.test.tsx and the
// client's /docs preview, and is not shown here so no one builds on it.
const meta: Meta<typeof Card> = {
  title: "Organism/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    headingLevel: { control: "select", options: [2, 3, 4, 5, 6] },
    as: { control: "select", options: ["div", "article", "li"] },
    isSelected: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Content: Story = {
  args: {
    title: "Spring sale",
    subtitle: "Ends Friday",
    children: <p>Every sticker in the shop is half off through the weekend.</p>,
    footer: <Button label="Shop the sale" variant="primary" />,
  },
};

export const WithMedia: Story = {
  args: {
    ...Content.args,
    media: <img src="https://picsum.photos/seed/nxs-card/640/320" alt="" />,
  },
};

// Clickable through the title link: its overlay covers the card, the card lifts, and the footer
// button stays its own tab stop above the overlay. The card itself is never a button.
export const LinkedThroughTitle: Story = {
  args: {
    as: "article",
    title: (
      <a href="#iron-forge" className="nxs-card-link">
        Iron Forge
      </a>
    ),
    subtitle: "Strength gym, Houston",
    footer: <Button label="Manage" variant="secondary" />,
  },
};

// The state is announced by the title button's aria-pressed; the card only shows it.
export const Selected: Story = {
  args: {
    isSelected: true,
    title: (
      <button type="button" className="nxs-card-link" aria-pressed="true">
        Pro plan
      </button>
    ),
    subtitle: "Billed monthly",
  },
};

export const InAGrid: Story = {
  render: () => (
    <CardGrid>
      <Card title="Pages" subtitle="Three published">
        <p>Your landing page and two more.</p>
      </Card>
      <Card
        title={
          <a href="#store" className="nxs-card-link">
            Store
          </a>
        }
        subtitle="Twelve products"
      />
      <Card title="Calendar" subtitle="Four events this week" footer={<Button label="Add event" variant="tertiary" />} />
    </CardGrid>
  ),
};
