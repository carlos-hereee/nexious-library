import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { findMatch } from "./findMatch";
import { nextMonth, prevMonth } from "./calendarValues";

type DayChangeProps = {
  today: CalendarDayProps;
  active: CalendarDayProps;
  setActive: React.Dispatch<React.SetStateAction<CalendarDayProps>>;
  events?: CalendarDayEventProp[];
};
export const dayChange = (props: DayChangeProps) => {
  const { today, active, setActive, events } = props;
  // click previous month
  if (active.day <= 0) prevMonth(active, setActive);
  // current calendar view
  if (active.day > 0 && active.day <= today.maxDays) {
    // events found
    if (events && events.length) {
      const match = findMatch({ events, calDay: active });
      console.log("filter", match);
      // if (!match) {
      //   setActive(calendarValues(new Date(active.date)));
      // } else onDayClick && onDayClick(match);
    }
    // no events found
    setActive(active);
  }
  // next month
  if (active.day > today.maxDays) nextMonth(active, setActive);
};
