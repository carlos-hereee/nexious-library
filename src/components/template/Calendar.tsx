import { CalendarView, CalendarNavigation, IconButton } from "@nxs-molecules";
import { IconNames } from "@nxs-atoms";
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
  const { value, events, onDayClick, minDate } = props;
  const [current, setCurrent] = useState<CalendarDayProps>();
  const [today, setToday] = useState<CalendarDayProps>();
  const [mininumDate, setMininumDate] = useState<CalendarDayProps>();

  const previous: { label: string; icon: IconNames }[] = [
    { label: "start", icon: "first" },
    { label: "prev", icon: "left" },
  ];
  const next: { label: string; icon: IconNames }[] = [
    { label: "next", icon: "right" },
    { label: "last", icon: "last" },
  ];

  useEffect(() => {
    if (value) {
      setToday(calendarValues(new Date()));
      setCurrent(calendarValues(value));
    }
    if (minDate) {
      setMininumDate(calendarValues(minDate));
    }
  }, [value, minDate]);

  const dayMatch = (e: number) => {
    return events?.filter(({ date }) => new Date(date).getDate() === e)[0];
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
  const dayChange = (e: number) => {
    if (current) {
      if (e <= 0) prevMonth(current, setCurrent);
      if (e > 0 && e < current.maxDays) {
        const filter = dayMatch(e);
        filter ? onDayClick(filter) : onDayClick({ date: current.day });
      }
      if (e > current.maxDays) nextMonth(current, setCurrent);
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
            minDate={mininumDate}
            click={dayChange}
            events={events?.map((e) => {
              return { date: new Date(e.date).getDate(), ping: e.list.length };
            })}
          />
        </>
      )}
    </div>
  );
};
export default Calendar;
