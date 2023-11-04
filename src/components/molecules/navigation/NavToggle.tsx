import { Hero, Select } from "@nxs-molecules";
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
  const { data, onSelect, language, theme } = props;
  const { active, alternatives } = props.data;

  const handleSelect = (value: string) => {
    // find selected and update values
    const idx = alternatives.findIndex((alt) => alt.name === value);
    if (alternatives[idx]?.locale) {
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
      <Select
        list={alternatives}
        name={active?.name || ""}
        theme={theme}
        onChange={(value) => handleSelect(value)}
        active={active?.label || ""}
      />
    </div>
  );
};
export default NavToggle;
