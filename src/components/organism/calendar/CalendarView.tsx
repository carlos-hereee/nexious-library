import { sundayFirst, monthWeeks } from "@nxs-utils/calendar/weeks";
import { CalendarTile } from "@nxs-molecules";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";
import { resolveCalendarLabels } from "@nxs-utils/calendar/calendarLabels";
import type { CalendarViewProps } from "nxs-calendar";
import { isTileMatch, isTileMute } from "@nxs-utils/calendar/findMatch";

const WEEKDAY_SHORT_LENGTH = 3;

const CalendarView: React.FC<CalendarViewProps> = ({ data, click, events, minDate, today, labels: labelsProp }) => {
  const labels = resolveCalendarLabels(labelsProp);
  return (
    <div className="container">
      <div className="calendar-week">
        {/* Three letters on screen, so no column truncates to "Wedn..." on a narrow calendar, and
            the whole name for a screen reader. */}
        {sundayFirst.map((w) => (
          <span key={w} className="day">
            <span aria-hidden="true">{w.slice(0, WEEKDAY_SHORT_LENGTH)}</span>
            <span className="sr-only">{w}</span>
          </span>
        ))}
      </div>
      <div className="calendar-view-month">
        {monthWeeks[data.weeks].map((d) => {
          const day = d - data.start;
          const date = calendarValues(new Date(data.year, data.month, day));
          if (d > data.start && d <= data.maxDays + data.start) {
            const dayEvents = events?.filter((e) => isTileMatch({ day1: e, day, day2: data }))[0] || {};
            return (
              <CalendarTile
                key={d}
                click={() => click(date)}
                events={dayEvents}
                title={dayEvents.date ? labels.tileEvents(dayEvents.date, dayEvents.ping ?? 0) : labels.tileNoEvents}
                data={{
                  tile: day,
                  isToday: today ? isTileMatch({ day1: today, day, day2: data }) : false,
                  isMuted: isTileMute({ day, minDate, data }),
                  isSelected: isTileMatch({ day1: data, day, day2: data }),
                }}
              />
            );
          }
          // A padding cell before the 1st or after the last day only holds the grid's shape. It was
          // a childless button, which a screen reader announced as an unnamed control (axe
          // button-name) and which a tab stop landed on; an empty hidden span keeps the slot.
          return <span key={d} className="btn-calendar-tile btn-calendar-tile--padding" aria-hidden="true" />;
        })}
      </div>
    </div>
  );
};
export default CalendarView;
