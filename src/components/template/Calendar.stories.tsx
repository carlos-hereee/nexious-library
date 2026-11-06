import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { CalendarTimedEvent, CalendarViewMode } from "nxs-calendar";
import Calendar from "./Calendar";

/**
 * Calendar renders a month grid with day navigation and per-day event pings, and, with
 * `view="week"` or `view="day"`, a time grid of positioned event blocks.
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
 * - `timedEvents` is read ONLY by `view="week"` and `view="day"`. The month grid keeps
 *   reading `events`. If a week view gets `events` and no `timedEvents`, those render as
 *   all day chips on their day so the grid is never empty.
 * - Dates are shown in LOCAL time with local getters. The library never converts zones:
 *   turn an instant into the wall clock you want shown BEFORE building `start` and `end`,
 *   and build a date-only value as `new Date(y, m, d)`, never `new Date("YYYY-MM-DD")`
 *   (that is midnight UTC, the previous evening west of Greenwich).
 * - `date` is CONTROLLED and `value` only seeds. With `date` present the library reports
 *   navigation through `onDateChange` and does not move by itself.
 * - `hideNavigation` drops the refresh button and the navigation row so a consumer header
 *   can own previous / next / today; pair it with `date` and `onDateChange`.
 * - `now` is an injectable clock (the now line, today's marker, the refresh target). Every
 *   story below pins it so the rendered week is the same on every machine.
 */
