import type { CalendarDayProp } from "nxs-calendar";

type TileMatchProps = {
  day1: CalendarDayProp;
  day: number;
  day2: CalendarDayProp;
};
export const isTileMatch = (props: TileMatchProps): boolean => {
  const { day1, day, day2 } = props;
  return day1.day === day && day1.month === day2.month && day1.year === day2.year;
};
