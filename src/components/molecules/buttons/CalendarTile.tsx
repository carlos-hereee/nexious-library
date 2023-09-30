import { TileContent } from "@nxs-atoms";
import { CalendarTileProps } from "nxs-calendar";

const CalendarTile: React.FC<CalendarTileProps> = (props) => {
  const { events, click, data } = props;
  if (!events) return;
  return (
    <button
      className={`calendar-tile${data.isMuted ? " btn-calendar-tile--muted" : ""}${
        data.isToday ? " btn-calendar-tile--today" : ""
      } ${data.isSelected ? "btn-calendar-tile--selected" : ""} ${
        data.isMuted ? "text-mute" : ""
      }`}
      onClick={click}
      title={events ? `${events.date} has ${events.ping} events` : undefined}
    >
      {data.tile && events.day === data.tile && <TileContent tile={events.ping || 0} />}
    </button>
  );
};
export default CalendarTile;
