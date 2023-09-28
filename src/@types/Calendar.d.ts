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
