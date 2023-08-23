import { CalendarDayProps } from "@nxs-utils/helpers/types";

type TileMuteProps = {
  day: number;
  minDate?: CalendarDayProps;
  data: CalendarDayProps;
};
export const isTileMute = ({ day, minDate, data }: TileMuteProps) => {
  const minYear = minDate && minDate?.year > data.year;
  const minMonth = minDate && minDate?.month > data.month;
  const currentMonth = minDate && minDate.month === data.month;
  const currentYear = minDate && minDate.year === data.year;
  const minDay = minDate && minDate.date > day;

  if (minYear) return true;
  else if (currentYear && minMonth) return true;
  else if (currentMonth && minDay) return true;
  return false;
};
