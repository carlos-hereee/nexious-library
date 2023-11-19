import type { CalendarDayProp } from "nxs-calendar";
import { calendarValues, nextMonth, prevMonth } from "./calendarValues";

type MonthChageProps = {
  label: string;
  active?: CalendarDayProp;
  setActive: React.Dispatch<React.SetStateAction<CalendarDayProp>>;
};
export const monthChange = (props: MonthChageProps) => {
  const { label, active, setActive } = props;
  if (label === "start" && active) {
    setActive(calendarValues(new Date(active.year, 0, 1)));
  }
  if (label === "last" && active) {
    setActive(calendarValues(new Date(active.year, 12, 1)));
  }
  if (label === "prev" && active) prevMonth(active, setActive);
  if (label === "next" && active) nextMonth(active, setActive);
};
