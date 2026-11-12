// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/activity-list/README.md
// The recent activity rows, ported from nexious-client's features/dashboard/components/
// ActivityList.tsx (2026-11 item 337, Phase 5). The client printed the day with its i18n locale and
// linked through the router; here the caller's formatTimestamp prints the day and its
// linkComponent (receiving `to`) carries the link, so the library holds no locale and no router.
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { ActivityListItem, ActivityListProps } from "nxs-card";

const TITLE_CLASS = "nxs-activity-list-title";

/** The row's title: the caller's router link, a plain anchor, or plain text without an href. */
const ActivityTitle = ({ item, linkComponent: LinkComponent }: { item: ActivityListItem; linkComponent?: React.ElementType }) => {
  if (!item.href) return <p className={TITLE_CLASS}>{item.title}</p>;
  const href = safeUrl(item.href);
  if (LinkComponent) {
    return (
      <LinkComponent to={href} className={TITLE_CLASS}>
        {item.title}
      </LinkComponent>
    );
  }
  return (
    <a href={href} className={TITLE_CLASS}>
      {item.title}
    </a>
  );
};

/**
 * Component: ActivityList
 *
 * One row per item: a decorative glyph, the title (a link when the item has an href), the
 * description and the printed timestamp. `limit` trims the list without the caller slicing it.
 */
const ActivityList = ({ items, formatTimestamp, limit, linkComponent, ariaLabel, className }: ActivityListProps) => {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  return (
    <ul className={className ? `nxs-activity-list ${className}` : "nxs-activity-list"} aria-label={ariaLabel}>
      {visible.map((item) => {
        const when = item.timestamp ? formatTimestamp(item.timestamp) : "";
        return (
          <li className="nxs-activity-list-row" key={item.id} data-activity-type={item.type}>
            {item.icon ? (
              <span className="nxs-activity-list-icon" aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
            <div className="nxs-activity-list-text">
              <ActivityTitle item={item} linkComponent={linkComponent} />
              {item.description ? <p className="nxs-activity-list-meta">{item.description}</p> : null}
            </div>
            {when ? <span className="nxs-activity-list-when">{when}</span> : null}
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityList;
