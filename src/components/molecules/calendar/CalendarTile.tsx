import { Button, TileContent } from "@nxs-atoms";

export type CalendarTileProps = {
  data: { tile: number; muted: boolean };
  events?: any[];
  click: () => void;
};
const CalendarTile: React.FC<CalendarTileProps> = (props) => {
  const { events, click, data } = props;
  return (
    <Button
      name={
        data.muted ? "calendar-tile btn-calendar-tile--muted" : "calendar-tile"
      }
      click={click}
    >
      <span className={data.muted ? "text-mute" : ""}>{data.tile}</span>
      {events && events?.includes(data.tile) && (
        <TileContent tile={events.filter((e) => e === data.tile).length} />
      )}
    </Button>
  );
};
export default CalendarTile;
