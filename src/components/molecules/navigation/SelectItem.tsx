import { Select } from "main";
import type { ThemeList } from "nxs-navigation";

interface SelectItemProps {
  list: ThemeList[];
  active?: string;
  theme?: string;
  btnTheme?: string;
  name: string;
  handleChange?: (e: string) => void;
}
const SelectItem = ({ list, btnTheme, theme, name, handleChange, active }: SelectItemProps) => (
  <li className={btnTheme || "nav-btn"}>
    <Select list={list} name={name} theme={theme} onChange={handleChange} active={active} />
  </li>
);
export default SelectItem;
