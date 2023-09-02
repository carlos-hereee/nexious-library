import { CalendarDayProps } from "@nxs-utils/helpers/types";
import { calendarValues } from "./calendarValues";

type MonthChageProps = {
  e: string;
  current: CalendarDayProps;
  setCurrent: React.Dispatch<
    React.SetStateAction<CalendarDayProps | undefined>
  >;
  prevMonth?: any;
  nextMonth?: any;
};
export const monthChange = (props: MonthChageProps) => {
  const { e, current, setCurrent, prevMonth, nextMonth } = props;
  if (current) {
    if (e === "start") setCurrent(calendarValues(new Date(current.year, 0, 1)));
    if (e === "last") setCurrent(calendarValues(new Date(current.year, 12, 1)));
    if (e === "prev") prevMonth(current, setCurrent);
    if (e === "next") nextMonth(current, setCurrent);
  }
};
