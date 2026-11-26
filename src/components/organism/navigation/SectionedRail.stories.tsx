import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { NavSection } from "nxs-navigation";
import SectionedRail from "./SectionedRail";

// SectionedRail (2026-11 item 337). Every string and glyph is passed in, as the client passes its
// translated labels and cu-ico glyphs. Walk the tablist stories with Tab, then the arrow keys,
// Home and End; the nav story is plain links.
const meta: Meta<typeof SectionedRail> = {
  title: "Organism/SectionedRail",
  component: SectionedRail,
  tags: ["autodocs"],
  argTypes: {
    semantics: { control: "inline-radio", options: ["tablist", "nav"] },
  },
};

export default meta;
type Story = StoryObj<typeof SectionedRail>;

const Glyph = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" role="presentation">
    <circle cx="12" cy="12" r="9" fill="currentColor" />
  </svg>
);

const SECTIONS: NavSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      { id: "home", label: "Home", icon: <Glyph />, href: "#home" },
      { id: "notifications", label: "Notifications", icon: <Glyph />, href: "#notifications" },
    ],
  },
  {
    id: "operate",
    label: "Operate",
    items: [
      { id: "calendar", label: "Calendar", icon: <Glyph />, href: "#calendar" },
      { id: "store", label: "Store", icon: <Glyph />, href: "#store" },
      { id: "orders", label: "Orders", icon: <Glyph />, href: "#orders" },
    ],
  },
  {
    id: "setup",
    label: "Setup",
    items: [
      { id: "app", label: "App settings", icon: <Glyph />, href: "#app" },
      { id: "team", label: "Team", icon: <Glyph />, href: "#team" },
    ],
  },
];

// A plain inline pill so the story shows where a caller's badge lands; the client passes its
// TabPingBadge here.
const Ping = ({ count }: { count: number }) => (
  <>
    <span aria-hidden="true">{count}</span>
    <span className="sr-only">{`${count} need action`}</span>
  </>
);

const Controlled = ({ initial, ...args }: React.ComponentProps<typeof SectionedRail> & { initial: string | null }) => {
  const [active, setActive] = useState<string | null>(initial);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SectionedRail {...args} activeId={active} onSelect={setActive} />
  );
};

export const Tablist: Story = {
  render: (args) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Controlled {...args} initial="home" />
  ),
  args: {
    sections: SECTIONS,
    ariaLabel: "Dashboard",
    pings: { orders: 3 },
    renderPing: (ping) => <Ping count={Number(ping)} />,
  },
};

// The attention path: nothing is selected, and the first tab still holds the one tab stop.
export const NothingSelected: Story = {
  render: (args) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Controlled {...args} initial={null} />
  ),
  args: { sections: SECTIONS, ariaLabel: "Dashboard" },
};

export const Navigation: Story = {
  args: { sections: SECTIONS, semantics: "nav", ariaLabel: "Plugin sections", activeId: "calendar" },
};

export const WithFooter: Story = {
  render: (args) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Controlled {...args} initial="home" />
  ),
  args: { sections: SECTIONS, ariaLabel: "Dashboard", footer: <p>Create your first app</p> },
};
