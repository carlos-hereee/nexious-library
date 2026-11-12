import { IconButton } from "@nxs-molecules";
import type { WeekNavigationProps } from "nxs-calendar";

/**
 * Previous / range heading / next for the week and day views.
 *
 * A separate organism rather than a mode on CalendarNavigation: that one takes `{ month, year }`
 * and prints `months[month] year`, and teaching it to print "Sep 6 to 12, 2026" or a full weekday
 * date would mean touching the month path this feature promises to leave byte for byte alone. It
 * reuses the `.calendar-navigation` layout so the two rows sit identically under the refresh
 * button.
 *
 * The heading is a bare h2 rather than the Heading atom because the time grid names itself with
 * aria-labelledby against this element, and Heading has no id prop; adding one is a change to
 * the typography types, outside this lane.
 */
const WeekNavigation: React.FC<WeekNavigationProps> = (props) => {
  const { heading, headingId, onPrevious, onNext, previousLabel, nextLabel } = props;
  return (
    <div className="calendar-navigation">
      <div className="flex">
        <IconButton
          onClick={onPrevious}
          icon={{ icon: "left" }}
          title={previousLabel}
          aria-label={previousLabel}
          className="btn-small"
        />
      </div>
      <h2 className="heading" id={headingId}>
        {heading}
      </h2>
      <div className="calendar-navigation-next-buttons flex">
        <IconButton onClick={onNext} icon={{ icon: "right" }} title={nextLabel} aria-label={nextLabel} className="btn-small" />
      </div>
    </div>
  );
};
export default WeekNavigation;
