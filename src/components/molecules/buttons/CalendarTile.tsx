import type { CalendarTileProps } from "nxs-calendar";
import { DEFAULT_CALENDAR_LABELS } from "@nxs-utils/calendar/calendarLabels";

// A direct consumer that passes no `title` keeps the English text this tile has always shown;
// CalendarView passes the localized one built from the calendar's `labels`.
const defaultTitle = (events: CalendarTileProps["events"]): string =>
  events?.date
    ? DEFAULT_CALENDAR_LABELS.tileEvents(events.date, events.ping ?? 0)
    : DEFAULT_CALENDAR_LABELS.tileNoEvents;

// Past two digits the badge stops growing; the tile's title still carries the exact count.
const MAX_SHOWN_COUNT = 99;

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
      {/* One badge holding the whole count. TileContent drew one absolutely positioned glyph per
          digit, so a day with 12 events stacked its 1 and 2 on the same spot. Hidden from
          assistive tech because the title already says how many events the day holds. */}
      {events.day === data.tile && Boolean(events.ping) && (
        <span className="calendar-tile-count" aria-hidden="true">
          {(events.ping ?? 0) > MAX_SHOWN_COUNT ? `${MAX_SHOWN_COUNT}+` : events.ping}
        </span>
      )}
    </button>
  );
};
export default CalendarTile;
