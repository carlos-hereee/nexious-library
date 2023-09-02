import { sundayFirst, monthWeeks } from "@nxs-utils/helpers/data";
import { Button } from "@nxs-atoms";
import { CalendarDayProps } from "@nxs-utils/helpers/types";
import { CalendarTile } from "@nxs-molecules";
import { isTileMute } from "@nxs-utils/calendar/isTileMute";
import { isTileMatch } from "@nxs-utils/calendar/isTileMatch";

type CalendarViewProps = {
  data: CalendarDayProps;
  click: (e: CalendarDayProps) => void;
  today: CalendarDayProps;
  minDate?: CalendarDayProps;
  events?: any[];
};

const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate, today } = props;

  return (
    <div>
      <div className="calendar-week flex-g">
        {sundayFirst.map((w) => (
          <span key={w} className="day text-overflow">
            {w}
          </span>
        ))}
      </div>
      <div className="calendar-view-month">
        {monthWeeks[data.weeks].map((d) => {
          const date = d - data.start;
          return d > data.start && d <= data.maxDays + data.start ? (
            <CalendarTile
              key={d}
              click={() => click({ ...data, date })}
              events={
                events?.filter((e) =>
                  isTileMatch({ day1: e, date, day2: data })
                )[0]
              }
              data={{
                tile: date,
                isToday: isTileMatch({ day1: today, date, day2: data }),
                isMuted: isTileMute({ day: date, minDate, data }),
                isSelected: isTileMatch({ day1: data, date, day2: data }),
              }}
            />
          ) : (
            <Button
              key={d}
              name="calendar-tile btn-calendar-tile--muted"
              click={() => click({ ...data, date: date })}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CalendarView;
