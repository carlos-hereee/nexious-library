import { days, monthDays } from "@nxs-helpers/data";

type CalendarViewProps = {
  date: { date: number; day: number; max: number };
};
const CalendarView: React.FC<CalendarViewProps> = ({ date }) => {
  console.log(days[date.day - 1]);
  return (
    <div className="calendar-view">
      <div className="calendar-week flex-g">
        {days.map((w) => (
          <span key={w} className="day">
            {w}
          </span>
        ))}
      </div>
      <div className="flex-w">
        {monthDays.map((md) =>
          md > date.day && date.day < 31 ? (
            <button key={md} className="btn btn-calendar-tile">
              {md - date.day}
            </button>
          ) : (
            <button type="button" className="btn btn-calendar-tile">
              {" "}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default CalendarView;
