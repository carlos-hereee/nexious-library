import { months } from "@nxs-utils/helpers/data";
import { Heading } from "@nxs-atoms";
import { IconButton } from "@nxs-molecules";

type CalendarNavProps = {
  data: { month: number; year: number };
  click: (e: string) => void;
  previous: { label: string; icon: string }[];
  next: { label: string; icon: string }[];
};
/**
 * Component Calendar Navigation
 * @param month number
 * @param day number
 * @param year number
 * @returns
 */
const CalendarNavigation: React.FC<CalendarNavProps> = (props) => {
  const { data, previous, next, click } = props;
  return (
    <div className="calendar-navigation">
      <div className="flex">
        {previous.map((p) => (
          <IconButton
            key={p.label}
            click={() => click(p.label)}
            icon={{ name: p.label, icon: p.icon }}
            theme="btn-small"
          />
        ))}
      </div>
      <Heading data={`${months[data.month]} ${data.year}`} />
      <div className="calendar-navigation-next-buttons flex">
        {next.map((p) => (
          <IconButton
            key={p.label}
            click={() => click(p.label)}
            icon={{ name: p.label, icon: p.icon }}
            theme="btn-small"
          />
        ))}
      </div>
    </div>
  );
};
export default CalendarNavigation;
