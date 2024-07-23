import { Label } from "@nxs-atoms";
import type { FieldDateTimeProps } from "nxs-form";
import { useEffect, useState } from "react";
import type { CalendarDayProp, CalendarEventProp } from "nxs-calendar";
import { calendarValues, formatCalDayToDate } from "@nxs-utils/calendar/calendarValues";
import Calendar from "@nxs-template/Calendar";

const FieldDate = (props: FieldDateTimeProps) => {
  const { value, onChange, name, formMessage, label, error, hideLabels } = props;
  const [active, setActive] = useState<CalendarDayProp>(calendarValues(value ? new Date(value) : new Date()));
  // require key variable
  if (!onChange) throw Error("onChange is required");

  useEffect(() => {
    if (active) onChange(formatCalDayToDate(active));
  }, [active]);

  const handleClick = (e: CalendarDayProp | CalendarEventProp) => {
    if (e) setActive(e as CalendarDayProp);
  };
  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <Calendar value={new Date()} onDayClick={handleClick} hideToday />
    </>
  );
};
export default FieldDate;
