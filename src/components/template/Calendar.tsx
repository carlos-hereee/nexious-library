import { CalendarView, CalendarNavigation, IconButton } from "@nxs-molecules";
import { useEffect, useState } from "react";
import { CalendarDayEventProp, CalendarDayProps } from "@nxs-utils/helpers/types";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { next, previous } from "@nxs-utils/calendar/navLabels";
import { monthChange } from "@nxs-utils/calendar/monthChange";
import { dayChange } from "@nxs-utils/calendar/dayChange";
import { CalendarProps } from "types/TemplateTypes";

/**
 *
 * @param value current date value
 * @param minDate the mininum date displayed on calendar
 * @param events list of events
 * @returns
 */
const Calendar: React.FC<CalendarProps> = (props) => {
  const { value, events, minDate, theme, onDayClick, setDay } = props;
  // keep track of today, min date, and which calenday is active
  const [active, setActive] = useState<CalendarDayProps>(calendarValues(value));
  const [mininumDate, setMininumDate] = useState<CalendarDayProps>();
  const today: CalendarDayProps = calendarValues(new Date());

  useEffect(() => {
    if (minDate) {
      setMininumDate(calendarValues(minDate));
    }
  }, [minDate]);

  useEffect(() => {
    // programatically setDay when new day is chosen
    if (active.date) {
      setDay && setDay(active);
    }
  }, [active]);

  return (
    <div className={theme ? `${theme} calendar` : "calendar"}>
      <div className="flex-j-end">
        <IconButton
          onClick={() => setActive(today)}
          icon={{ icon: "refresh" }}
          theme="btn-small"
        />
      </div>
      {active && (
        <CalendarNavigation
          data={active}
          click={(label) => monthChange({ label, active, setActive })}
          previous={previous}
          next={next}
        />
      )}
      {active && (
        <CalendarView
          data={active}
          today={today}
          minDate={mininumDate}
          click={(e) => dayChange({ today, active: e, setActive, events })}
          events={events?.map((e) => {
            const values = calendarValues(new Date(e.date));
            return { ...values, ping: e.list.length };
          })}
        />
      )}
    </div>
  );
};
export default Calendar;
