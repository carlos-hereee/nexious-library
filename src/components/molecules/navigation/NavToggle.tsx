import { Icon } from "@nxs-atoms/index";
import { MenuItemProp } from "@nxs-utils/helpers/types";

export type NavButtonProps = {
  data: MenuItemProp;
  active: string;
  click: (e: MenuItemProp) => void;
};
/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavToggle: React.FC<NavButtonProps> = (props) => {
  const { data, click, active } = props;
  return (
    <div className="select-wrapper">
      <Icon icon={data.active.icon} />
      <select>
        {data.alternatives?.map((alt) => (
          <option key={alt.uid} value={alt.name} title={alt.name}>
            <span>{alt.label}</span>
          </option>
        ))}
      </select>
    </div>
  );
};
export default NavToggle;
