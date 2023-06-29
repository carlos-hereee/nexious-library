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
      {previous.map((p) => (
        <IconButton
          click={() => click(p.label)}
          icon={{ name: p.label, icon: p.icon }}
        />
      ))}
      <Heading data={`${months[date.month]} ${date.year}`} />
      {next.map((p) => (
        <IconButton
          click={() => click(p.label)}
          icon={{ name: p.label, icon: p.icon }}
        />
      ))}
    </div>
  );
};
export default CalendarNavigation;
