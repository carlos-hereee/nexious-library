import { Button, ErrorMessage } from "@nxs-atoms/index";
import type { ICalendarEventDetails } from "nxs-calendar";

const CalendarEventList: React.FC<ICalendarEventDetails> = ({ events, event, onEventClick }) => {
  if (!events) return <ErrorMessage error={{ code: "missingProps", prop: "events", value: events }} />;

  return (
    <div className="event-list">
      {events.map((e) => (
        <Button
          key={e.uid}
          theme={event && event.uid === e.uid ? "btn-active btn-main highlight" : "btn-main highlight"}
          title={e.name}
          label={e.name}
          onClick={() => onEventClick && onEventClick(e)}
        />
      ))}
    </div>
  );
};
export default CalendarEventList;
