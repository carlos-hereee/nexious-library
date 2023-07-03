import { sundayFirst, monthWeeks } from "@nxs-helpers/data";
import { Button } from "@nxs-atoms";
import { CalendarDayProps } from "@nxs-helpers/types";
import { CalendarTile } from "@nxs-molecules";

type CalendarViewProps = {
  data: CalendarDayProps;
  click: (e: number) => void;
  minDate?: { minDay: number; minMonth: number };
  events?: any[];
};
const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate } = props;
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
            <CalendarTile
              key={mday}
              click={() => click(mday - data.start)}
              events={events}
              data={{
                tile: mday - data.start,
                muted: minDate
                  ? minDate.minDay >= mday - data.start - 1
                  : false,
              }}
            />
          ) : (
            <Button
              key={mday}
              name="calendar-tile"
              click={() => click(mday - data.day)}
            />
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
