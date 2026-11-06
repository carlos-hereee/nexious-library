import { TileContent } from "@nxs-atoms";
import type { CalendarTileProps } from "nxs-calendar";
import { DEFAULT_CALENDAR_LABELS } from "@nxs-utils/calendar/calendarLabels";

// A direct consumer that passes no `title` keeps the English text this tile has always shown;
// CalendarView passes the localized one built from the calendar's `labels`.
const defaultTitle = (events: CalendarTileProps["events"]): string =>
  events?.date
    ? DEFAULT_CALENDAR_LABELS.tileEvents(events.date, events.ping ?? 0)
    : DEFAULT_CALENDAR_LABELS.tileNoEvents;

const CalendarTile: React.FC<CalendarTileProps> = ({ events, click, data, title }) => {
  return (
    <button
      className={`btn-calendar-tile${data.isMuted ? " btn-calendar-tile--muted" : ""}${
        data.isToday ? " btn-calendar-tile--today" : ""
      }${data.isSelected ? " btn-calendar-tile--selected" : ""}${data.isMuted ? " text-mute" : ""}`}
      onClick={click}
      type="button"
      title={title ?? defaultTitle(events)}
    >
      {data.tile}
      {events.day === data.tile && <TileContent tile={events.ping || 0} />}
    </button>
  );
};
export default CalendarTile;
