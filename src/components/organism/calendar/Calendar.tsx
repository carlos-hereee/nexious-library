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
  console.log("value", day, month, year);
  return (
    <div className="calendar flex-d-column">
      <p>Calendar view </p>
    </div>
  );
};
export default Calendar;
