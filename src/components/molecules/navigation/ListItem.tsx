import { Button, IconButton } from "main";
import type { MenuProp } from "nxs-navigation";

interface ListItemProps {
  theme: string;
  item: MenuProp;
  handleClick: () => void;
}
const ListItem = ({ theme, item, handleClick }: ListItemProps) => (
  <li className={theme ? `nav-item ${theme}` : "nav-item"}>
    {item.icon ? (
      <IconButton icon={item} onClick={handleClick} theme={item.theme} />
    ) : (
      <Button label={item.label} theme={item.theme} onClick={handleClick} />
    )}
  </li>
);
export default ListItem;
