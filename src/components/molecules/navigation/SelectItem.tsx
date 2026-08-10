import Select from "@nxs-molecules/forms/Select";
import type { ThemeList } from "nxs-navigation";

interface SelectItemProps {
  list: ThemeList[];
  active?: string;
  className?: string;
  btnTheme?: string;
  name: string;
  handleChange?: (e: string) => void;
}
const SelectItem = ({ list, btnTheme, className, name, handleChange, active }: SelectItemProps) => (
  <li className={btnTheme || "nav-btn"}>
    <Select list={list} name={name} className={className} onChange={handleChange} active={active} />
  </li>
);
export default SelectItem;
