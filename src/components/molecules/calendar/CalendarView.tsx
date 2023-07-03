import { sundayFirst, monthWeeks } from "@nxs-helpers/data";
import { TileContent } from "@nxs-atoms";
import { CalendarDayProps } from "@nxs-helpers/types";

type CalendarViewProps = {
  data: CalendarDayProps;
  click: (e: number) => void;
  minDate?: { minDay: number; minMonth: number };
  events?: any[];
};
const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate } = props;
  console.log("date.day", minDate);
  return (
    <div className="calendar-view">
      <div className="calendar-week flex-g">
        {sundayFirst.map((w) => (
          <span key={w} className="day text-overflow">
            {w}
          </span>
        ))}
      </div>
      <div className="calendar-view-month">
        {monthWeeks[data.weeks].map((mday) =>
          mday > data.start && mday <= data.maxDays + data.start ? (
            minDate?.minDay && minDate.minDay + data.start > mday ? (
              <button key={mday}>Min Day</button>
            ) : (
              <button
                key={mday}
                className="btn btn-calendar-tile"
                onClick={() => click(mday - data.day)}
              >
                {mday - data.start}
                {events?.includes(mday - data.start) ? (
                  <TileContent
                    tile={events.filter((e) => e === mday - data.day).length}
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
              onClick={() => click(mday - data.day)}
            >
              {" "}
              <span className="text-mute"> {mday}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
