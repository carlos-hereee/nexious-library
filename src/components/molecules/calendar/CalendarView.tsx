import { sundayFirst, monthWeeks } from "@nxs-helpers/data";
import { Button } from "@nxs-atoms";
import { CalendarDayProps } from "@nxs-helpers/types";
import { CalendarTile } from "@nxs-molecules";
import { isTileMute } from "@nxs-utils/isTileMute";

type CalendarViewProps = {
  data: CalendarDayProps;
  click: (e: number) => void;
  today?: CalendarDayProps;
  minDate?: CalendarDayProps;
  events?: any[];
};
const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate, today } = props;
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
              events={events?.filter((e) => e.date === mday - data.start)[0]}
              data={{
                tile: mday - data.start,
                isToday: mday - data.start === today?.date,
                isMuted: isTileMute({ day: mday - data.start, minDate, data }),
              }}
            />
          ) : (
            <Button
              key={mday}
              name="calendar-tile btn-calendar-tile--muted"
              click={() => click(mday - data.start)}
            />
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
