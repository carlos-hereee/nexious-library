import { CalendarNavigation } from "@nxs-molecules";
import CalendarView from "@nxs-molecules/calendar/CalendarView";
import { useEffect, useState } from "react";

type CalendarProps = {
  value?: Date;
  onChange?: string;
};
/**
 *
 * @param value min date
 * @returns
 */
const Calendar: React.FC<CalendarProps> = ({ value }) => {
  const [day, setDay] = useState(new Date().getDay());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (value) {
      setDay(value.getDay());
      setMonth(value.getMonth());
      setYear(value.getFullYear());
    }
  }, [value]);
  return (
    <div className="calendar flex-d-column">
      <CalendarNavigation month={month} day={day} year={year} />
      {/* <p>Calendar view </p> */}
      <CalendarView />
    </div>
  );
};
export default Calendar;