const meta: Meta<typeof Calendar> = {
  title: "Template/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    hideToday: { control: "boolean" },
    hideNavigation: { control: "boolean" },
    view: { control: "radio", options: ["month", "week", "day"] },
    weekStartsOn: { control: "radio", options: [0, 1] },
    scrollToHour: { control: { type: "number", min: 0, max: 23 } },
    locale: { control: "text" },
    onDayClick: { action: "day-click" },
    onEventClick: { action: "event-click" },
    onDateChange: { action: "date-change" },
    setDay: { action: "set-day" },
  },
  decorators: [
    // Month stories sit in a 420px frame; a time grid needs more, so a story opts into a wider
    // frame through `parameters.frameWidth` (a per story decorator cannot, because Storybook
    // composes it INSIDE this one and the outer cap wins).
    (Story, context) => (
      <div style={{ maxWidth: (context.parameters.frameWidth as number | undefined) ?? 420, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const seed = new Date("2026-06-15T12:00:00");

// A time grid needs more room than a month tile grid; the week and day stories widen the frame.
const wide = { frameWidth: 960 };

// Friday 2026-09-11 at 14:30 local: the now line sits mid afternoon in the rendered week.
const now = new Date("2026-09-11T14:30:00");
const at = (day: number, hour: number, minute = 0) => new Date(2026, 8, day, hour, minute);

const weekEvents: CalendarTimedEvent[] = [
  { id: "1", title: "Design review", start: at(8, 9), end: at(8, 10, 30), tone: "info", icon: "edit" },
  { id: "2", title: "Product sync", start: at(9, 11), end: at(9, 12), tone: "brand" },
  { id: "3", title: "Client booking", start: at(10, 14), end: at(10, 14, 30), tone: "success", subtitle: "Booking" },
  { id: "4", title: "Standup", start: at(11, 9, 30), end: at(11, 9, 45), tone: "neutral" },
  { id: "5", title: "Livestream prep", start: at(11, 13), end: at(11, 15), tone: "warn" },
  { id: "6", title: "Closed slot", start: at(11, 16), end: at(11, 17), tone: "danger", isMuted: true, subtitle: "Closed" },
  { id: "7", title: "Late shift", start: at(12, 22), end: at(13, 2), tone: "info" },
  { id: "8", title: "Launch day", start: at(11, 0), allDay: true, tone: "brand" },
  { id: "9", title: "No end time", start: at(7, 16) },
];

/** Default: a month seeded by `value`, no events. */
export const Default: Story = {
  args: { value: seed },
};

/** With events: days carrying events render a ping badge sized to the count. */
export const WithEvents: Story = {
  args: {
    value: seed,
    events: [{ date: "2026-06-18" }, { date: "2026-06-18" }, { date: "2026-06-22" }],
  },
};

/** hideToday: drops the today highlight (the refresh button still resets to today). */
export const HideToday: Story = {
  name: "Hide today highlight",
  args: { value: seed, hideToday: true },
};

/** Week: seven columns, an all day row, the hour gutter, the now line, opening at 8 AM. */
export const Week: Story = {
  parameters: wide,
  args: { value: now, view: "week", now, timedEvents: weekEvents, locale: "en-US" },
};

/** Day: the same grid with one column and the full weekday date as its heading. */
export const Day: Story = {
  parameters: wide,
  args: { value: now, view: "day", now, timedEvents: weekEvents, locale: "en-US" },
};

/** Overlapping: four events at once share the column in four equal lanes; a fifth tucks back into lane 0. */
export const Overlapping: Story = {
  parameters: wide,
  args: {
    value: now,
    view: "day",
    now,
    locale: "en-US",
    timedEvents: [
      { id: "a", title: "Interview A", start: at(11, 10), end: at(11, 11), tone: "info" },
      { id: "b", title: "Interview B", start: at(11, 10), end: at(11, 11), tone: "success" },
      { id: "c", title: "Interview C", start: at(11, 10), end: at(11, 11), tone: "warn" },
      { id: "d", title: "Interview D", start: at(11, 10), end: at(11, 11), tone: "danger" },
      { id: "e", title: "Debrief", start: at(11, 11), end: at(11, 11, 30), tone: "brand" },
      { id: "f", title: "Five minute check", start: at(11, 13), end: at(11, 13, 5), tone: "neutral" },
    ],
  },
};

/** AllDayOverflow: more than two all day items fold behind a "+N more" control that unfolds in place. */
export const AllDayOverflow: Story = {
  parameters: wide,
  args: {
    value: now,
    view: "week",
    now,
    locale: "en-US",
    timedEvents: [
      { id: "1", title: "Launch day", start: at(11, 0), allDay: true, tone: "brand" },
      { id: "2", title: "Conference", start: at(11, 0), allDay: true, tone: "info" },
      { id: "3", title: "Birthday", start: at(11, 0), allDay: true, tone: "success" },
      { id: "4", title: "Store closed", start: at(11, 0), allDay: true, tone: "danger", isMuted: true },
      { id: "5", title: "Deadline", start: at(9, 0), allDay: true, tone: "warn" },
    ],
  },
};

/** EmptyWeek: the grid still renders, and every day carries a visually hidden "No events". */
export const EmptyWeek: Story = {
  parameters: wide,
  args: { value: now, view: "week", now, locale: "en-US", timedEvents: [] },
};

/** LongTitles: one line with an ellipsis; blocks tall enough wrap to two. The full title is always in the accessible name. */
export const LongTitles: Story = {
  parameters: wide,
  args: {
    value: now,
    view: "week",
    now,
    locale: "en-US",
    timedEvents: [
      {
        id: "1",
        title: "Quarterly planning session with the whole creator council and every plugin owner",
        start: at(9, 9),
        end: at(9, 9, 30),
        tone: "info",
      },
      {
        id: "2",
        title: "Quarterly planning session with the whole creator council and every plugin owner",
        start: at(10, 9),
        end: at(10, 12),
        tone: "brand",
      },
      {
        id: "3",
        title: "An all day item whose title is far longer than the column it sits in can ever show",
        start: at(11, 0),
        allDay: true,
      },
    ],
  },
};

/** MondayFirst: `weekStartsOn={1}`. */
export const MondayFirst: Story = {
  parameters: wide,
  args: { value: now, view: "week", now, weekStartsOn: 1, timedEvents: weekEvents, locale: "en-US" },
};

/** Spanish day names and dates through `locale`, with the visible labels overridden. */
export const Localized: Story = {
  parameters: wide,
  args: {
    value: now,
    view: "week",
    now,
    locale: "es",
    timedEvents: weekEvents,
    labels: {
      allDay: "Todo el día",
      today: "Hoy",
      previous: "Anterior",
      next: "Siguiente",
      noEvents: "Sin eventos",
      now: "Ahora",
      to: "a",
      moreEvents: (count) => `${count} más`,
      fewerEvents: "Mostrar menos",
    },
  },
};

const ConsumerHeader: React.FC = () => {
  const [date, setDate] = useState(now);
  const [view, setView] = useState<CalendarViewMode>("week");
  const step = view === "day" ? 1 : view === "week" ? 7 : 30;
  const shift = (days: number) => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + days));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" onClick={() => shift(-step)}>
          Previous
        </button>
        <button type="button" onClick={() => setDate(now)}>
          Today
        </button>
        <button type="button" onClick={() => shift(step)}>
          Next
        </button>
        <strong>{date.toDateString()}</strong>
        <span style={{ marginInlineStart: "auto", display: "flex", gap: "0.25rem" }}>
          {(["day", "week", "month"] as CalendarViewMode[]).map((option) => (
            <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)}>
              {option}
            </button>
          ))}
        </span>
      </div>
      <Calendar
        value={now}
        now={now}
        date={date}
        view={view}
        onDateChange={setDate}
        onDayClick={(day) => {
          if ("year" in day) {
            setDate(new Date(day.year, day.month, day.day));
            setView("day");
          }
        }}
        hideNavigation
        timedEvents={weekEvents}
        locale="en-US"
      />
    </div>
  );
};

/**
 * ControlledWithHeader: a story local header owns previous / today / next and the view switch,
 * the library renders under it with `hideNavigation`, and a day header click drills into day
 * view. This is the shape the platform's Calendar tab uses; the library deliberately ships no
 * view switcher of its own.
 */
export const ControlledWithHeader: Story = {
  parameters: wide,
  render: () => <ConsumerHeader />,
};

/** Both themes side by side: every tone is a token pair, so the dark twin is the same markup under `.dark-mode`. */
export const LightAndDark: Story = {
  parameters: wide,
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Calendar value={now} view="week" now={now} timedEvents={weekEvents} locale="en-US" />
      <div className="sb-matrix-dark dark-mode" style={{ padding: "1rem" }}>
        <Calendar value={now} view="week" now={now} timedEvents={weekEvents} locale="en-US" />
      </div>
    </div>
  ),
};
