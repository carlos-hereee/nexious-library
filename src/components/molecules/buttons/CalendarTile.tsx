import { TileContent } from "@nxs-atoms";

export type CalendarTileProps = {
  data: {
    tile: number;
    isMuted: boolean;
    isToday: boolean;
    isSelected: boolean;
  };
  events?: { date: number; ping: number };
  click: () => void;
};
const CalendarTile: React.FC<CalendarTileProps> = (props) => {
  const { events, click, data } = props;
  return (
    <button
      className={`calendar-tile${
        data.isMuted ? " btn-calendar-tile--muted" : ""
      }${data.isToday ? " btn-calendar-tile--today" : ""} ${
        data.isSelected ? "btn-calendar-tile--selected" : ""
      } ${data.isMuted ? "text-mute" : ""}`}
      onClick={click}
      title={events ? `${events.date} has ${events.ping} events` : undefined}
    >
      {data.tile && events && events.date == data.tile && (
        <TileContent tile={events.ping} />
      )}
    </button>
  );
};
export default CalendarTile;
