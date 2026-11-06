import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FocusEvent } from "react";
import { Icon } from "@nxs-atoms";
import type { CalendarTimeGridProps, CalendarTimedEvent } from "nxs-calendar";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { isSameLocalDay, localDayKey, minutesSinceMidnight } from "@nxs-utils/calendar/weekRange";
import { DEFAULT_DURATION_MINUTES, layoutDay, resolveEnd } from "@nxs-utils/calendar/layoutDay";
import {
  formatDayNumber,
  formatDayRange,
  formatFullDate,
  formatHourLabel,
  formatTimeRange,
  formatWeekdayShort,
} from "@nxs-utils/calendar/formatDate";
import { resolveCalendarLabels } from "@nxs-utils/calendar/calendarLabels";

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
// How many all day chips a day shows before the "+N more" control takes over. Two keeps the
// sticky head under a quarter of a phone screen; the rest are never dropped, only folded.
const ALL_DAY_VISIBLE = 2;
export const DEFAULT_SCROLL_TO_HOUR = 8;

// Custom properties are not in React's CSSProperties, and these four numbers are the ONLY
// inline style the grid writes: the stylesheet turns them into geometry against
// --calendar-hour-height, so no pixel math ever runs in JS.
const blockStyle = (top: number, height: number, column: number, columns: number): CSSProperties =>
  ({
    "--block-start": top,
    "--block-length": height,
    "--block-column": column,
    "--block-columns": columns,
  }) as CSSProperties;

// A focused block that is partly scrolled out of the body is brought into view. `behavior` is
// never passed: "smooth" would ignore prefers-reduced-motion, and the default follows the
// stylesheet's scroll-behavior, which the reduced-motion kill switch already governs.
const revealOnFocus = (event: FocusEvent<HTMLElement>) => {
  const target = event.currentTarget;
  if (typeof target.scrollIntoView === "function") target.scrollIntoView({ block: "nearest", inline: "nearest" });
};

/**
 * The week and day time grid. Stateless apart from which crowded all day rows are unfolded.
 *
 * Not an ARIA grid on purpose. role="grid" promises full arrow key cell navigation, which a canvas
 * of free positioned blocks cannot honor, and a half implemented grid is worse than none. Instead
 * every day is a labelled group holding a chronological list of event buttons, so a screen reader
 * gets the schedule in order and the visual position is CSS only.
 */
