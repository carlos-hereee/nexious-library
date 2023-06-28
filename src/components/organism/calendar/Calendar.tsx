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
  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [date, setDate] = useState<number>();
  const [max, setMax] = useState<number>();

  useEffect(() => {
    if (value) {
      setDay(value.getDay());
      setMonth(value.getMonth());
      setYear(value.getFullYear());
      setDate(value.getDate());
      setMax(new Date(value.getFullYear(), value.getMonth(), 0).getDate());
    }
  }, [value]);
  const monthChange = () => {};
  return (
    <div className="calendar flex-d-column">
      {month && year && (
        <CalendarNavigation month={month} year={year} click={monthChange} />
      )}
      {date && day && max && <CalendarView date={{ date, day, max }} />}
    </div>
  );
};
export default Calendar;
