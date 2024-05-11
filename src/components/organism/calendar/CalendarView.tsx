import { sundayFirst, monthWeeks } from "@nxs-utils/calendar/weeks";
import { Button } from "@nxs-atoms";
import { CalendarTile } from "@nxs-molecules";
import { isTileMute } from "@nxs-utils/calendar/isTileMute";
import { isTileMatch } from "@nxs-utils/calendar/isTileMatch";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import type { CalendarViewProps } from "nxs-calendar";

const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate, today } = props;
  return (
    <div className="container">
      <div className="calendar-week">
        {sundayFirst.map((w) => (
          <span key={w} className="day text-overflow">
            {w}
          </span>
        ))}
      </div>
      <div className="calendar-view-month">
        {monthWeeks[data.weeks].map((d) => {
          const day = d - data.start;
          const date = calendarValues(new Date(data.year, data.month, day));
          return d > data.start && d <= data.maxDays + data.start ? (
            <CalendarTile
              key={d}
              click={() => click(date)}
              events={events?.filter((e) => isTileMatch({ day1: e, day, day2: data }))[0] || {}}
              data={{
                tile: day,
                isToday: isTileMatch({ day1: today, day, day2: data }),
                isMuted: isTileMute({ day, minDate, data }),
                isSelected: isTileMatch({ day1: data, day, day2: data }),
              }}
            />
          ) : (
            <Button
              key={d}
              theme="btn-calendar-tile btn-calendar-tile--muted"
              onClick={() => click({ ...data, day })}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CalendarView;
