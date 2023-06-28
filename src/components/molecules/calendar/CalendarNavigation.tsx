import { months } from "@nxs-helpers/data";
import { Button, Heading, IconNames } from "@nxs-atoms";
import { IconButton } from "@nxs-molecules";

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
  const previous: { label: string; icon: IconNames }[] = [
    { label: "start", icon: "first" },
    { label: "prev", icon: "left" },
  ];
  const next: { label: string; icon: IconNames }[] = [
    { label: "next", icon: "right" },
    { label: "last", icon: "last" },
  ];
  return (
    <div className="calendar-navigation flex-j-between">
      {previous.map((p) => (
        <IconButton
          click={() => click(p.label)}
          icon={{ name: p.label, icon: p.icon }}
        />
      ))}
      <Heading data={`${months[month]} ${year}`} />
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
