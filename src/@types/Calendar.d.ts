// /**
//  * syntax - "my-module" is the name you want to use when importing the
//  *           module and should match the name used in import statements
//  * */

type EventProp = {
  date: string;
  startTime: number;
  endTime: number;
  uid?: string;
  eventId?: string;
  details?: string;
  isOpen?: boolean;
};
type CalendarDayProp = {
  dayIdx: number;
  month: number;
  year: number;
  date: string;
  maxDays: number;
  weeks: number;
  start: number;
  day: number;
  yyyyddmm: string;
};

declare module "nxs-calendar" {
  // Define your exported types here
  export type EventMeetingProps = { meeting: EventProp };
  export interface CalendarProps {
    value: Date;
    minDate?: Date;
    theme?: string;
    events?: {
      date: string;
      list: {
        uid: string;
        response: string;
        isOpen: boolean;
        date: string;
        start: number;
        end: number;
      }[];
    }[];
    onDayClick?: (e: any) => void;
    setDay?: (a: any) => void;
  }
  export interface CalendarEventProps {
    selectedDay: { date: string; list: EventProp[] };
    setMeeting: (value: any) => void;
    setActive: (value: any) => void;
    removeFromCart: (value: any) => void;
    handleCheckout: (value: any) => void;
    user?: any;
    active?: any;
    meeting?: any;
    events: any[];
  }
  export interface CalendarNavProps {
    date: { month: number; year: number };
    click: (e: string) => void;
    previous: { label: string; icon: string }[];
    next: { label: string; icon: string }[];
  }
  export interface CalendarEventListProps {
    list: EventProp[];
    onClick: (key: any) => void;
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
    events?: CalendarDayProp[];
  }
}
