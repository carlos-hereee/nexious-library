import { TileContent } from "@nxs-atoms";
import type { CalendarTileProps } from "nxs-calendar";

const CalendarTile: React.FC<CalendarTileProps> = ({ events, click, data }) => {
  return (
    <button
      className={`btn-calendar-tile${data.isMuted ? " btn-calendar-tile--muted" : ""}${
        data.isToday ? " btn-calendar-tile--today" : ""
      }${data.isSelected ? " btn-calendar-tile--selected" : ""}${data.isMuted ? " text-mute" : ""}`}
      onClick={click}
      type="button"
      title={events?.date ? `${events.date} has ${events.ping} events` : "no events today"}
    >
      {data.tile}
      {events.day === data.tile && <TileContent tile={events.ping || 0} />}
    </button>
  );
};
export default CalendarTile;
