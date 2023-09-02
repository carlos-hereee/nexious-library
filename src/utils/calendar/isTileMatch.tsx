import { CalendarDayProps } from "@nxs-utils/helpers/types";

type TileMatchProps = {
  day1: CalendarDayProps;
  date: number;
  day2: CalendarDayProps;
};
export const isTileMatch = (props: TileMatchProps): boolean => {
  const { day1, date, day2 } = props;
  return (
    day1.date === date && day1.month === day2.month && day1.year === day2.year
  );
};
