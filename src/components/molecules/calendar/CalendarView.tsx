import { sundayFirst, monthWeeks } from "@nxs-helpers/data";
import { Button } from "@nxs-atoms";
import { CalendarDayProps, CalendarMinimumDayProps } from "@nxs-helpers/types";
import { CalendarTile } from "@nxs-molecules";
import { isTileMute } from "@nxs-utils/isTileMute";

type CalendarViewProps = {
  data: CalendarDayProps;
  click: (e: number, isMuted: boolean) => void;
  minDate?: CalendarMinimumDayProps;
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
              click={() =>
                click(
                  mday - data.start,
                  isTileMute({ day: mday - data.start, minDate, data })
                )
              }
              events={events}
              data={{
                tile: mday - data.start,
                muted: isTileMute({ day: mday - data.start, minDate, data }),
              }}
            />
          ) : (
            <Button
              key={mday}
              name="calendar-tile"
              click={() => click(mday - data.start, false)}
            />
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
