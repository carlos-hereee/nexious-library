import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { findMatch } from "./findMatch";
import { calendarValues, nextMonth, prevMonth } from "./calendarValues";

type DayChangeProps = {
  today: CalendarDayProps;
  active: CalendarDayProps;
  setActive: React.Dispatch<React.SetStateAction<CalendarDayProps>>;
  onDayClick?: (e: any) => void;
  events?: CalendarDayEventProp[];
};
export const dayChange = (props: DayChangeProps) => {
  const { today, active, setActive, onDayClick, events } = props;

  if (!events || !events.length) {
    return setActive(active);
  }
  // if click previous month
  if (active.date <= 0) prevMonth(active, setActive);
  // current calendar view
  if (active.date > 0 && active.date <= today.maxDays) {
    const filter = findMatch({ events, calDay: active });
    if (!filter) setActive(calendarValues(new Date(active.day)));
    else onDayClick && onDayClick(filter);
  }
  // next month
  if (active.date > today.maxDays) nextMonth(active, setActive);
};
