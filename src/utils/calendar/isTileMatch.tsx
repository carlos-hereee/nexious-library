import { CalendarDayProps } from "@nxs-utils/helpers/types";

type TileMatchProps = {
  day1: CalendarDayProps;
  day: number;
  day2: CalendarDayProps;
};
export const isTileMatch = (props: TileMatchProps): boolean => {
  const { day1, day, day2 } = props;
  return (
    day1.day === day && day1.month === day2.month && day1.year === day2.year
  );
};
