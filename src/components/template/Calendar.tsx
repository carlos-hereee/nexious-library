import { CalendarView, CalendarNavigation, IconButton } from "@nxs-molecules";
import { useEffect, useState } from "react";
import { CalendarDayEventProp, CalendarDayProps } from "@nxs-helpers/types";
import {
  calendarValues,
  nextMonth,
  prevMonth,
} from "@nxs-utils/calendar/calendarValues";

type CalendarProps = {
  value: Date;
  selectedDay: { date: Date; list: { [a: string]: string | number }[] };
  minDate?: Date;
  events?: CalendarDayEventProp[];
  setSelectedDay?: (a: any) => void;
  onDayClick: (e: any) => void;
};

/**
 *
 * @param value current date value
 * @param minDate the mininum date displayed on calendar
 * @param events list of events
 * @returns
 */
const Calendar: React.FC<CalendarProps> = (props) => {
  const { value, events, onDayClick, minDate, selectedDay, setSelectedDay } =
    props;
  const [current, setCurrent] = useState<CalendarDayProps>();
  const [today, setToday] = useState<CalendarDayProps>();
  const [mininumDate, setMininumDate] = useState<CalendarDayProps>();

  const previous: { label: string; icon: string }[] = [
    { label: "start", icon: "first" },
    { label: "prev", icon: "left" },
  ];
  const next: { label: string; icon: string }[] = [
    { label: "next", icon: "right" },
    { label: "last", icon: "last" },
  ];

  useEffect(() => {
    if (value) {
      const currentCalendarValues = calendarValues(value);
      const calendarMatch = findMatch(currentCalendarValues);
      if (setSelectedDay) {
        calendarMatch?.date
          ? setSelectedDay(calendarMatch)
          : setSelectedDay({ date: currentCalendarValues.day, list: [] });
      }
      setToday(calendarValues(new Date()));
      setCurrent(currentCalendarValues);
    }
    if (minDate) {
      setMininumDate(calendarValues(minDate));
    }
  }, []);

  const findMatch = (calDay: CalendarDayProps) => {
    return events?.filter((e) => {
      const values = calendarValues(new Date(e.date));
      return (
        values.date === calDay.date &&
        values.year === calDay.year &&
        values.month === calDay.month
      );
    })[0];
  };
  const monthChange = (e: string) => {
    if (current) {
      if (e === "start")
        setCurrent(calendarValues(new Date(current.year, 0, 1)));
      if (e === "last")
        setCurrent(calendarValues(new Date(current.year, 12, 1)));
      if (e === "prev") prevMonth(current, setCurrent);
      if (e === "next") nextMonth(current, setCurrent);
    }
  };
  const dayChange = (e: CalendarDayProps) => {
    console.log("e", e);
    if (current) {
      if (e.date <= 0) prevMonth(current, setCurrent);
      if (e.date > 0 && e.date <= current.maxDays) {
        const filter = findMatch(e);
        filter
          ? onDayClick(filter)
          : onDayClick({
              date: new Date(e.year, e.month, e.date).toDateString(),
              list: [],
            });
      }
      if (e.date > current.maxDays) nextMonth(current, setCurrent);
    }
  };
  console.log("selectedDay", selectedDay);
  return (
    <div className="calendar flex-d-column">
      <div className="calendar-icon-container flex-j-end">
        <IconButton
          click={() => setCurrent(calendarValues(value))}
          icon={{ icon: "refresh" }}
        />
      </div>
      {current && (
        <>
          <CalendarNavigation
            date={current}
            click={monthChange}
            previous={previous}
            next={next}
          />
          <CalendarView
            data={current}
            today={today}
            selectedDay={
              selectedDay?.date
                ? calendarValues(new Date(selectedDay.date))
                : current
            }
            minDate={mininumDate}
            click={dayChange}
            events={events?.map((e) => {
              const values = calendarValues(new Date(e.date));
              return { ...values, ping: e.list.length };
            })}
          />
        </>
      )}
    </div>
  );
};
export default Calendar;
