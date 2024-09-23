import { HeaderContent } from "@nxs-molecules";
import CalendarEventDetails from "@nxs-organism/calendar/CalendarEventDetails";
import type { CalendarEventProps } from "nxs-calendar";

const CalendarEvents: React.FC<CalendarEventProps> = (props) => {
  const { children, data, selectedDay } = props;
  return (
    <div className="container" id="calendar-events">
      {data && data.header && <HeaderContent data={data.header} />}
      {selectedDay ? <CalendarEventDetails selectedDay={selectedDay} /> : <p>No events found</p>}

      {children}
    </div>
  );
};
export default CalendarEvents;
