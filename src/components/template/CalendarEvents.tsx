import { HeaderContent } from "@nxs-molecules";
import CalendarEventDetails from "@nxs-organism/calendar/CalendarEventDetails";
import CalendarEventList from "@nxs-organism/calendar/CalendarEventList";
import type { CalendarPEventDays } from "nxs-calendar";

const CalendarEvents: React.FC<CalendarPEventDays> = ({ children, data, onEventClick, event }) => {
  if (!data) return <p>No data found</p>;

  return (
    <div className="container" id="calendar-events">
      {data.header && <HeaderContent data={data.header} />}
      {data.events && data.events.length > 0 ? (
        <CalendarEventList events={data.events} event={event} onEventClick={onEventClick} />
      ) : (
        <p>No events found</p>
      )}
      {event && <CalendarEventDetails event={event} />}
      {children}
    </div>
  );
};
export default CalendarEvents;
