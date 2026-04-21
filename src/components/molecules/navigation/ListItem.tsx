import Button from "@nxs-atoms/buttons/Button";
import IconButton from "@nxs-molecules/buttons/IconButton";
import { Icon } from "@nxs-atoms";
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
    const aProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
      href,
      className: "nav-link",
      onClick: handleClick,
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
