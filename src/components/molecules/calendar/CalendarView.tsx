import { sundayFirst, monthWeeks } from "@nxs-helpers/data";
import { Button } from "@nxs-atoms";
import { CalendarDayProps } from "@nxs-helpers/types";
import { CalendarTile } from "@nxs-molecules";
import { isTileMute } from "@nxs-utils/calendar/isTileMute";
import { isTileMatch } from "@nxs-utils/calendar/calendarValues";

type CalendarViewProps = {
  data: CalendarDayProps;
  selectedDay: CalendarDayProps;
  click: (e: CalendarDayProps) => void;
  today?: CalendarDayProps;
  minDate?: CalendarDayProps;
  events?: any[];
};

const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { data, click, events, minDate, today, selectedDay } = props;

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
        {monthWeeks[data.weeks].map((mday) => {
          const tileDay = mday - data.start;
          return mday > data.start && mday <= data.maxDays + data.start ? (
            <CalendarTile
              key={mday}
              click={() => click({ ...data, date: tileDay })}
              events={events?.filter((e) => isTileMatch(e, tileDay, data))[0]}
              data={{
                tile: tileDay,
                isToday: isTileMatch(data, tileDay, today ? today : data),
                isMuted: isTileMute({ day: tileDay, minDate, data }),
                isSelected: isTileMatch(selectedDay, tileDay, data),
              }}
            />
          ) : (
            <Button
              key={mday}
              name="calendar-tile btn-calendar-tile--muted"
              click={() => click({ ...data, date: tileDay })}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CalendarView;
