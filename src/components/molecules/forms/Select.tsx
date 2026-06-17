import { Icon, Label, Option } from "@nxs-atoms";
import { Hero, IconButton } from "@nxs-molecules";
import type { SelectProp } from "nxs-form";

/**
 *
 * @param name the title of the selection tag
 * @param list an array of all the options
 * @param onChange a callback fired when a selection is made
 * @param active the current selection
 * @param placeholder disabled first option shown when nothing is selected
 * @returns
 */
const Select: React.FC<SelectProp> = (props) => {
  const { list, onChange, theme, name, hideLabels, label, error, formMessage, active, clearSelection, isDisabled } =
    props;
  const { placeholder } = props;

  const activeLabel = active || placeholder || "Choose Selection";
  const icon = active ? list && list.filter((l) => l && l.icon && l.icon === active)[0]?.icon : undefined;
  const thumbnail = active ? list && list.filter((l) => l && l.value && l.value === active)[0]?.thumbnail : undefined;

  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <div className={theme ? `select-wrapper ${theme}` : "select-wrapper"}>
        {active && icon ? (
          <Icon icon={icon} name={icon} theme="select-icon" />
        ) : thumbnail ? (
          <Hero hero={{ url: thumbnail, alt: "selection thumbnail" }} theme="thumbnail-select" />
        ) : (
          ""
        )}
        <select
          // id matches the Label's htmlFor={name} so the visible label is properly associated.
          id={name}
          className="select"
          value={activeLabel}
          disabled={isDisabled}
          // When the visible label is hidden the native control still needs a name for SR users.
          aria-label={hideLabels || !label ? name : undefined}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <Option data={{ label: activeLabel, name: activeLabel, value: activeLabel }} isDisabled />
          <Option data={{ label: "", name: "", value: "" }} hideOption />
          {list && list.map((l) => <Option key={l.uid} data={l} />)}
        </select>
        {active && clearSelection && (
          <IconButton
            icon={{ icon: "close" }}
            onClick={() => onChange?.("")}
            theme="btn-icon"
            aria-label="Clear selection"
          />
        )}
      </div>
    </>
  );
};

export default Select;
