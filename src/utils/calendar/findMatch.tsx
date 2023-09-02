import {
  CalendarDayEventProp,
  CalendarDayProps,
} from "@nxs-utils/helpers/types";
import { calendarValues } from "./calendarValues";

type FindMatchProps = {
  events?: CalendarDayEventProp[];
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
