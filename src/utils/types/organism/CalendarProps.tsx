import { CalendarDayEventProp } from "@nxs-utils/helpers/types";

export interface CalendarProps {
  value: Date;
  minDate?: Date;
  theme?: string;
  events?: CalendarDayEventProp[];
  onDayClick?: (e: any) => void;
  setDay?: (a: any) => void;
}
