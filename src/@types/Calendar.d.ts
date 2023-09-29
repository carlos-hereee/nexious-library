/**
 * syntax - "my-module" is the name you want to use when importing the
 *           module and should match the name used in import statements
 * */
declare module "nxs-calendar" {
  // Define your exported types here
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
}
declare module "nxs-calendar-events" {
  export interface CalendarEventProps {
    selectedDay: { date: string; list: any[] };
    setMeeting: (value: any) => void;
    setActive: (value: any) => void;
    removeFromCart: (value: any) => void;
    handleCheckout: (value: any) => void;
    user?: any;
    active?: any;
    meeting?: any;
    events: any[];
  }
}
