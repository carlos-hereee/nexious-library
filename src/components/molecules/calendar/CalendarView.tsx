import { days, monthWeeks } from "@nxs-helpers/data";
import { TileContent } from "@nxs-atoms";

type CalendarViewProps = {
  date: { date: number; day: number; max: number };
  weeks: number | 4 | 5 | 6;
  click: (e: number) => void;
  events?: any[];
};
const CalendarView: React.FC<CalendarViewProps> = ({
  date,
  weeks,
  click,
  events,
}) => {
  return (
    <div className="calendar-view">
      <div className="calendar-week flex-g">
        {days.map((w) => (
          <span key={w} className="day text-overflow">
            {w}
          </span>
        ))}
      </div>
      <div className="calendar-view-month">
        {monthWeeks[weeks].map((md) =>
          md > date.day && md - date.day <= date.max ? (
            <button
              key={md}
              className="btn btn-calendar-tile"
              onClick={() => click(md - date.day)}
            >
              {md - date.day}
              {events?.includes(md - date.day) ? (
                <TileContent
                  tile={events.filter((e) => e === md - date.day).length}
                />
              ) : (
                ""
              )}
            </button>
          ) : (
            <button
              key={md}
              type="button"
              className="btn btn-calendar-tile"
              onClick={() => click(md - date.day)}
            >
              {" "}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
