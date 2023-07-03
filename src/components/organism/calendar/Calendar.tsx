import { CalendarNavigation, IconButton } from "@nxs-molecules";
import { CalendarView } from "@nxs-molecules";
import { IconNames } from "@nxs-atoms";
import { useEffect, useState } from "react";

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
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(4);
  const [eventFormat, setEventFormat] = useState<number[]>();
  const [mininumDate, setMininumDate] = useState<{
    minDay: number;
    minMonth: number;
  }>();

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
        minDay: minDate.getDay(),
        minMonth: minDate.getMonth(),
      });
    }
  }, [value, minDate]);
  useEffect(() => {
    if (events && events.length > 0) {
      if (month || year) {
        let thisMonth = events.filter(({ date }) => {
          const current = new Date(date);
          return current.getMonth() === month && current.getFullYear() === year;
        });
        setEventFormat(thisMonth.map((m) => new Date(m.date).getDate()));
      }
    }
  }, [JSON.stringify(events), month, year]);

  const updateValue = (e: Date) => {
    // get max days for month
    const maxDays = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
    const start = e.getDay();
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
    if (e === "start") updateValue(new Date(year, 0, 1));
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
        minDate={mininumDate}
        weeks={weeks}
        click={dayChange}
        events={eventFormat}
      />
    </div>
  );
};
export default Calendar;
