import { Button, TileContent } from "@nxs-atoms";

export type CalendarTileProps = {
  data: { tile: number; isMuted: boolean; isToday: boolean };
  events?: { date: number; ping: number };
  click: () => void;
};
const CalendarTile: React.FC<CalendarTileProps> = (props) => {
  const { events, click, data } = props;
  return (
    <Button
      name={`calendar-tile${data.isMuted ? " btn-calendar-tile--muted" : ""}${
        data.isToday ? " btn-calendar-tile--today" : ""
      }`}
      click={click}
    >
      <span className={data.isMuted ? "text-mute" : ""}>{data.tile}</span>
      {events && events.date == data.tile && <TileContent tile={events.ping} />}
    </Button>
  );
};
export default CalendarTile;
