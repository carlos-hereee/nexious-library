import { months } from "@nxs-helpers/data";

type CalendarNavProps = {
  month?: number;
  year?: number;
};
/**
 * Component Calendar Navigation
 * @param month number
 * @param day number
 * @param year number
 * @returns
 */
const CalendarNavigation: React.FC<CalendarNavProps> = ({ month, year }) => {
  return (
    <div className="calendar-navigation flex-g">
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
      >
        {"<<"}
      </button>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
      >
        {"<"}
      </button>
      <h2>
        {month && months[month]} {year}
      </h2>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
      >
        {">"}
      </button>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
      >
        {">>"}
      </button>
    </div>
  );
};
export default CalendarNavigation;
