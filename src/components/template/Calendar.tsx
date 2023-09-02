import { CalendarView, CalendarNavigation, IconButton } from "@nxs-molecules";
import { useEffect, useState } from "react";
import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { next, previous } from "@nxs-utils/calendar/navLabels";
import { monthChange } from "@nxs-utils/calendar/monthChange";
import { dayChange } from "@nxs-utils/calendar/dayChange";
import { findMatch } from "@nxs-utils/calendar/findMatch";

type CalendarProps = {
  value?: Date;
  selectedDay?: { date: Date; list: { [a: string]: string | number }[] };
  minDate?: Date;
  theme?: string;
  events?: CalendarDayEventProp[];
  setSelectedDay?: (a: any) => void;
  onDayClick?: (e: any) => void;
};

/**
 *
 * @param value current date value
 * @param minDate the mininum date displayed on calendar
 * @param events list of events
 * @returns
 */
const Calendar: React.FC<CalendarProps> = (props) => {
  const { value, events, minDate, selectedDay, theme } = props;
  const { onDayClick, setSelectedDay } = props;
  // keep track of today, min date, and which calenday is active
  const [active, setActive] = useState<CalendarDayProps>();
  const [today, setToday] = useState<CalendarDayProps>();
  const [mininumDate, setMininumDate] = useState<CalendarDayProps>();

  useEffect(() => {
    if (!value) {
      const todayValues = calendarValues(new Date());
      setToday(todayValues);
      setActive(todayValues);
    }
    if (value) {
      const currentCalendarValues = calendarValues(value);
      const calendarMatch = findMatch({
        calDay: currentCalendarValues,
        events: events ? events : [],
      });
      if (setSelectedDay) {
        calendarMatch?.date
          ? setSelectedDay(calendarMatch)
          : setSelectedDay({ date: currentCalendarValues.day, list: [] });
      }
      setToday(calendarValues(new Date()));
      setActive(currentCalendarValues);
    }
    if (minDate) {
      setMininumDate(calendarValues(minDate));
    }
  }, []);

  return (
    active && (
      <div
        className={theme ? `${theme} container calendar` : "container calendar"}
      >
        {value && (
          <div className="flex-j-end">
            <IconButton
              click={() => setActive(calendarValues(value))}
              icon={{ icon: "refresh" }}
              theme="btn-small"
            />
          </div>
        )}
        <CalendarNavigation
          date={active}
          click={(label) => monthChange({ label, active, setActive })}
          previous={previous}
          next={next}
        />
        <CalendarView
          data={active}
          today={today}
          selectedDay={
            selectedDay?.date
              ? calendarValues(new Date(selectedDay.date))
              : active
          }
          minDate={mininumDate}
          click={(e) =>
            dayChange({
              today: today ? today : calendarValues(new Date()),
              active: e,
              setActive,
              onDayClick,
              events,
            })
          }
          events={events?.map((e) => {
            const values = calendarValues(new Date(e.date));
            return { ...values, ping: e.list.length };
          })}
        />
      </div>
    )
  );
};
export default Calendar;
