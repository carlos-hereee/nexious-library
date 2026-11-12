import type { Meta, StoryObj } from "@storybook/react";
import Button from "@nxs-atoms/buttons/Button";
import EventCard from "./EventCard";

// EventCard (2026-11 item 337). The library bakes in no locale, so every story passes its own
// formatter (here the viewer's locale through Intl) and its own copy, as a consumer would.
const formatDate = (date: Date, part: "start" | "end", isAllDay: boolean) =>
  isAllDay
    ? date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : date.toLocaleString(
        undefined,
        part === "end"
          ? { hour: "numeric", minute: "2-digit" }
          : { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }
      );

const meta: Meta<typeof EventCard> = {
  title: "Organism/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  argTypes: {
    density: { control: "select", options: ["card", "row"] },
    headingLevel: { control: "select", options: [undefined, 2, 3, 4, 5, 6] },
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const Card: Story = {
  args: {
    event: {
      title: "Raid night",
      start: "2026-11-20T19:00:00.000Z",
      end: "2026-11-20T21:00:00.000Z",
      location: "Main hall",
      badges: <span className="nxs-event-card-all-day">Recurring</span>,
      href: "#raid-night",
    },
    formatDate,
    rangeSeparator: "to",
    locationLabel: "Location",
    actions: <Button label="Open calendar" variant="secondary" size="small" />,
    children: <p>Bring your best build.</p>,
  },
};

export const NoEndTime: Story = {
  args: { ...Card.args, event: { title: "Open mic", start: "2026-11-21T01:00:00.000Z" } },
};

export const AllDay: Story = {
  args: {
    ...Card.args,
    event: { title: "Season start", start: "2026-12-01", isAllDay: true },
    allDayLabel: "All day",
  },
};

export const Rows: Story = {
  render: () => (
    <ul className="nxs-list-row-group" aria-label="This week">
      <EventCard
        as="li"
        density="row"
        event={{
          title: "Raid night",
          start: "2026-11-20T19:00:00.000Z",
          end: "2026-11-20T21:00:00.000Z",
          href: "#raid",
        }}
        formatDate={formatDate}
        rangeSeparator="to"
        actions={<Button label="Mute" variant="secondary" size="small" />}
      />
      <EventCard
        as="li"
        density="row"
        event={{ title: "Season start", start: "2026-12-01", isAllDay: true }}
        formatDate={formatDate}
        allDayLabel="All day"
      />
    </ul>
  ),
};
