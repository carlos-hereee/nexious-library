import { sundayFirst, monthWeeks } from "@nxs-helpers/data";
import { Button } from "@nxs-atoms";
import { CalendarDayProps, CalendarMinimumDayProps } from "@nxs-helpers/types";
import { CalendarTile } from "@nxs-molecules";

type CalendarViewProps = {
  data: CalendarDayProps;
  click: () => void;
  minDate?: CalendarMinimumDayProps;
  events?: any[];
};
const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate } = props;
  const isTileMute = (e: number) => {
    const minYear = minDate && minDate?.year > data.year;
    const minMonth = minDate && minDate?.month > data.month;
    const currentMonth = minDate && minDate.month === data.month;
    const currentYear = minDate && minDate.year === data.year;
    const minDay = minDate && minDate.day > e;

    if (minYear) return true;
    else if (currentYear && minMonth) return true;
    else if (currentMonth && minDay) return true;
    return false;
  };
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
              click={click}
              events={events}
              data={{
                tile: mday - data.start,
                muted: isTileMute(mday - data.start),
              }}
            />
          ) : (
            <Button key={mday} name="calendar-tile" click={click} />
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
