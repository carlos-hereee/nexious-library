import { months } from "@nxs-helpers/data";
import { Heading, IconNames } from "@nxs-atoms";
import { IconButton } from "@nxs-molecules";

type CalendarNavProps = {
  date: { month: number; year: number };
  click: (e: string) => void;
  previous: { label: string; icon: IconNames }[];
  next: { label: string; icon: IconNames }[];
};
/**
 * Component Calendar Navigation
 * @param month number
 * @param day number
 * @param year number
 * @returns
 */
const CalendarNavigation: React.FC<CalendarNavProps> = ({
  date,
  previous,
  next,
  click,
}) => {
  return (
    <div className="calendar-navigation flex-j-between">
      <div className="flex-d-row">
        {previous.map((p) => (
          <IconButton
            click={() => click(p.label)}
            icon={{ name: p.label, icon: p.icon }}
          />
        ))}
      </div>
      <div className="heading-container">
        <Heading data={`${months[date.month]} ${date.year}`} />
      </div>
      <div className="calendar-navigation-next-buttons flex-d-row">
        {next.map((p) => (
          <IconButton
            click={() => click(p.label)}
            icon={{ name: p.label, icon: p.icon }}
          />
        ))}
      </div>
    </div>
  );
};
export default CalendarNavigation;
