import { calendarValues } from "./calendarValues";
import type { FindMatchProps } from "nxs-calendar";

export const findMatch = (props: FindMatchProps) => {
  const { events, calDay } = props;
  return events
    ? events?.filter((e) => {
        const values = calendarValues(new Date(e.date));
        return (
          values.date === calDay.date &&
          values.year === calDay.year &&
          values.month === calDay.month
        );
      })[0]
    : [null];
};
