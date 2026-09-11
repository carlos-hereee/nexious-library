import type { DataContent } from "nxs-typography";
import type { AssetProps, UserProps } from "nxs-assets";

export type CalendarPEventDay = {
  date: string;
  list: PEventDay[];
};
export type MeetingProps = {
  response?: string;
  uid?: string;
  meetingId?: string;
  startTime?: string;
  date?: string;
  endTime?: string;
};
export type PEventDay = {
  date?: string;
  value?: string;
  data?: string;
  day?: string;
  startTime?: number;
  endTime?: number;
  uid?: string;
  eventId?: string;
  details?: string;
  isOpen?: boolean;
  isHeader?: boolean;
  hero?: AssetProps;
};
export type CalendarDayProp = {
  dayIdx: number;
  month: number;
  year: number;
  date: string;
  maxDays: number;
  weeks: number;
  start: number;
  day: number;
  yyyymmdd: string;
  ping?: number;
};
// Define your exported types here
export type EventMeetingProps = { meeting: MeetingProps };
// ── Week and day views (additive; nothing above this line changed for them) ─────────

export type CalendarViewMode = "month" | "week" | "day";

// A closed set on purpose: each tone maps onto an EXISTING status or brand token pair in
// _calendar.scss, so a consumer picks a meaning, never a color, and the contrast suite keeps
// every pair honest in both themes.
export type CalendarEventTone = "brand" | "info" | "success" | "warn" | "danger" | "neutral";

/**
 * A timed entry for the week and day grids. Read ONLY by view="week" and view="day"; the month
 * grid keeps reading `events` (PEventDay[]), whose startTime and endTime are typed number and are
 * left untouched because changing them is a breaking change.
 *
 * `start` and `end` are rendered with LOCAL getters (getHours, getDate). The library knows nothing
 * about time zones and does not guess: a consumer that holds an instant (a UTC ISO string, a
 * booking slot) converts it into the wall clock it wants SHOWN before building these Dates. A
 * date-only wire value such as "2026-09-11" must be built as new Date(2026, 8, 11), never
 * new Date("2026-09-11"), which is midnight UTC and the previous evening west of Greenwich.
 */
export interface CalendarTimedEvent {
  id: string;
  title: string;
  start: Date;
  // Missing, or not after start, means `defaultDurationMinutes` applies.
  end?: Date;
  allDay?: boolean;
  tone?: CalendarEventTone;
  // A library icon registry key, rendered decoratively beside the title.
  icon?: string;
  // A second line such as a time range or a source label. When omitted the block shows the
  // formatted time range.
  subtitle?: string;
  // Closed or past: rendered subdued with a dashed edge, never by color alone.
  isMuted?: boolean;
}

/** Every string the week and day views render, overridable for localization. */
export interface CalendarLabels {
  allDay?: string;
  today?: string;
  previous?: string;
  next?: string;
  noEvents?: string;
  now?: string;
  // The word between two times or two dates in a range ("3:00 PM to 5:00 PM").
  to?: string;
  // The "+N more" control under a crowded all day row, and its expanded twin.
  moreEvents?: (count: number) => string;
  fewerEvents?: string;
}

