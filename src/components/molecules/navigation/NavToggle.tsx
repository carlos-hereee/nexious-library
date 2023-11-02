import { Hero } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import { NavigationToggleProps } from "nxs-navigation";

/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavToggle: React.FC<NavigationToggleProps> = (props) => {
  const { data, onSelect, language } = props;
  const { active, alternatives } = props.data;
  // console.log('data :>> ', data);
  // console.log("active, alternatives :>> ", active);
  const handleSelect = (value: string) => {
    // find selected and update values
    const idx = alternatives.findIndex((alt) => alt.uid === value);
    if (alternatives[idx].locale) {
      data.locale = alternatives[idx].locale;
    }
    data.active = alternatives[idx];
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
        <option value={active.name} title={active.name} disabled>
          {active.label}
        </option>
        <option value="" hidden>
          {active.label}
        </option>
        {alternatives?.map((alt) => (
          <option key={alt.uid} value={alt.uid} title={alt.name}>
            {alt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default NavToggle;
