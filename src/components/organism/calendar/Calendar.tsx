import { CalendarNavigation, IconButton } from "@nxs-molecules";
import { CalendarView } from "@nxs-molecules";
import { IconNames } from "@nxs-atoms";
import { useEffect, useState } from "react";

type CalendarProps = {
  value: Date;
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
 * @param value min date
 * @returns
 */
const Calendar: React.FC<CalendarProps> = ({ value, events, onDayClick }) => {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(4);
  const [eventFormat, setEventFormat] = useState<number[]>();

  const previous: { label: string; icon: IconNames }[] = [
    { label: "start", icon: "first" },
    { label: "prev", icon: "left" },
  ];
  const next: { label: string; icon: IconNames }[] = [
    { label: "next", icon: "right" },
    { label: "last", icon: "last" },
  ];

  useEffect(() => value && updateValue(value), [value]);
  useEffect(() => {
    if (events && events.length > 0) {
      if (month) {
        let thisMonth = events.filter(({ date }) => {
          return new Date(date).getMonth() === month;
        });
        setEventFormat(thisMonth.map((m) => new Date(m.date).getDate()));
      }
    }
  }, [JSON.stringify(events), month]);

  const updateValue = (e: Date) => {
    const maxDays = new Date(e.getFullYear(), e.getMonth(), 0).getDate();
    const start = e.getDay();
    console.log("e.getMonth()", e.getMonth());
    const maxWeeks = (maxDays + start) / 7;
    setDay(start);
    setMonth(e.getMonth());
    setYear(e.getFullYear());
    setDate(e.getDate());
    setMax(maxDays);
    setWeeks(Math.ceil(maxWeeks));
  };
  const prevMonth = () => {
    if (month === 0) {
      updateValue(new Date(year - 1, 12, 1));
    }
    if (month <= 12) {
      updateValue(new Date(year, month - 1, 1));
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      updateValue(new Date(year + 1, 1, 0));
    }
    if (month < 11) {
      updateValue(new Date(year, month + 1, 1));
    }
  };
  const monthChange = (e: string) => {
    if (e === "start") updateValue(value);
    if (e === "last") updateValue(new Date(year, 12, 1));
    if (e === "prev") prevMonth();
    if (e === "next") nextMonth();
  };
  const dayChange = (e: number) => {
    if (e <= 0) prevMonth();
    if (e > 0 && e < max) {
      onDayClick && onDayClick(new Date(year, month, e));
    }
    if (e > max) nextMonth();
  };
  return (
    <div className="calendar flex-d-column">
      <div className="calendar-icon-container flex-j-end">
        <IconButton
          click={() => updateValue(value)}
          icon={{ icon: "refresh" }}
        />
      </div>
      <CalendarNavigation
        date={{ month, year }}
        click={monthChange}
        previous={previous}
        next={next}
      />
      <CalendarView
        date={{ date, day, max }}
        weeks={weeks}
        click={dayChange}
        events={eventFormat}
      />
    </div>
  );
};
export default Calendar;
