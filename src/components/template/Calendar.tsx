import { IconButton } from "@nxs-molecules";
import { useEffect, useState } from "react";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { next, previous } from "@nxs-utils/calendar/navLabels";
import { monthChange } from "@nxs-utils/calendar/monthChange";
import { dayChange } from "@nxs-utils/calendar/dayChange";
import type { CalendarDayProp, CalendarProps, EventProp } from "nxs-calendar";
import { CalendarNavigation, CalendarView } from "@nxs-organism/index";

/**
 *
 * @param value current date value
 * @param minDate the mininum date displayed on calendar
 * @param events list of events
 * @returns
 */
type CalEvent = {
  date: string;
  list: EventProp[];
};
const Calendar: React.FC<CalendarProps> = (props) => {
  const { value, events, minDate, theme, onDayClick, setDay, hideToday } = props;
  // keep track of today, min date, and which calenday is active
  const [active, setActive] = useState<CalendarDayProp>(calendarValues(value));
  const [mininumDate, setMininumDate] = useState<CalendarDayProp>();
  const [calendarEvents, setEvents] = useState<CalEvent[]>([]);
  const today: CalendarDayProp = calendarValues(new Date());

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
        // if no match add to data payload
        if (idx <= 0) data.push({ date: event.date, list: [event] });
        else data[idx].list.push(event);
      });
      setEvents(data);
    }
  }, [events]);

  return (
    <div className={theme ? `${theme} calendar` : "calendar"}>
      <div className="flex-j-end">
        <IconButton onClick={() => setActive(today)} icon={{ icon: "refresh" }} theme="btn-small" />
      </div>
      {active && (
        <>
          <CalendarNavigation
            date={active}
            click={(label) => monthChange({ label, active, setActive })}
            previous={previous}
            next={next}
          />
          <CalendarView
            data={active}
            today={hideToday ? undefined : today}
            minDate={mininumDate}
            click={(e) => dayChange({ today, active: e, setActive, events: calendarEvents, onDayClick })}
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
    </div>
  );
};
export default Calendar;
