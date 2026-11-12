import { months } from "@nxs-utils/calendar/weeks";
import { Heading } from "@nxs-atoms";
import { IconButton } from "@nxs-molecules";
import type { CalendarNavProps } from "nxs-calendar";

/**
 * Component Calendar Navigation
 * @param month number
 * @param day number
 * @param year number
 * @returns
 */
const CalendarNavigation: React.FC<CalendarNavProps> = (props) => {
  const { date, previous, next, click, headingLevel, buttonNames } = props;
  // An icon only button needs a real name; the label ("prev") is the old fallback.
  const nameOf = (label: string): string => buttonNames?.[label] ?? label;
  return (
    <div className="calendar-navigation">
      <div className="flex">
        {previous.map((p) => (
          <IconButton
            key={p.label}
            onClick={() => click(p.label)}
            icon={{ name: p.label, icon: p.icon }}
            title={nameOf(p.label)}
            aria-label={nameOf(p.label)}
            className="btn-small"
          />
        ))}
      </div>
      <Heading data={`${months[date.month]} ${date.year}`} scale={headingLevel} />
      <div className="calendar-navigation-next-buttons flex">
        {next.map((p) => (
          <IconButton
            key={p.label}
            onClick={() => click(p.label)}
            icon={{ name: p.label, icon: p.icon }}
            title={nameOf(p.label)}
            aria-label={nameOf(p.label)}
            className="btn-small"
          />
        ))}
      </div>
    </div>
  );
};
export default CalendarNavigation;
