import type { DayChangeProps } from "nxs-calendar";
import { findMatch } from "./findMatch";
import { nextMonth, prevMonth } from "./calendarValues";

export const dayChange = ({ today, active, setActive, events, onDayClick }: DayChangeProps) => {
  // click previous month
  if (active.day <= 0) prevMonth(active, setActive);
  // current calendar view
  if (active.day > 0 && active.day <= today.maxDays) {
    const match = findMatch({ events, calDay: active });
    setActive(active);
    if (onDayClick) onDayClick(match || { date: active.date, list: [] });
  }
  // next month
  if (active.day > today.maxDays) nextMonth(active, setActive);
};
