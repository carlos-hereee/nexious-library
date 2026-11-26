// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/event-card/README.md
// One event as a card (on Card) or a row (on ListRow), 2026-11 item 337. Ported from
// nexious-client's EventCardContent (plugin-modules/events) and the For You feed's EventCard, which
// had drifted (dates in different time zones, a description on one only). It takes an already
// shaped view model and a date formatter, so it knows nothing about bot events, feeds or a locale.
import ListRow from "@nxs-molecules/card/ListRow";
import Card from "@nxs-organism/card/Card";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { EventCardDatePart, EventCardProps } from "nxs-card";

const BARE_DAY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * A wire value as a Date. A bare YYYY-MM-DD is read as LOCAL midnight, because `new Date("2026-11-12")`
 * alone is UTC and shows the 11th anywhere west of Greenwich (the bug the client's TaskCard notes).
 * Returns null for anything that does not parse, so the caller can show the raw text instead of
 * "Invalid Date".
 */
const toDate = (value: string | Date): Date | null => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const parsed = BARE_DAY.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const pad = (part: number) => String(part).padStart(2, "0");

/** The machine readable value: the local day for an all day event, the instant otherwise. */
const machineValue = (date: Date, isAllDay: boolean): string =>
  isAllDay ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : date.toISOString();

/**
 * Component: EventCard
 *
 * Renders the title (a link when `event.href` is set), the when line of one or two `time`
 * elements, the badges, the location and the children. `density="card"` lays them out on Card
 * (the when line as its subtitle, `actions` as its footer); `density="row"` on ListRow (badges as
 * the meta, `actions` in the actions slot). An event with no end shows its start alone.
 */
const EventCard: React.FC<EventCardProps> = (props) => {
  const { event, formatDate, density = "card", headingLevel, rangeSeparator, allDayLabel, locationLabel } = props;
  const { linkComponent: LinkComponent, actions, lead, as, className, children } = props;
  const isAllDay = Boolean(event.isAllDay);
  const isRow = density === "row";
  const linkClass = isRow ? "nxs-list-row-link" : "nxs-card-link";

  const renderDate = (value: string | Date, part: EventCardDatePart) => {
    const date = toDate(value);
    if (!date) return <span className={`nxs-event-card-${part}`}>{String(value)}</span>;
    return (
      <time className={`nxs-event-card-${part}`} dateTime={machineValue(date, isAllDay)}>
        {formatDate(date, part, isAllDay)}
      </time>
    );
  };

  const when = (
    <span className="nxs-event-card-when">
      {renderDate(event.start, "start")}
      {event.end ? (
        <>
          <span className="nxs-event-card-separator">{rangeSeparator ?? <span aria-hidden="true">→</span>}</span>
          {renderDate(event.end, "end")}
        </>
      ) : null}
    </span>
  );

  const href = event.href ? safeUrl(event.href) : "";
  let { title } = event;
  if (href && LinkComponent) {
    title = (
      <LinkComponent to={href} className={linkClass}>
        {event.title}
      </LinkComponent>
    );
  } else if (href) {
    title = (
      <a href={href} className={linkClass}>
        {event.title}
      </a>
    );
  }

  const hasBadges = Boolean(event.badges) || (isAllDay && Boolean(allDayLabel));
  const badges = hasBadges ? (
    <span className="nxs-event-card-badges">
      {isAllDay && allDayLabel ? <span className="nxs-event-card-all-day">{allDayLabel}</span> : null}
      {event.badges}
    </span>
  ) : null;

  const location = event.location ? (
    <p className="nxs-event-card-location">
      {locationLabel ? <span className="sr-only">{`${locationLabel}: `}</span> : null}
      {event.location}
    </p>
  ) : null;

  if (isRow) {
    const rowClass = ["nxs-event-card", "nxs-event-card-row", className ?? ""].filter(Boolean).join(" ");
    return (
      <ListRow
        as={as === "li" ? "li" : "div"}
        className={rowClass}
        lead={lead}
        title={title}
        subtitle={when}
        meta={badges}
        actions={actions}
        headingLevel={headingLevel}
      >
        {location}
        {children}
      </ListRow>
    );
  }

  const cardClass = ["nxs-event-card", className ?? ""].filter(Boolean).join(" ");
  return (
    <Card
      as={as ?? "article"}
      className={cardClass}
      title={title}
      subtitle={when}
      headingLevel={headingLevel}
      footer={actions}
    >
      {badges || location || children ? (
        <>
          {badges}
          {location}
          {children}
        </>
      ) : null}
    </Card>
  );
};

export default EventCard;
