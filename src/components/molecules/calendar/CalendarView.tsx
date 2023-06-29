import { days, monthWeeks } from "@nxs-helpers/data";

type CalendarViewProps = {
  date: { date: number; day: number; max: number };
  weeks: number | 4 | 5 | 6;
};
const CalendarView: React.FC<CalendarViewProps> = ({ date, weeks }) => {
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
        {monthWeeks[weeks].map((md) =>
          md > date.day && md - date.day <= date.max ? (
            <button key={md} className="btn btn-calendar-tile">
              {md - date.day}
            </button>
          ) : (
            <button key={md} type="button" className="btn btn-calendar-tile">
              {" "}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
