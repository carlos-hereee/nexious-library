import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { findMatch } from "./findMatch";
import { nextMonth, prevMonth } from "./calendarValues";

type DayChangeProps = {
  today: CalendarDayProps;
  active: CalendarDayProps;
  setActive: React.Dispatch<React.SetStateAction<CalendarDayProps | undefined>>;
  onDayClick?: (e: any) => void;
  events?: CalendarDayEventProp[];
};
export const dayChange = (props: DayChangeProps) => {
  const { today, active, setActive, onDayClick, events } = props;
  const { year, month, date } = active;
  const payload = { date: new Date(year, month, date).toDateString() };

  if (!events || !events.length) onDayClick && onDayClick(payload);
  if (active) {
    if (active.date <= 0) prevMonth(active, setActive);
    if (active.date > 0 && active.date <= today.maxDays) {
      const filter = findMatch({ events, calDay: active });
      onDayClick && onDayClick(filter ? filter : payload);
    }
    if (active.date > today.maxDays) nextMonth(active, setActive);
  }
};
