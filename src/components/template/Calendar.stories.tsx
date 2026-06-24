import type { Meta, StoryObj } from "@storybook/react";
import Calendar from "./Calendar";

/**
 * Calendar renders a month grid with day navigation and per-day event pings.
 *
 * Gotchas (the things that bite you):
 * - `value` is a REQUIRED Date (it seeds the active month/day). Pass a real Date,
 *   not a string.
 * - `events` is `PEventDay[]`, each carrying a `date` string. The component groups
 *   them by date and renders a ping badge on every day that has events, sized to
 *   the number of events that day.
 * - `setDay` and `onDayClick` are NOT the same hook: `setDay` fires on ANY active-
 *   day change (including programmatic month navigation), while `onDayClick` only
 *   fires when the user clicks a day. Wire the one that matches your intent.
 * - `hideToday` only removes the today highlight; the refresh IconButton in the
 *   corner still snaps the view back to today regardless.
 * - `minDate` is the earliest selectable day (earlier days render disabled).
 */
const meta: Meta<typeof Calendar> = {
  title: "Template/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    theme: { control: "text" },
    hideToday: { control: "boolean" },
    onDayClick: { action: "day-click" },
    setDay: { action: "set-day" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const seed = new Date("2026-06-15T12:00:00");

/** Default: a month seeded by `value`, no events. */
export const Default: Story = {
  args: { value: seed },
};

/** With events: days carrying events render a ping badge sized to the count. */
export const WithEvents: Story = {
  args: {
    value: seed,
    events: [
      { date: "2026-06-18" },
      { date: "2026-06-18" },
      { date: "2026-06-22" },
    ],
  },
};

/** hideToday: drops the today highlight (the refresh button still resets to today). */
export const HideToday: Story = {
  name: "Hide today highlight",
  args: { value: seed, hideToday: true },
};
