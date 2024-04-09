import { TileContent } from "@nxs-atoms";
import type { CalendarTileProps } from "nxs-calendar";

const CalendarTile: React.FC<CalendarTileProps> = (props) => {
  const { events, click, data } = props;

  return (
    <button
      className={`btn-calendar-tile${data.isMuted ? " btn-calendar-tile--muted" : ""}${
        data.isToday ? " btn-calendar-tile--today" : ""
      }${data.isSelected ? " btn-calendar-tile--selected" : ""}${data.isMuted ? " text-mute" : ""}`}
      onClick={click}
      type="button"
      title={events?.date ? `${events.date} has ${events.ping} events` : "no events today"}
    >
      {events.day === data.tile ? <TileContent tile={events.ping || 0} /> : data.tile}
    </button>
  );
};
export default CalendarTile;
