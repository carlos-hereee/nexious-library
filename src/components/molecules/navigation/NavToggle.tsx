import { MenuItemProp, MenuProp } from "@nxs-utils/helpers/types";
import { Hero } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";

export type NavButtonProps = {
  data: MenuProp;
  onSelect: (e: MenuProp) => void;
  language?: MenuItemProp;
};
/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavToggle: React.FC<NavButtonProps> = (props) => {
  const { data, onSelect, language } = props;

  const handleSelect = (value: string) => {
    // find selected and update values
    const idx = data.alternatives.findIndex((alt) => alt.uid === value);
    if (data.alternatives[idx].locale) {
      data.locale = data.alternatives[idx].locale;
    }
    data.active = data.alternatives[idx];
    onSelect(data);
  };
  return (
    <div className="select-wrapper">
      {language && language.icon ? (
        <Icon icon={language.icon} />
      ) : (
        language && <Hero hero={language} />
      )}
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
