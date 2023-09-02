import { CalendarView, CalendarNavigation, IconButton } from "@nxs-molecules";
import { useEffect, useState } from "react";
import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { next, previous } from "@nxs-utils/calendar/navLabels";
import { monthChange } from "@nxs-utils/calendar/monthChange";
import { dayChange } from "@nxs-utils/calendar/dayChange";

type CalendarProps = {
  value?: Date;
  minDate?: Date;
  theme?: string;
  events?: CalendarDayEventProp[];
  onDayClick?: (e: any) => void;
};

/**
 *
 * @param value current date value
 * @param minDate the mininum date displayed on calendar
 * @param events list of events
 * @returns
 */
const Calendar: React.FC<CalendarProps> = (props) => {
  const { value, events, minDate, theme, onDayClick } = props;
  // keep track of today, min date, and which calenday is active
  const [active, setActive] = useState<CalendarDayProps>(
    value ? calendarValues(value) : calendarValues(new Date())
  );
  const [mininumDate, setMininumDate] = useState<CalendarDayProps>();
  const today: CalendarDayProps = calendarValues(new Date());

  useEffect(() => {
    if (minDate) {
      setMininumDate(calendarValues(minDate));
    }
  }, []);

  return (
    <div className={theme ? `${theme} calendar` : "calendar"}>
      <div className="flex-j-end">
        <IconButton
          click={() => setActive(today)}
          icon={{ icon: "refresh" }}
          theme="btn-small"
        />
      </div>
      <CalendarNavigation
        data={active}
        click={(label) => monthChange({ label, active, setActive })}
        previous={previous}
        next={next}
      />
      <CalendarView
        data={active}
        today={today}
        minDate={mininumDate}
        click={(e) =>
          dayChange({ today, active: e, setActive, onDayClick, events })
        }
        events={events?.map((e) => {
          const values = calendarValues(new Date(e.date));
          return { ...values, ping: e.list.length };
        })}
      />
    </div>
  );
};
export default Calendar;
