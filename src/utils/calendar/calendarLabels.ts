import type { CalendarLabels } from "nxs-calendar";

// The English defaults for every string the week and day views render, in ONE place so the
// template's navigation row and the grid cannot fall out of step. A consumer overrides any
// subset through the `labels` prop and the rest keep these.
export type ResolvedCalendarLabels = Required<CalendarLabels>;

export const DEFAULT_CALENDAR_LABELS: ResolvedCalendarLabels = {
  allDay: "All day",
  today: "Today",
  previous: "Previous",
  next: "Next",
  noEvents: "No events",
  now: "Now",
  to: "to",
  fewerEvents: "Show fewer",
  moreEvents: (count: number) => `+${count} more`,
};

// Merged key by key rather than spread, so a consumer object carrying an explicit `undefined`
// (a partially loaded translation) falls back to the default instead of blanking the string.
export const resolveCalendarLabels = (labels?: CalendarLabels): ResolvedCalendarLabels => {
  const resolved: ResolvedCalendarLabels = { ...DEFAULT_CALENDAR_LABELS };
  if (!labels) return resolved;
  (Object.keys(DEFAULT_CALENDAR_LABELS) as (keyof CalendarLabels)[]).forEach((key) => {
    const value = labels[key];
    if (value !== undefined) (resolved as Record<string, unknown>)[key] = value;
  });
  return resolved;
};
