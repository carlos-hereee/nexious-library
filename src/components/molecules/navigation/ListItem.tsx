import Button from "@nxs-atoms/buttons/Button";
import IconButton from "@nxs-molecules/buttons/IconButton";
import { Icon } from "@nxs-atoms";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import type { MenuProp } from "nxs-navigation";

interface ListItemProps {
  theme?: string;
  item?: MenuProp;
  hideIcons?: boolean;
  activePath?: string;
  handleClick?: () => void;
}

/**
 * ListItem renders a single item in a navigation list.
 *
 * UX rules:
 *  - If the item has an href (or legacy link), render a real <a> anchor so
 *    it behaves like a navigation link (right click, middle click, SEO,
 *    screen reader semantics).
 *  - If the item has no href, it is an action and renders as a <button>.
 *  - When the item's href matches activePath, aria-current="page" is set and
 *    the .is-active class is applied so CSS can style it.
 *
 * The old behavior of wrapping every item in .btn-main is removed so nav
 * links no longer look like rectangular buttons.
 */
const ListItem = ({ theme, item, hideIcons, activePath, handleClick }: ListItemProps) => {
  if (!item) {
    return (
      <ListItem
        theme={theme}
        item={{ name: "home", label: "Home", value: "/", icon: "home", href: "/" }}
        activePath={activePath}
        handleClick={handleClick}
      />
    );
  }
  if (hideIcons && item) {
    return <ListItem theme={theme} item={{ ...item, icon: "" }} activePath={activePath} handleClick={handleClick} />;
  }

  const href = item.href || item.link;
  const isActive = !!href && !!activePath && activePath === href;
  const liClass = ["nav-item", theme || "", isActive ? "is-active" : ""].filter(Boolean).join(" ");

  // Anchor path: when href exists, render a real link.
  if (href) {
    // Intercept plain left-clicks so the consumer can route client-side instead of the
    // browser doing a full page reload (the bug that made every nav click reload the whole
    // app and wipe its caches). Modifier and middle clicks, plus external links, fall
    // through to native behavior so "open in new tab" and external navigation still work.
    const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || item.external) return;
      e.preventDefault();
      handleClick?.();
    };
    const aProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
      // Guard against a javascript:/data: scheme smuggled in via menu data.
      href: safeUrl(href),
      className: "nav-link",
      onClick: onAnchorClick,
    };
    if (isActive) aProps["aria-current"] = "page";
    if (item.external) {
      aProps.target = "_blank";
      aProps.rel = "noopener noreferrer";
    }
    return (
      <li className={liClass}>
        <a {...aProps}>
          {item.icon && <Icon icon={item.icon} name={item.name} theme="nav-icon" />}
          <span className="nav-label">{item.label || item.name}</span>
        </a>
      </li>
    );
  }

  // Action path: no href, render as a button.
  return (
    <li className={liClass}>
      {item.icon ? (
        <IconButton icon={{ ...item, icon: item.icon }} onClick={handleClick} theme={item.theme || "nav-action"} />
      ) : (
        <Button label={item.label} theme={item.theme || "nav-action"} onClick={handleClick} />
      )}
    </li>
  );
};

export default ListItem;
