import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { calendarValues } from "./calendarValues";

type FindMatchProps = {
  events: CalendarDayEventProp[];
  calDay: CalendarDayProps;
};
export const findMatch = (props: FindMatchProps) => {
  const { events, calDay } = props;
  return events?.filter((e: any) => {
    const values = calendarValues(new Date(e.date));
    return (
      values.date === calDay.date &&
      values.year === calDay.year &&
      values.month === calDay.month
    );
  })[0];
};

type DayChangeProps = {
  current: CalendarDayProps;
  e: CalendarDayProps;
  setCurrent: React.Dispatch<
    React.SetStateAction<CalendarDayProps | undefined>
  >;
  prevMonth?: any;
  nextMonth?: any;
  onDayClick?: any;
  events?: CalendarDayEventProp[];
};
export const dayChange = (props: DayChangeProps) => {
  const { current, e, setCurrent, prevMonth, onDayClick, nextMonth, events } =
    props;
  if (!events || !events.length) return {};
  if (current) {
    if (e.date <= 0) prevMonth(current, setCurrent);
    if (e.date > 0 && e.date <= current.maxDays) {
      const filter = findMatch({ events: events ? events : [], calDay: e });
      console.log("filter", filter);
      // filter
      //   ? onDayClick(filter)
      //   : onDayClick({
      //       date: new Date(e.year, e.month, e.date).toDateString(),
      //       list: [],
      //     });
    }
    if (e.date > current.maxDays) nextMonth(current, setCurrent);
  }
};
