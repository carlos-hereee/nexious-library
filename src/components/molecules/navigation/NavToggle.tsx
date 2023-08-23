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
  if (data.alternatives) {
    const idx = data.alternatives?.findIndex((a) => a.uid === active);
    console.log("data", data.alternatives[idx]);
    return (
      <select>
        {data.alternatives?.map((alt) => (
          <option
            key={alt.uid}
            value={alt.name}
            title={alt.name}
            className="nav-btn"
          >
            {alt.label}
          </option>
        ))}
      </select>
    );
  }
};
export default NavToggle;
