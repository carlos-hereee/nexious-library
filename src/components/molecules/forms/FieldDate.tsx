import { Label } from "@nxs-atoms";
import type { FieldDateTimeProps } from "nxs-form";
import { useEffect, useState } from "react";
import type { CalendarDayProp, CalendarPEventDay } from "nxs-calendar";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import Calendar from "@nxs-template/Calendar";

const FieldDate = (props: FieldDateTimeProps) => {
  const { value, onChange, name, formMessage, label, error, hideLabels } = props;
  const [active, setActive] = useState<CalendarDayProp>(calendarValues(new Date(value || Date.now())));
  // require key variable
  if (!onChange) throw Error("onChange is required");

  useEffect(() => {
    if (active) onChange(active.date);
  }, [active]);

  const handleClick = (e: CalendarDayProp | CalendarPEventDay) => setActive(e as CalendarDayProp);
  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <Calendar value={new Date(value || Date.now())} onDayClick={handleClick} hideToday />
    </>
  );
};
export default FieldDate;
