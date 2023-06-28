import { months } from "@nxs-helpers/data";
import { Heading } from "main";

type CalendarNavProps = {
  month: number;
  year: number;
  click: (e: string) => void;
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
        onClick={() => click("start")}
      >
        {"<<"}
      </button>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={() => click("prev")}
      >
        {"<"}
      </button>
      {month && <Heading data={`${months[month]} ${year}`} />}
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={() => click("next")}
      >
        {">"}
      </button>
      <button
        type="button"
        className="btn btn-calendar btn-calendar-navigation"
        onClick={() => click("last")}
      >
        {">>"}
      </button>
    </div>
  );
};
export default CalendarNavigation;
