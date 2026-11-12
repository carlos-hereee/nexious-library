import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { NavItem, NavSection } from "nxs-navigation";
import MobileTabBar from "./MobileTabBar";
import MoreSheet from "./MoreSheet";

// The compact viewport's nav (2026-11 item 337): the bottom tab bar and the More sheet it opens.
// Both are fixed to the viewport, so view the story at a phone width. Every string is passed in.
const meta: Meta<typeof MobileTabBar> = {
  title: "Organism/MobileTabBar",
  component: MobileTabBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MobileTabBar>;

const Glyph = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" role="presentation">
    <circle cx="12" cy="12" r="9" fill="currentColor" />
  </svg>
);

const BAR: NavItem[] = [
  { id: "home", label: "Home", icon: <Glyph /> },
  { id: "calendar", label: "Calendar", icon: <Glyph /> },
  { id: "community", label: "Community", icon: <Glyph /> },
  { id: "store", label: "Store", icon: <Glyph /> },
];

const SHEET: NavSection[] = [
  {
    id: "operate",
    label: "Operate",
    items: [
      { id: "orders", label: "Orders", icon: <Glyph /> },
      { id: "pages", label: "Pages", icon: <Glyph /> },
      { id: "taskboard", label: "Taskboard", icon: <Glyph /> },
    ],
  },
  {
    id: "setup",
    label: "Setup",
    items: [
      { id: "app", label: "App settings", icon: <Glyph /> },
      { id: "team", label: "Team", icon: <Glyph /> },
    ],
  },
];

const CompactNav = () => {
  const [active, setActive] = useState<string | null>("home");
  const [isOpen, setIsOpen] = useState(false);
  const isInSheet = SHEET.some((section) => section.items.some((item) => item.id === active));
  return (
    <>
      <div role="tabpanel" id="story-dashboard-panel" aria-label="Dashboard panel">
        <p>{`Showing ${active ?? "nothing"}`}</p>
      </div>
      <MobileTabBar
        tabs={BAR}
        activeId={active}
        onSelect={setActive}
        ariaLabel="Dashboard"
        panelId="story-dashboard-panel"
        itemElementId={(id) => `story-tab-${id}`}
        more={{
          label: "More",
          icon: <Glyph />,
          isOpen,
          isSelected: isInSheet,
          sheetId: "story-more-sheet",
          onToggle: () => setIsOpen((open) => !open),
        }}
      />
      <MoreSheet
        id="story-more-sheet"
        isOpen={isOpen}
        title="More"
        closeLabel="Close"
        sections={SHEET}
        activeId={active}
        onSelect={setActive}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const WithMoreSheet: Story = {
  render: () => <CompactNav />,
};

export const EveryTabFits: Story = {
  args: { tabs: BAR, activeId: "calendar", ariaLabel: "Dashboard" },
};
