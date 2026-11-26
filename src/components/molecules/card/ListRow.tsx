// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/list-row/README.md
// One row of a list, ported from nexious-client's cu-list-row (primitives.css, 2026-11 item 337).
// It lays out slots and owns no data or behavior: a navigable row is a row holding a real link or
// button with the nxs-list-row-link class, never a row that is itself a button, because a button
// cannot contain the actions slot's own buttons.
import { HEADING_TAGS } from "@nxs-utils/helpers/headingTag";
import type { ListRowProps } from "nxs-card";

/**
 * Component: ListRow
 *
 * Renders the lead, then a body of the title, the subtitle and the children, then the meta and the
 * actions, each left out when it is not given. The title is a span unless `headingLevel` asks for
 * a heading, because most rows sit under a list's own heading and a heading per row would flood a
 * screen reader's outline.
 */
const ListRow: React.FC<ListRowProps> = (props) => {
  const { lead, isLeadDecorative = true, title, subtitle, meta, actions, headingLevel } = props;
  const { isDense, isSelected, as: Root = "div", className, children } = props;
  const rootClass = [
    "nxs-list-row",
    isDense ? "nxs-list-row-dense" : "",
    isSelected ? "nxs-list-row-selected" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const TitleTag = headingLevel ? HEADING_TAGS[headingLevel] : "span";
  const hasBody = Boolean(title) || Boolean(subtitle) || Boolean(children);

  return (
    <Root className={rootClass}>
      {lead ? (
        <span className="nxs-list-row-lead" aria-hidden={isLeadDecorative ? "true" : undefined}>
          {lead}
        </span>
      ) : null}
      {hasBody ? (
        <div className="nxs-list-row-body">
          {title ? <TitleTag className="nxs-list-row-title">{title}</TitleTag> : null}
          {subtitle ? <span className="nxs-list-row-subtitle">{subtitle}</span> : null}
          {children}
        </div>
      ) : null}
      {meta ? <div className="nxs-list-row-meta">{meta}</div> : null}
      {actions ? <div className="nxs-list-row-actions">{actions}</div> : null}
    </Root>
  );
};

export default ListRow;
