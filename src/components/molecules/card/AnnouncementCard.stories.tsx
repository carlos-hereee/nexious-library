import type { Meta, StoryObj } from "@storybook/react";
import AnnouncementCard from "./AnnouncementCard";

// AnnouncementCard (2026-11 item 337, Phase 5): the official update as a feed card. One press of
// the dismiss disables it; the caller hides the card and records it seen.
const meta: Meta<typeof AnnouncementCard> = {
  title: "Molecules/AnnouncementCard",
  component: AnnouncementCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnnouncementCard>;

export const WithLink: Story = {
  args: {
    badgeLabel: "Platform update",
    body: "Stores can now take tips at checkout.",
    link: { href: "https://example.com/notes", label: "Read the notes", newTabHint: "(opens in a new tab)" },
    onDismiss: () => undefined,
    dismissLabel: "Dismiss update",
  },
};

export const BodyOnly: Story = {
  args: { badgeLabel: "Platform update", body: "Scheduled maintenance tonight at 11 pm." },
};
