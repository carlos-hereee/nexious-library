import { resolveCalendarLabels } from "@nxs-utils/calendar/calendarLabels";
import type { CalendarYearViewProps } from "nxs-calendar";

const MONTHS_IN_YEAR = 12;
const DAYS_IN_WEEK = 7;
// Any week works as a source of weekday initials; 2026-01-04 is a Sunday, so day i of it is
// weekday i, and Intl prints its narrow name in the requested locale.
const SUNDAY_REFERENCE = new Date(2026, 0, 4);

const localDayKey = (date: Date): string => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

/**
 * The year at a glance: twelve mini months, each one button that opens that month.
 *
 * A month shows its name, a small day grid with the days holding events filled and today ringed,
 * and how many events it holds. The day grid is decoration for sighted users and hidden from
 * assistive tech, whose name for the month button is its name, year and event count. The days are
 * deliberately not buttons of their own: 365 tab stops would make the view unusable by keyboard,
 * and the month view one click away is where a day is picked.
 */
const CalendarYearView: React.FC<CalendarYearViewProps> = (props) => {
  const { year, eventDates, today, weekStartsOn = 0, locale, labels: labelsProp, onMonthClick } = props;
  const labels = resolveCalendarLabels(labelsProp);

  const eventDayCounts = new Map<string, number>();
  eventDates.forEach((date) => {
    const key = localDayKey(date);
    eventDayCounts.set(key, (eventDayCounts.get(key) ?? 0) + 1);
  });

  const weekdayInitials = Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
    const weekday = (index + weekStartsOn) % DAYS_IN_WEEK;
    const day = new Date(
      SUNDAY_REFERENCE.getFullYear(),
      SUNDAY_REFERENCE.getMonth(),
      SUNDAY_REFERENCE.getDate() + weekday
    );
    return new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(day);
  });
  const monthName = (month: number): string =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(year, month, 1));
  const todayKey = today ? localDayKey(today) : "";

  return (
    <div className="calendar-year-view">
      {Array.from({ length: MONTHS_IN_YEAR }, (_, month) => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const leadingBlanks = (new Date(year, month, 1).getDay() - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;
        let monthCount = 0;
        const days = Array.from({ length: daysInMonth }, (__, index) => {
          const key = localDayKey(new Date(year, month, index + 1));
          const count = eventDayCounts.get(key) ?? 0;
          monthCount += count;
          return { day: index + 1, hasEvents: count > 0, isToday: key === todayKey };
        });
        const isCurrentMonth = today ? today.getFullYear() === year && today.getMonth() === month : false;
        const name = monthName(month);
        const countText = monthCount > 0 ? labels.yearMonthEvents(monthCount) : labels.noEvents;
        return (
          <button
            key={name}
            type="button"
            className={`calendar-year-month${isCurrentMonth ? " calendar-year-month--current" : ""}`}
            aria-label={`${name} ${year}, ${countText}`}
            aria-current={isCurrentMonth ? "date" : undefined}
            onClick={() => onMonthClick(month)}
          >
            <span className="calendar-year-month-head">
              <span className="calendar-year-month-name">{name}</span>
              {monthCount > 0 && (
                <span className="calendar-year-month-count" aria-hidden="true">
                  {monthCount}
                </span>
              )}
            </span>
            <span className="calendar-year-month-grid" aria-hidden="true">
              {weekdayInitials.map((initial, index) => (
                // Narrow names repeat (two S, two T), so the position is the key.
                // eslint-disable-next-line react/no-array-index-key
                <span key={`weekday-${index}`} className="calendar-year-weekday">
                  {initial}
                </span>
              ))}
              {Array.from({ length: leadingBlanks }, (__, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={`blank-${index}`} />
              ))}
              {days.map(({ day, hasEvents, isToday }) => (
                <span
                  key={day}
                  className={`calendar-year-day${hasEvents ? " calendar-year-day--events" : ""}${
                    isToday ? " calendar-year-day--today" : ""
                  }`}
                >
                  {day}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
};
export default CalendarYearView;
