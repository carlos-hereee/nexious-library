import { CalendarNavigation } from "@nxs-molecules";
import CalendarView from "@nxs-molecules/calendar/CalendarView";
import { useEffect, useState } from "react";

type CalendarProps = {
  value: Date;
  onChange?: string;
};
/**
 *
 * @param value min date
 * @returns
 */
const Calendar: React.FC<CalendarProps> = ({ value }) => {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [navigate, setNavigation] = useState();

  useEffect(() => {
    if (value) {
      updateValue(value);
    }
  }, [value]);
  const updateValue = (e: Date) => {
    setDay(e.getDay());
    setMonth(e.getMonth());
    setYear(e.getFullYear());
    setDate(e.getDate());
    setMax(new Date(e.getFullYear(), e.getMonth(), 0).getDate());
  };
  const monthChange = (e: string) => {
    if (e === "start") {
      updateValue(value);
    }
    if (e === "last") {
      updateValue(new Date(year, 12, 0));
    }
    if (e === "prev") {
      if (month === 0) {
        updateValue(new Date(year - 1, 12, 0));
      } else if (month <= 12) {
        updateValue(new Date(year, month - 1, 0));
      }
    }
    if (e === "next") {
      console.log("month", month);
      if (month === 11) {
        updateValue(new Date(year + 1, 0, 0));
      } else if (month <= 10) updateValue(new Date(year, month + 1, 0));
    }
  };
  return (
    <div className="calendar flex-d-column">
      {month && year && (
        <div className="flex-d-row">
          <CalendarNavigation month={month} year={year} click={monthChange} />
          <button className="btn btn-reset" onClick={() => updateValue(value)}>
            Reset
          </button>
        </div>
      )}
      {date && day && max && <CalendarView date={{ date, day, max }} />}
    </div>
  );
};
export default Calendar;
