import { week, monthDays } from "@nxs-helpers/data";

const CalendarView = () => {
  return (
    <div className="calendar-view">
      <div className="calendar-week flex-g">
        {week.map((w) => (
          <span key={w} className="day">
            {w}
          </span>
        ))}
      </div>
      <div className="flex-w">
        {monthDays.map((md) => (
          <button key={md} className="btn btn-calendar-tile">
            {md}
          </button>
        ))}
      </div>
    </div>
  );
};
export default CalendarView;
