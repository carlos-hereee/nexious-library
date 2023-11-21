import type { FindMatchProps } from "nxs-calendar";
import { calendarValues } from "./calendarValues";

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
