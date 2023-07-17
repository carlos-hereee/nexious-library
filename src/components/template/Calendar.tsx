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
  minDate?: Date;
  events?: CalendarDayEventProp[];
  selectedDay?: { date: Date };
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
  const { value, events, onDayClick, minDate, selectedDay } = props;
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
      console.log("value", value);
      setToday(calendarValues(new Date()));
      setCurrent(calendarValues(value));
    }
    if (minDate) {
      setMininumDate(calendarValues(minDate));
    }
  }, [value, minDate]);

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
    if (current) {
      if (e.date <= 0) prevMonth(current, setCurrent);
      if (e.date > 0 && e.date < current.maxDays) {
        const filter = findMatch(e);
        console.log("e", e);
        console.log("filter", filter);
        filter
          ? onDayClick(filter)
          : onDayClick({
              date: new Date(e.year, e.month, e.date).toDateString(),
            });
      }
      if (e.date > current.maxDays) nextMonth(current, setCurrent);
    }
  };
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
            selectedDay={selectedDay && calendarValues(selectedDay.date)}
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
