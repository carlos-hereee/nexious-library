import type { Meta, StoryObj } from "@storybook/react";
import ListItem from "./ListItem";

/**
 * ListItem renders a single item in a navigation list.
 *
 * When the item has an href or link, it renders a real <a>. When the item
 * has no href, it renders a <button> (for actions like opening a modal or
 * triggering a command). Active items receive aria-current="page".
 *
 * ListItem is an <li>, so stories wrap it in a <ul> to render standalone.
 */
const meta: Meta<typeof ListItem> = {
  title: "Molecules/Navigation/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  argTypes: {
    activePath: { control: "text" },
    hideIcons: { control: "boolean" },
    theme: { control: "text" },
    handleClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "1rem" }}>
        <Story />
      </ul>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ListItem>;

/** Anchor with icon and label. */
export const Anchor: Story = {
  args: {
    item: { name: "about", label: "About", value: "/about", icon: "info", href: "/about" },
  },
};

/** Anchor currently active: marked aria-current="page" with .is-active class. */
export const AnchorActive: Story = {
  args: {
    item: { name: "about", label: "About", value: "/about", icon: "info", href: "/about" },
    activePath: "/about",
  },
};

/** External link opens in a new tab with rel="noopener noreferrer". */
export const ExternalLink: Story = {
  args: {
    item: {
      name: "docs",
      label: "Docs",
      value: "docs",
      icon: "book",
      href: "https://companyuno.com",
      external: true,
    },
  },
};

/** No href. Renders as a button for action style nav items. */
export const ActionButton: Story = {
  args: {
    item: { name: "logout", label: "Log out", value: "logout", icon: "signOut" },
  },
};

/** Hide icons flag strips the icon off. */
export const IconsHidden: Story = {
  args: {
    item: { name: "about", label: "About", value: "/about", icon: "info", href: "/about" },
    hideIcons: true,
  },
};

/** Fallback when no item prop is given: renders a default Home link. */
export const FallbackHome: Story = {
  args: {},
};
