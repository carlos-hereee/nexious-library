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
import { allDayFromPEventDay } from "@nxs-utils/calendar/allDayFromPEventDay";
import type { CalendarDayProp, CalendarProps, PEventDay } from "nxs-calendar";
import { CalendarNavigation, CalendarTimeGrid, CalendarView, WeekNavigation } from "@nxs-organism/index";

const CLOCK_REFRESH_MS = 60000;

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
  } = props;
  const labels = resolveCalendarLabels(labelsProp);
  const isTimeGrid = view === "week" || view === "day";
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

  const focusDate = date ?? new Date(active.year, active.month, active.day);
  const gridDays = view === "day" ? [startOfLocalDay(focusDate)] : weekDays(focusDate, weekStartsOn);
  const gridStep = view === "day" ? 1 : 7;
  // A month consumer that flips the view without supplying timedEvents still sees its events,
  // as all day chips on their LOCAL day.
  const gridEvents = timedEvents ?? (events ? allDayFromPEventDay(events) : undefined);

  return (
    <div className={className ? `${className} calendar` : "calendar"}>
      {!hideNavigation && (
        <div className="flex-j-end">
          <IconButton onClick={() => moveTo(today)} icon={{ icon: "refresh" }} className="btn-small" />
        </div>
      )}
      {active && !isTimeGrid && (
        <>
          <CalendarNavigation
            date={active}
            click={(label) => monthChange({ label, active, setActive: moveTo })}
            previous={previous}
            next={next}
          />
          <CalendarView
            data={active}
            today={hideToday ? undefined : today}
            minDate={mininumDate}
            click={(e) => dayChange({ today, active: e, setActive: moveTo, events: calendarEvents, onDayClick })}
            events={
              calendarEvents
                ? calendarEvents.map((e) => {
                    const values = calendarValues(new Date(e.date));
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
