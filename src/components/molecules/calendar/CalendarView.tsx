import { days, monthWeeks } from "@nxs-helpers/data";
import { TileContent } from "@nxs-atoms";

type CalendarViewProps = {
  date: { date: number; day: number; max: number };
  weeks: number | 4 | 5 | 6;
  click: (e: number) => void;
  minDate?: { minDay: number; minMonth: number };
  events?: any[];
};
const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { date, weeks, click, events, minDate } = props;
  // console.log("date.day", date);
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
        {monthWeeks[weeks].map((mday) =>
          mday > date.day && mday - date.day <= date.max ? (
            minDate?.minDay && minDate.minDay + date.day > mday ? (
              <button>Min Day</button>
            ) : (
              <button
                key={mday}
                className="btn btn-calendar-tile"
                onClick={() => click(mday - date.day)}
              >
                {mday - date.day}
                {events?.includes(mday - date.day) ? (
                  <TileContent
                    tile={events.filter((e) => e === mday - date.day).length}
                  />
                ) : (
                  ""
                )}
              </button>
            )
          ) : (
            <button
              key={mday}
              type="button"
              className="btn btn-calendar-tile"
              onClick={() => click(mday - date.day)}
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
