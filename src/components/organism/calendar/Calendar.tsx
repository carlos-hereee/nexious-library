import { CalendarNavigation, IconButton } from "@nxs-molecules";
import { CalendarView } from "@nxs-molecules";
import { IconNames } from "@nxs-atoms";
import { useEffect, useState } from "react";
import { CalendarDayProps, CalendarMinimumDayProps } from "@nxs-helpers/types";

type CalendarProps = {
  value: Date;
  minDate?: Date;
  events?: {
    uid: string;
    response: string;
    isOpen: boolean;
    date: string;
    start: number;
    end: number;
  }[];
  onDayClick?: (e: Date) => void;
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
  const [eventFormat, setEventFormat] = useState<number[]>();
  const [mininumDate, setMininumDate] = useState<CalendarMinimumDayProps>();

  const previous: { label: string; icon: IconNames }[] = [
    { label: "start", icon: "first" },
    { label: "prev", icon: "left" },
  ];
  const next: { label: string; icon: IconNames }[] = [
    { label: "next", icon: "right" },
    { label: "last", icon: "last" },
  ];

  useEffect(() => {
    if (value) updateValue(value);
    if (minDate) {
      setMininumDate({
        day: minDate.getDate(),
        month: minDate.getMonth(),
        year: minDate.getFullYear(),
      });
    }
  }, [value, minDate]);
  useEffect(() => {
    if (events && events.length > 0) {
      if (current?.month || current?.year) {
        let thisMonth = events.filter(({ date }) => {
          const c = new Date(date);
          return (
            c.getMonth() === current.month && c.getFullYear() === current.year
          );
        });
        setEventFormat(thisMonth.map((m) => new Date(m.date).getDate()));
      }
    }
  }, [JSON.stringify(events), current?.month, current?.year]);

  const updateValue = (e: Date) => {
    // get max days for current.month
    const maxDays = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
    const start = new Date(e.getFullYear(), e.getMonth(), 1).getDay();
    const maxWeeks = Math.ceil((maxDays + start) / 7);
    setCurrent({
      day: e.getDay(),
      month: e.getMonth(),
      year: e.getFullYear(),
      date: e.getDate(),
      maxDays: maxDays,
      weeks: maxWeeks,
      start,
    });
  };
  const prevMonth = () => {
    if (current) {
      if (current.month === 0) {
        updateValue(new Date(current.year - 1, 12, 1));
      }
      if (current.month <= 12) {
        updateValue(new Date(current.year, current.month - 1, 1));
      }
    }
  };
  const nextMonth = () => {
    if (current) {
      if (current.month === 11) {
        updateValue(new Date(current.year + 1, 1, 0));
      }
      if (current.month < 11) {
        updateValue(new Date(current.year, current.month + 1, 1));
      }
    }
  };
  const monthChange = (e: string) => {
    if (current) {
      if (e === "start") updateValue(new Date(current.year, 0, 1));
      if (e === "last") updateValue(new Date(current.year, 12, 1));
    }
    if (e === "prev") prevMonth();
    if (e === "next") nextMonth();
  };
  const dayChange = (e: number) => {
    if (e <= 0) prevMonth();
    if (current) {
      if (e > 0 && e < current.maxDays) {
        onDayClick && onDayClick(new Date(current.year, current.month, e));
      }
      if (e > current.maxDays) nextMonth();
    }
  };
  return (
    <div className="calendar flex-d-column">
      <div className="calendar-icon-container flex-j-end">
        <IconButton
          click={() => updateValue(value)}
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
            minDate={mininumDate}
            click={dayChange}
            events={eventFormat}
          />
        </>
      )}
    </div>
  );
};
export default Calendar;
