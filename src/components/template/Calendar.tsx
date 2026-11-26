import { IconButton } from "@nxs-molecules";
import { useEffect, useId, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { next, previous } from "@nxs-utils/calendar/navLabels";
import { monthChange } from "@nxs-utils/calendar/monthChange";
import { dayChange } from "@nxs-utils/calendar/dayChange";
import { addDays, startOfLocalDay, weekDays } from "@nxs-utils/calendar/weekRange";
import { formatDayRange } from "@nxs-utils/calendar/formatDate";
import { resolveCalendarLabels } from "@nxs-utils/calendar/calendarLabels";
import { allDayFromPEventDay, localDayFromWire } from "@nxs-utils/calendar/allDayFromPEventDay";
import type { CalendarDayProp, CalendarProps, CalendarViewMode, PEventDay } from "nxs-calendar";
import {
  CalendarNavigation,
  CalendarTimeGrid,
  CalendarView,
  CalendarYearView,
  WeekNavigation,
} from "@nxs-organism/index";

const CLOCK_REFRESH_MS = 60000;
// The switch always lists its views in this order, whatever order the consumer passed.
const VIEW_ORDER: readonly CalendarViewMode[] = ["day", "week", "month", "year"];

/**
 *
 * @param value current date value
 * @param minDate the mininum date displayed on calendar
 * @param events list of events
 * @returns
 */
type CalEvent = {
  date: string;
  list: PEventDay[];
};
const Calendar: React.FC<CalendarProps> = (props) => {
  const { value, events, minDate, className, onDayClick, setDay, hideToday } = props;
  const {
    view = "month",
    views,
    onViewChange,
    date,
    onDateChange,
    hideNavigation,
    timedEvents,
    onEventClick,
    weekStartsOn = 0,
    scrollToHour,
    defaultDurationMinutes,
    now,
    locale,
    labels: labelsProp,
    headingLevel,
  } = props;
  const labels = resolveCalendarLabels(labelsProp);
  // The view on screen. It starts at `view`, follows a new `view` from the parent, and with the
  // built in switch (`views`) the calendar moves it itself.
  const [currentView, setCurrentView] = useState<CalendarViewMode>(view);
  const isTimeGrid = currentView === "week" || currentView === "day";
  const isYear = currentView === "year";
  const switchViews = VIEW_ORDER.filter((option) => views?.includes(option));
  const viewNames: Record<CalendarViewMode, string> = {
    day: labels.viewDay,
    week: labels.viewWeek,
    month: labels.viewMonth,
    year: labels.viewYear,
  };
  // keep track of today, min date, and which calenday is active
  const [active, setActive] = useState<CalendarDayProp>(calendarValues(date ?? value));
  const [mininumDate, setMininumDate] = useState<CalendarDayProp>();
  const [calendarEvents, setEvents] = useState<CalEvent[]>([]);
  // The now line's clock. An injected `now` is authoritative (tests, stories); otherwise the
  // grid re-reads the wall clock once a minute, and only while a time grid is mounted, so the
  // month view never re-renders on a timer it has no use for.
  const [tick, setTick] = useState(() => new Date());
  const clock = now ?? tick;
  const today: CalendarDayProp = calendarValues(now ?? new Date());
  const headingId = useId();

  useEffect(() => {
    if (minDate) setMininumDate(calendarValues(minDate));
  }, []);

  useEffect(() => {
    // programatically setDay when new day is chosen
    if (active.date && setDay) setDay(active);
  }, [active]);

  useEffect(() => {
    if (events) {
      const data: CalEvent[] = [];
      events.forEach((event) => {
        const idx = data.findIndex((d) => d.date === event.date);
        // findIndex returns -1 only when no group exists yet for this date; a real
        // match can legitimately be index 0. Guarding on `idx <= 0` forked a second
        // duplicate group whenever an event matched the FIRST grouped date, splitting
        // that day's events and under-counting its ping badge.
        if (idx === -1) data.push({ date: event.date || "", list: [event] });
        else data[idx].list.push(event);
      });
      setEvents(data);
    }
  }, [events]);

  // Controlled focus: a new `date` from the parent moves every view. Keyed on the instant rather
  // than the object so a parent that rebuilds an equal Date each render does not loop.
  useEffect(() => {
    if (date) setActive(calendarValues(date));
  }, [date ? date.getTime() : undefined]);

  useEffect(() => {
    setCurrentView(view);
  }, [view]);

  useEffect(() => {
    if (now || !isTimeGrid) return undefined;
    const intervalId = setInterval(() => setTick(new Date()), CLOCK_REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [now, isTimeGrid]);

  // Every navigation in every view funnels through here. Without a controlled `date` it moves
  // the internal state exactly as setActive always did; with one it only reports, so the parent
  // owns the position and the library never moves out from under it. The month helpers call
  // their callback twice in the January and December branches (a known quirk, deliberately not
  // refactored here), so a consumer can see two onDateChange calls there; the last one is right.
  const moveTo: Dispatch<SetStateAction<CalendarDayProp>> = (update) => {
    const nextActive = typeof update === "function" ? update(active) : update;
    if (!date) setActive(nextActive);
    if (onDateChange) onDateChange(new Date(nextActive.year, nextActive.month, nextActive.day));
  };

  const changeView = (nextView: CalendarViewMode) => {
    setCurrentView(nextView);
    if (onViewChange) onViewChange(nextView);
  };

  const focusDate = date ?? new Date(active.year, active.month, active.day);
  const gridDays = currentView === "day" ? [startOfLocalDay(focusDate)] : weekDays(focusDate, weekStartsOn);
  const gridStep = currentView === "day" ? 1 : 7;
  // A month consumer that flips the view without supplying timedEvents still sees its events,
  // as all day chips on their LOCAL day.
  const gridEvents = timedEvents ?? (events ? allDayFromPEventDay(events) : undefined);
  // The year view counts every event once, timed or not, on its local day.
  const yearEventDates = (gridEvents ?? []).map((event) => event.start);
  const yearHeading = new Intl.DateTimeFormat(locale, { year: "numeric" }).format(focusDate);
  // A month picked in the year view opens on its first day in the month view.
  const openMonth = (month: number) => {
    moveTo(calendarValues(new Date(focusDate.getFullYear(), month, 1)));
    changeView("month");
  };

  return (
    <div className={className ? `${className} calendar` : "calendar"}>
      {(switchViews.length > 1 || !hideNavigation) && (
        <div className="calendar-toolbar">
          {switchViews.length > 1 && (
            // Buttons with aria-pressed rather than a radio group: each one is its own tab stop and
            // works with a click or Enter, with no arrow key model to get wrong.
            <div className="calendar-view-switch" role="group" aria-label={labels.viewSwitch}>
              {switchViews.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="calendar-view-switch-option"
                  aria-pressed={currentView === option}
                  onClick={() => changeView(option)}
                >
                  {viewNames[option]}
                </button>
              ))}
            </div>
          )}
          {!hideNavigation && (
            <IconButton
              onClick={() => moveTo(today)}
              icon={{ icon: "refresh" }}
              title={labels.today}
              aria-label={labels.today}
              className="btn-small calendar-today-button"
            />
          )}
        </div>
      )}
      {isYear && (
        <>
          {!hideNavigation && (
            <WeekNavigation
              heading={yearHeading}
              headingId={headingId}
              onPrevious={() => moveTo(calendarValues(new Date(focusDate.getFullYear() - 1, focusDate.getMonth(), 1)))}
              onNext={() => moveTo(calendarValues(new Date(focusDate.getFullYear() + 1, focusDate.getMonth(), 1)))}
              previousLabel={labels.previousYear}
              nextLabel={labels.nextYear}
            />
          )}
          <CalendarYearView
            year={focusDate.getFullYear()}
            eventDates={yearEventDates}
            today={hideToday ? undefined : clock}
            weekStartsOn={weekStartsOn}
            locale={locale}
            labels={labels}
            onMonthClick={openMonth}
          />
        </>
      )}
      {active && !isTimeGrid && !isYear && (
        <>
          <CalendarNavigation
            date={active}
            click={(label) => monthChange({ label, active, setActive: moveTo })}
            previous={previous}
            next={next}
            headingLevel={headingLevel}
            buttonNames={{
              start: labels.firstMonth,
              prev: labels.previousMonth,
              next: labels.nextMonth,
              last: labels.lastMonth,
            }}
          />
          <CalendarView
            data={active}
            today={hideToday ? undefined : today}
            minDate={mininumDate}
            labels={labels}
            click={(e) => dayChange({ today, active: e, setActive: moveTo, events: calendarEvents, onDayClick })}
            events={
              calendarEvents
                ? calendarEvents.map((e) => {
                    // The wire date's LOCAL day. Through the Date constructor "2026-06-18" is midnight
                    // UTC, so every count landed a day early for anyone west of Greenwich.
                    const values = calendarValues(localDayFromWire(e.date));
                    return { ...values, ping: e.list.length };
                  })
                : []
            }
          />
        </>
      )}
      {isTimeGrid && (
        <>
          {!hideNavigation && (
            <WeekNavigation
              heading={formatDayRange(gridDays, labels.to, locale)}
              headingId={headingId}
              onPrevious={() => moveTo(calendarValues(addDays(focusDate, -gridStep)))}
              onNext={() => moveTo(calendarValues(addDays(focusDate, gridStep)))}
              previousLabel={labels.previous}
              nextLabel={labels.next}
            />
          )}
          <CalendarTimeGrid
            days={gridDays}
            timedEvents={gridEvents}
            now={clock}
            scrollToHour={scrollToHour}
            defaultDurationMinutes={defaultDurationMinutes}
            locale={locale}
            labels={labels}
            onEventClick={onEventClick}
            onDayClick={onDayClick}
            hideToday={hideToday}
            labelledBy={hideNavigation ? undefined : headingId}
          />
        </>
      )}
    </div>
  );
};
export default Calendar;
