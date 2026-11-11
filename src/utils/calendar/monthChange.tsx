import type { CalendarDayProp } from "nxs-calendar";
import { calendarValues, nextMonth, prevMonth } from "./calendarValues";

type MonthChageProps = {
  label: string;
  active?: CalendarDayProp;
  setActive: React.Dispatch<React.SetStateAction<CalendarDayProp>>;
};
export const monthChange = ({ label, active, setActive }: MonthChageProps) => {
  if (label === "start" && active) {
    setActive(calendarValues(new Date(active.year, 0, 1)));
  }
  // December of the same year, the partner of "start". Month 12 overflowed into January of the
  // next year, so "last" jumped a whole year past the month it names.
  if (label === "last" && active) {
    setActive(calendarValues(new Date(active.year, 11, 1)));
  }
  if (label === "prev" && active) prevMonth(active, setActive);
  if (label === "next" && active) nextMonth(active, setActive);
};
