import type { FindMatchProps, CalendarDayProp } from "nxs-calendar";
import { calendarValues } from "./calendarValues";

type TileMatchProps = {
  day1: CalendarDayProp;
  day: number;
  day2: CalendarDayProp;
};
type TileMuteProps = {
  day: number;
  minDate?: CalendarDayProp;
  data: CalendarDayProp;
};
export const isTileMatch = (props: TileMatchProps): boolean => {
  const { day1, day, day2 } = props;
  return day1.day === day && day1.month === day2.month && day1.year === day2.year;
};

export const isTileMute = ({ day, minDate, data }: TileMuteProps) => {
  const minYear = minDate && minDate?.year > data.year;
  const minMonth = minDate && minDate?.month > data.month;
  const currentMonth = minDate && minDate.month === data.month;
  const currentYear = minDate && minDate.year === data.year;
  const minDay = minDate && minDate.day > day;

  if (minYear) return true;
  if (currentYear && minMonth) return true;
  if (currentMonth && minDay) return true;
  return false;
};

export const findMatch = ({ events, calDay }: FindMatchProps) => {
  return events
    ? events?.filter((e) => {
        const values = calendarValues(new Date(e.date));
        return values.date === calDay.date && values.year === calDay.year && values.month === calDay.month;
      })[0]
    : null;
};
