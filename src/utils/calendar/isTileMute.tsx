import type { CalendarDayProp } from "nxs-calendar";

type TileMuteProps = {
  day: number;
  minDate?: CalendarDayProp;
  data: CalendarDayProp;
};
export const isTileMute = ({ day, minDate, data }: TileMuteProps) => {
  const minYear = minDate && minDate?.year > data.year;
  const minMonth = minDate && minDate?.month > data.month;
  const currentMonth = minDate && minDate.month === data.month;
  const currentYear = minDate && minDate.year === data.year;
  const minDay = minDate && minDate.day > day;

  if (minYear) return true;
  else if (currentYear && minMonth) return true;
  else if (currentMonth && minDay) return true;
  return false;
};
