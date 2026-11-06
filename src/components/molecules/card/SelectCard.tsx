// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/select-card/README.md
// Promoted from nexious-client, where three surfaces hand built the same clickable card as a
// link, a button or an inert tile. One component picks the element so no caller can get it wrong.
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { SelectCardProps } from "nxs-card";

/**
 * Component - SelectCard
 *
 * The element follows the props, in this order: `href` with `linkAs` renders the consumer's
 * router link with `to` (an in-app destination, no page reload); `href` alone a plain anchor;
 * `onClick` a button; anything else an inert div with aria-disabled. `disabled` sends every
 * card to that inert branch, because a disabled anchor is still followable and a disabled
 * button drops out of the tab order with no word on why.
 *
 * The library imports no router, which is why the link component arrives as a prop.
 */
const SelectCard: React.FC<SelectCardProps> = (props) => {
  const { title, subtitle, icon, children, onClick, href, linkAs: LinkAs, disabled, selected } = props;
  const { ariaLabel, ariaCurrent, className, classNames } = props;

  const rootClass = [
    classNames?.root ?? "nxs-select-card",
    selected ? classNames?.selected ?? "nxs-select-card-selected" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const shared = { className: rootClass, "aria-label": ariaLabel, "aria-current": ariaCurrent };

  const content = (
    <>
      {icon ? (
        <span className={classNames?.icon ?? "nxs-select-card-icon"} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={classNames?.title ?? "nxs-select-card-title"}>{title}</span>
      {subtitle ? <span className={classNames?.subtitle ?? "nxs-select-card-subtitle"}>{subtitle}</span> : null}
      {children}
    </>
  );

  // Spreading `shared` keeps the three attributes identical on every branch; listing them per
  // element is how one branch ends up without its accessible name.
  /* eslint-disable react/jsx-props-no-spreading */
  if (href && LinkAs && !disabled) {
    return (
      <LinkAs to={safeUrl(href)} {...shared}>
        {content}
      </LinkAs>
    );
  }
  if (href && !disabled) {
    return (
      <a href={safeUrl(href)} {...shared}>
        {content}
      </a>
    );
  }
  if (onClick && !disabled) {
    return (
      <button type="button" onClick={onClick} {...shared}>
        {content}
      </button>
    );
  }
  return (
    <div aria-disabled="true" {...shared}>
      {content}
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

export default SelectCard;
