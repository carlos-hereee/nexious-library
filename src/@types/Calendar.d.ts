declare module "nxs-calendar" {
  import type { UserProps } from "nxs-assets";

  export type EventProp = {
    date: string;
    startTime: number;
    endTime: number;
    uid?: string;
    eventId?: string;
    details?: string;
    isOpen?: boolean;
  };
  export type CalendarDayProp = {
    dayIdx: number;
    month: number;
    year: number;
    date: string;
    maxDays: number;
    weeks: number;
    start: number;
    day: number;
    yyyyddmm: string;
    ping?: number;
  };
  // Define your exported types here
  export type EventMeetingProps = { meeting: EventProp };
  export interface CalendarProps {
    value: Date;
    minDate?: Date;
    theme?: string;
    events: {
      date: string;
      list: EventProp[];
    }[];
    onDayClick?: (e: unknown) => void;
    setDay?: (a: unknown) => void;
  }
  export interface CalendarEventProps {
    selectedDay: { date: string; list: EventProp[] };
    setMeeting: (value: unknown) => void;
    setActive: (value: unknown) => void;
    removeFromCart: (value: unknown) => void;
    handleCheckout: (value: unknown) => void;
    user?: UserProps;
    active?: unknown;
    meeting?: EventProp;
    events: { date: string; list: EventProp[] };
  }
  export interface CalendarTileProps {
    data: {
      tile: number;
      isMuted: boolean;
      isToday: boolean;
      isSelected: boolean;
    };
    events: CalendarDayProp;
    click: (key: unknown) => void;
  }
  export interface CalendarNavProps {
    date: { month: number; year: number };
    click: (e: string) => void;
    previous: { label: string; icon: string }[];
    next: { label: string; icon: string }[];
  }
  export interface CalendarEventListProps {
    list: EventProp[];
    onClick: (key: unknown) => void;
    meeting: {
      uid?: string;
      meetingId?: string;
    };
  }
  export interface CalendarViewProps {
    data: CalendarDayProp;
    click: (e: CalendarDayProp) => void;
    today: CalendarDayProp;
    minDate?: CalendarDayProp;
    events: CalendarDayProp[];
  }
  export interface DayChangeProps {
    today: CalendarDayProp;
    active: CalendarDayProp;
    setActive: React.Dispatch<React.SetStateAction<CalendarDayProp>>;
    onDayClick: (e: unknown) => void;
    events: { date: string; list: EventProp[] }[];
  }
  export interface FindMatchProps {
    events?: { date: string; list: EventProp[] }[];
    calDay: CalendarDayProp;
  }
}
