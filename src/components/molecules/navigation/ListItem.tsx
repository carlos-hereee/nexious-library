import { Button, IconButton } from "main";
import type { MenuProp } from "nxs-navigation";

interface ListItemProps {
  theme?: string;
  item?: MenuProp;
  hideIcons?: boolean;
  handleClick?: () => void;
}
const ListItem = ({ theme, item, hideIcons, handleClick }: ListItemProps) => {
  // if hideIcons is true, remove icon from item
  if (!item)
    return (
      <ListItem
        theme={theme}
        item={{ name: "home", label: "Home", value: "/", icon: "home" }}
        handleClick={handleClick}
      />
    );
  if (hideIcons && item) return <ListItem theme={theme} item={{ ...item, icon: "" }} handleClick={handleClick} />;

  // default
  return (
    <li className={theme ? `nav-item ${theme}` : "nav-item"}>
      {item.icon ? (
        <IconButton icon={{ ...item, icon: item.icon }} onClick={handleClick} theme={item.theme} />
      ) : (
        <Button label={item.label} theme={item.theme} onClick={handleClick} />
      )}
    </li>
  );
};
export default ListItem;
