import { Icon } from "@nxs-atoms/index";
import { MenuItemProp } from "@nxs-utils/helpers/types";

export type NavButtonProps = {
  data: MenuItemProp;
  onSelect: (e: MenuItemProp) => void;
};
/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavToggle: React.FC<NavButtonProps> = (props) => {
  const { data, onSelect } = props;
  const handleSelect = (value: string) => {
    const idx = data.alternatives.findIndex((alt) => alt.uid === value);
    if (data.alternatives[idx].locale) {
      data.locale = data.alternatives[idx].locale;
    }
    data.active = data.alternatives[idx];
    onSelect(data);
  };
  return (
    <div className="select-wrapper">
      <Icon icon={data.active.icon} />
      <select onChange={(e) => handleSelect(e.target.value)}>
        {data.alternatives?.map((alt) => (
          <option key={alt.uid} value={alt.uid} title={alt.name}>
            {alt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default NavToggle;