const CalendarTimeGrid: React.FC<CalendarTimeGridProps> = (props) => {
  const {
    days,
    timedEvents,
    now,
    scrollToHour = DEFAULT_SCROLL_TO_HOUR,
    defaultDurationMinutes = DEFAULT_DURATION_MINUTES,
    locale,
    onEventClick,
    onDayClick,
    hideToday,
    labelledBy,
    labels: labelsProp,
  } = props;
  const labels = resolveCalendarLabels(labelsProp);
  const clock = now ?? new Date();
  const events = timedEvents ?? [];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [unfoldedDays, setUnfoldedDays] = useState<string[]>([]);

  const rangeKey = days.map(localDayKey).join("|");
  const todayInRange = !hideToday && days.some((day) => isSameLocalDay(day, clock));

  // Open at scrollToHour, or one hour above the now line when today is in range and now is
  // later, so the current slot is on screen without sitting under the sticky head. Reruns only
  // when the range or the target changes: the minute clock must not yank the user back down.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const nowHour = clock.getHours();
    const targetHour = todayInRange && nowHour > scrollToHour ? Math.max(scrollToHour, nowHour - 1) : scrollToHour;
    const hourCell = scroller.querySelector<HTMLElement>(`[data-hour="${targetHour}"]`);
    const head = scroller.querySelector<HTMLElement>(".calendar-time-grid-head");
    if (!hourCell) return;
    const offset =
      hourCell.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      (head?.offsetHeight ?? 0);
    scroller.scrollTop = Math.max(0, offset);
  }, [rangeKey, scrollToHour]);

  const eventName = (event: CalendarTimedEvent): string =>
    `${event.title}, ${
      event.allDay ? labels.allDay : formatTimeRange(event.start, resolveEnd(event, defaultDurationMinutes), labels.to, locale)
    }`;

  const eventClassName = (event: CalendarTimedEvent, base: string) =>
    `${base} ${base}--${event.tone ?? "brand"}${event.isMuted ? ` ${base}--muted` : ""}`;

  const renderEventButton = (event: CalendarTimedEvent, base: string) => (
    <button
      type="button"
      className={eventClassName(event, base)}
      aria-label={eventName(event)}
      onClick={() => onEventClick?.(event)}
      onFocus={revealOnFocus}
    >
      <span className={`${base}-title`}>
        {event.icon && <Icon icon={event.icon} hideHints />}
        {event.title}
      </span>
      {!event.allDay && (
        <span className={`${base}-subtitle`}>
          {event.subtitle ?? formatTimeRange(event.start, resolveEnd(event, defaultDurationMinutes), labels.to, locale)}
        </span>
      )}
    </button>
  );

  const renderAllDayCell = (day: Date) => {
    const key = localDayKey(day);
    const items = events.filter((event) => event.allDay && isSameLocalDay(event.start, day));
    const unfolded = unfoldedDays.includes(key);
    const visible = unfolded ? items : items.slice(0, ALL_DAY_VISIBLE);
    const hidden = items.length - visible.length;
    const toggle = () =>
      setUnfoldedDays((current) => (unfolded ? current.filter((item) => item !== key) : [...current, key]));
    return (
      <div key={key} role="group" aria-label={`${labels.allDay}, ${formatFullDate(day, locale)}`} className="calendar-allday-cell">
        {visible.length > 0 && (
          <ul className="calendar-allday-list">
            {visible.map((event) => (
              <li key={event.id}>{renderEventButton(event, "calendar-allday-chip")}</li>
            ))}
          </ul>
        )}
        {(hidden > 0 || unfolded) && items.length > ALL_DAY_VISIBLE && (
          <button type="button" className="calendar-allday-more" aria-expanded={unfolded} onClick={toggle}>
            {unfolded ? labels.fewerEvents : labels.moreEvents(hidden)}
          </button>
        )}
      </div>
    );
  };

  const renderDayColumn = (day: Date) => {
    const key = localDayKey(day);
    const isToday = todayInRange && isSameLocalDay(day, clock);
    const laidOut = layoutDay(day, events, defaultDurationMinutes);
    const hasAllDay = events.some((event) => event.allDay && isSameLocalDay(event.start, day));
    return (
      <div
        key={key}
        role="group"
        aria-label={formatFullDate(day, locale)}
        className={`calendar-day-column${isToday ? " calendar-day-column--today" : ""}`}
      >
        {laidOut.length === 0 && !hasAllDay && <span className="sr-only">{labels.noEvents}</span>}
        {laidOut.length > 0 && (
          <ul className="calendar-day-events">
            {laidOut.map((item) => (
              <li
                key={item.event.id}
                className={`calendar-event-slot${item.continuesNextDay ? " calendar-event-slot--continues" : ""}`}
                style={blockStyle(item.top, item.height, item.column, item.columns)}
              >
                {renderEventButton(item.event, "calendar-event-block")}
              </li>
            ))}
          </ul>
        )}
        {isToday && (
          <div
            className="calendar-now-line"
            aria-hidden="true"
            style={{ "--now-minutes": minutesSinceMidnight(clock) } as CSSProperties}
          >
            <span className="calendar-now-line-label">{labels.now}</span>
          </div>
        )}
      </div>
    );
  };

  const rangeLabel = formatDayRange(days, labels.to, locale);

  return (
    <section
      className={`calendar-time-grid calendar-time-grid--${days.length === 1 ? "day" : "week"}`}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : rangeLabel}
    >
      <div className="calendar-time-grid-scroll" ref={scrollerRef}>
        <div className="calendar-time-grid-head">
          <div className="calendar-time-grid-row calendar-time-grid-days">
            <div className="calendar-time-grid-corner" aria-hidden="true" />
            {days.map((day) => {
              const isToday = todayInRange && isSameLocalDay(day, clock);
              return (
                <button
                  key={localDayKey(day)}
                  type="button"
                  className={`calendar-day-header${isToday ? " calendar-day-header--today" : ""}`}
                  aria-label={formatFullDate(day, locale)}
                  aria-current={isToday ? "date" : undefined}
                  onClick={() => onDayClick?.(calendarValues(day))}
                >
                  <span className="calendar-day-header-name">{formatWeekdayShort(day, locale)}</span>
                  <span className="calendar-day-header-number">{formatDayNumber(day, locale)}</span>
                  {isToday && <span className="sr-only">{labels.today}</span>}
                </button>
              );
            })}
          </div>
          <div className="calendar-time-grid-row calendar-time-grid-allday">
            <div className="calendar-time-grid-corner calendar-time-grid-allday-label" aria-hidden="true">
              {labels.allDay}
            </div>
            {days.map(renderAllDayCell)}
          </div>
        </div>
        <div className="calendar-time-grid-row calendar-time-grid-body">
          <div className="calendar-time-grid-gutter" aria-hidden="true">
            {HOURS.map((hour) => (
              <div key={hour} className="calendar-time-grid-hour" data-hour={hour}>
                {hour > 0 && <span className="calendar-time-grid-hour-label">{formatHourLabel(hour, locale)}</span>}
              </div>
            ))}
          </div>
          {days.map(renderDayColumn)}
        </div>
      </div>
    </section>
  );
};
export default CalendarTimeGrid;
