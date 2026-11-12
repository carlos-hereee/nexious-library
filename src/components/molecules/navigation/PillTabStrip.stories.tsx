import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import PillTabStrip from "./PillTabStrip";
import PillNav from "./PillNav";

// PillTabStrip swaps panels (a tablist); PillNav changes the route (links with aria-current).
// One look, two semantics, kept apart by owner decision A12 (2026-11 item 337).
const meta: Meta<typeof PillTabStrip> = {
  title: "Molecules/PillTabStrip",
  component: PillTabStrip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PillTabStrip>;

type Tab = "members" | "roles" | "invites";
const TABS: readonly Tab[] = ["members", "roles", "invites"];
const LABELS: Record<Tab, string> = { members: "Members", roles: "Roles", invites: "Invites" };

const StripWithPanels = () => {
  const [active, setActive] = useState<Tab>("members");
  return (
    <div>
      <PillTabStrip
        tabs={TABS}
        active={active}
        onSelect={setActive}
        ariaLabel="Team"
        labelFor={(tab) => LABELS[tab]}
        tabId={(tab) => `story-team-tab-${tab}`}
        panelId={(tab) => `story-team-panel-${tab}`}
      />
      <div role="tabpanel" id={`story-team-panel-${active}`} aria-labelledby={`story-team-tab-${active}`}>
        <p>{`${LABELS[active]} panel`}</p>
      </div>
    </div>
  );
};

export const Tablist: Story = {
  render: () => <StripWithPanels />,
};

export const NavigationLinks: Story = {
  render: () => (
    <PillNav
      ariaLabel="Arena sections"
      activeId="community"
      items={[
        { id: "events", label: "Events", href: "#events" },
        { id: "community", label: "Community", href: "#community" },
        { id: "leaderboard", label: "Leaderboard", href: "#leaderboard" },
        { id: "rules", label: "Rules", href: "#rules" },
        { id: "settings", label: "Settings", href: "#settings" },
      ]}
    />
  ),
};
