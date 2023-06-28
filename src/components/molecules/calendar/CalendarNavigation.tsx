import { months } from "@nxs-helpers/data";
import { Heading } from "main";

type CalendarNavProps = {
  month: number;
  year: number;
  click: () => void;
};
/**
 * Component Calendar Navigation
 * @param month number
 * @param day number
 * @param year number
 * @returns
 */
const CalendarNavigation: React.FC<CalendarNavProps> = ({
  month,
  year,
  click,
}) => {
  return (
    <div className="calendar-navigation flex-g">
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={click}
      >
        {"<<"}
      </button>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={click}
      >
        {"<"}
      </button>
      {month && <Heading data={`${months[month]} ${year}`} />}
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={click}
      >
        {">"}
      </button>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={click}
      >
        {">>"}
      </button>
    </div>
  );
};
export default CalendarNavigation;
