import { Button, ErrorMessage } from "@nxs-atoms/index";
import type { ICalendarEventDetails } from "nxs-calendar";
import { buildNxsButtonClass } from "../../../@types/Variant";

const CalendarEventList: React.FC<ICalendarEventDetails> = ({ events, event, onEventClick, isDev }) => {
  if (!events)
    return (
      <ErrorMessage
        isDev={isDev}
        error={{ code: "missingProps", prop: "events", value: events, component: "CalendarEventList" }}
      />
    );

  return (
    <div className="event-list">
      {/* The open event reads as the primary nxs-btn and the rest as secondary (2026-11 item 337);
          btn-active, btn-main and highlight stay beside them until 2026-11 item 339. */}
      {events.map((e) => (
        <Button
          key={e.uid}
          className={
            event && event.uid === e.uid
              ? buildNxsButtonClass({ variant: "primary", className: "btn-active btn-main highlight" })
              : buildNxsButtonClass({ variant: "secondary", className: "btn-main highlight" })
          }
          title={e.name}
          label={e.name}
          onClick={() => onEventClick && onEventClick(e)}
        />
      ))}
    </div>
  );
};
export default CalendarEventList;
