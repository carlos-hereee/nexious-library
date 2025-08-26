import { Hero, Select } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import type { NavigationToggleProps } from "nxs-navigation";

/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavToggle: React.FC<NavigationToggleProps> = (props) => {
  const { data, onSelect, theme } = props;
  const { active, alternatives } = data;

  const handleSelect = (value: string) => {
    if (!alternatives || alternatives.length === 0) return;
    // find selected and update values
    const idx = alternatives.findIndex((alt) => alt.name === value || alt.value === value);
    data.active = alternatives[idx];
    onSelect(data);
  };
  if (!active || !alternatives || alternatives.length === 0) {
    return <p className="error-message">Double check active and alternatives props</p>;
  }
  return (
    <div className="nav-toggle">
      {active.icon ? <Icon icon={active.icon} /> : active.url && <Hero hero={active} theme="hero-icon" />}
      <Select
        list={alternatives}
        name={active?.name || active.value}
        theme={theme}
        onChange={(value) => handleSelect(value)}
        active={active?.label || ""}
      />
    </div>
  );
};
export default NavToggle;
