declare module "nxs-calendar" {
  import type { DataContent } from "nxs-typography";
  import type { UserProps } from "nxs-assets";

  export type CalendarEventProp = {
    date: string;
    list: EventProp[];
  };
  export type MeetingProps = {
    response?: string;
    uid?: string;
    meetingId?: string;
    startTime?: string;
    date?: string;
    endTime?: string;
  };
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
    yyyymmdd: string;
    ping?: number;
  };
  // Define your exported types here
  export type EventMeetingProps = { meeting: MeetingProps };
  export interface CalendarProps {
    value: Date;
    minDate?: Date;
    theme?: string;
    hideToday?: boolean;
    events?: EventProp[];
    onDayClick?: (e: CalendarDayProp | CalendarEventProp) => void;
    setDay?: (a: unknown) => void;
  }
  export interface EventAttendees {
    uid: string;
    userId: string;
    username: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
  }
  export interface ICalEvent {
    uid: string;
    eventId: string;
    date: string;
    name: string;
    details: string;
    startTime: string;
    createdAt?: string;
    endTime: string;
    isOpen: boolean;
    attendees: EventAttendees[];
  }
  export interface ICalendarEventDetails {
    events?: ICalEvent[];
    event?: ICalEvent;
    onEventClick?: (event: ICalEvent) => void;
  }
  export interface CalendarEventProps {
    data?: { header?: DataContent; events?: ICalEvent[] };
    onEventClick?: (event: ICalEvent) => void;
    selectedDay?: ICalEvent;
    user?: UserProps;
    active?: string;
    meeting?: MeetingProps;
    event?: ICalEvent;
    children?: React.ReactNode;
    setMeeting?: (value: unknown) => void;
    setActive?: (value: unknown) => void;
    removeFromCart?: (value: unknown) => void;
    handleCheckout?: (value: unknown) => void;
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
    meeting: MeetingProps;
  }
  export interface CalendarViewProps {
    data: CalendarDayProp;
    click: (e: CalendarDayProp) => void;
    today?: CalendarDayProp;
    minDate?: CalendarDayProp;
    events: CalendarDayProp[];
  }
  export interface DayChangeProps {
    today: CalendarDayProp;
    active: CalendarDayProp;
    setActive: React.Dispatch<React.SetStateAction<CalendarDayProp>>;
    onDayClick?: (e: CalendarDayProp | CalendarEventProp) => void;
    events?: CalendarEventProp[];
  }
  export interface FindMatchProps {
    events?: CalendarEventProp[];
    calDay: CalendarDayProp;
  }
}
