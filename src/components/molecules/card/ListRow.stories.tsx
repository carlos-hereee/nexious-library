import type { Meta, StoryObj } from "@storybook/react";
import Button from "@nxs-atoms/buttons/Button";
import ListRow from "./ListRow";

// The nxs-list-row recipe (2026-11 item 337). Rows are flush; the group draws the dividers, so
// the list stories put them in a `ul.nxs-list-row-group`. Every string is passed in.
const meta: Meta<typeof ListRow> = {
  title: "Molecules/ListRow",
  component: ListRow,
  tags: ["autodocs"],
  argTypes: {
    isDense: { control: "boolean" },
    isSelected: { control: "boolean" },
    headingLevel: { control: "select", options: [undefined, 2, 3, 4, 5, 6] },
  },
};

export default meta;
type Story = StoryObj<typeof ListRow>;

const Glyph = () => (
  <svg viewBox="0 0 24 24" role="presentation">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>
);

export const Default: Story = {
  args: {
    lead: <Glyph />,
    title: "Order 1042",
    subtitle: "Two items, shipped",
    meta: <time dateTime="2026-11-12">Nov 12</time>,
    actions: <Button label="Refund" variant="secondary" size="small" />,
  },
};

export const Dense: Story = {
  args: { ...Default.args, isDense: true },
};

export const Selected: Story = {
  args: { ...Default.args, isSelected: true },
};

// Navigable through the title link: the overlay covers the row and the Refund button stays a
// separate tab stop above it.
export const InAGroupWithLinks: Story = {
  render: () => (
    <ul className="nxs-list-row-group" aria-label="Recent orders">
      {["1042", "1041", "1040"].map((order) => (
        <ListRow
          key={order}
          as="li"
          lead={<Glyph />}
          title={
            <a href={`#order-${order}`} className="nxs-list-row-link">
              {`Order ${order}`}
            </a>
          }
          subtitle="Two items"
          meta="Nov 12"
          actions={<Button label="Refund" variant="secondary" size="small" />}
        />
      ))}
    </ul>
  ),
};
