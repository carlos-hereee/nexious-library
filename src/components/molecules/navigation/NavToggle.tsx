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
  const { data, onSelect, theme } = props;
  const { active, alternatives } = props.data;

  const handleSelect = (value: string) => {
    // find selected and update values
    const idx = alternatives.findIndex((alt) => alt.name === value || alt.value === value);
    data.active = alternatives[idx];
    onSelect(data);
  };
  return (
    <div className="nav-toggle">
      {active?.icon ? (
        <Icon icon={active.icon} />
      ) : (
        active?.url && <Hero hero={active} theme="hero-icon" />
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