export interface CalendarProps {
  value: Date;
  minDate?: Date;
  className?: string;
  hideToday?: boolean;
  events?: PEventDay[];
  onDayClick?: (e: CalendarDayProp | CalendarPEventDay) => void;
  setDay?: (a: unknown) => void;
  // ── Week and day views, all optional; omitting every one of them renders the month grid
  //    exactly as before. ──
  view?: CalendarViewMode;
  // CONTROLLED focus date. `value` only seeds internal state once; when `date` is present it
  // wins, and changing it moves the calendar in every view.
  date?: Date;
  // Fired by the library's own navigation in every view. With `date` controlled the library does
  // not also move its internal state, so a consumer header can own the position.
  onDateChange?: (date: Date) => void;
  // Hides the refresh button and the navigation row so a consumer header can own navigation.
  hideNavigation?: boolean;
  timedEvents?: CalendarTimedEvent[];
  onEventClick?: (event: CalendarTimedEvent) => void;
  // 0 is Sunday first (matches the month grid), 1 is Monday first.
  weekStartsOn?: 0 | 1;
  // The hour (0 to 23) the grid scrolls to on mount and when the range changes. When today is in
  // range and now is later than this hour, the grid scrolls so the now line is visible instead.
  scrollToHour?: number;
  defaultDurationMinutes?: number;
  // Injectable clock for tests and stories. Defaults to new Date(), refreshed once a minute.
  now?: Date;
  // BCP 47 tag for Intl day names, dates and hour labels. Undefined is the runtime locale.
  locale?: string;
  labels?: CalendarLabels;
}

export interface CalendarTimeGridProps {
  // One or seven LOCAL midnights, in display order.
  days: Date[];
  timedEvents?: CalendarTimedEvent[];
  now?: Date;
  scrollToHour?: number;
  defaultDurationMinutes?: number;
  locale?: string;
  labels?: CalendarLabels;
  onEventClick?: (event: CalendarTimedEvent) => void;
  onDayClick?: (day: CalendarDayProp) => void;
  hideToday?: boolean;
  // The id of a visible heading naming the range. Without it the section names itself with the
  // formatted range, so it always has an accessible name.
  labelledBy?: string;
}

export interface WeekNavigationProps {
  heading: string;
  headingId?: string;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
}
export interface EventAttendees {
  uid: string;
  userId: string;
  username: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
}
export interface ICalEvent {
  uid: string;
  eventId: string;
  date: string;
  name: string;
  details: string;
  startTime: string;
  createdAt?: string;
  endTime: string;
  isOpen: boolean;
  attendees: EventAttendees[];
}
export interface ICalendarEventDetails {
  events?: ICalEvent[];
  event?: ICalEvent;
  onEventClick?: (event: ICalEvent) => void;
  // See HeroProps.isDev, overrides dev-panel visibility for this component.
  isDev?: boolean;
}
export interface CalendarPEventDays {
  data?: { header?: DataContent; events?: ICalEvent[] };
  onEventClick?: (event: ICalEvent) => void;
  selectedDay?: ICalEvent;
  user?: UserProps;
  active?: string;
  meeting?: MeetingProps;
  event?: ICalEvent;
  children?: React.ReactNode;
  setMeeting?: (value: unknown) => void;
  setActive?: (value: unknown) => void;
  removeFromCart?: (value: unknown) => void;
  handleCheckout?: (value: unknown) => void;
}
export interface CalendarTileProps {
  data: {
    tile: number;
    isMuted: boolean;
    isToday: boolean;
    isSelected: boolean;
  };
  events: CalendarDayProp;
  click: (key: unknown) => void;
}
export interface CalendarNavProps {
  date: { month: number; year: number };
  click: (e: string) => void;
  previous: { label: string; icon: string }[];
  next: { label: string; icon: string }[];
}

export interface CalendarEventListProps {
  list: PEventDay[];
  onClick: (key: unknown) => void;
  meeting: MeetingProps;
}
export interface CalendarViewProps {
  data: CalendarDayProp;
  click: (e: CalendarDayProp) => void;
  today?: CalendarDayProp;
  minDate?: CalendarDayProp;
  events: CalendarDayProp[];
}
export interface DayChangeProps {
  today: CalendarDayProp;
  active: CalendarDayProp;
  setActive: React.Dispatch<React.SetStateAction<CalendarDayProp>>;
  onDayClick?: (e: CalendarDayProp | CalendarPEventDay) => void;
  events?: CalendarPEventDay[];
}
export interface FindMatchProps {
  events?: CalendarPEventDay[];
  calDay: CalendarDayProp;
}
