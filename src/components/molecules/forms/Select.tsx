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
  const { list, onChange, className, name, hideLabels, label, error, formMessage, active, clearSelection, isDisabled } =
    props;
  const { placeholder, inShell } = props;

  const activeLabel = active || placeholder || "Choose Selection";
  const icon = active ? list && list.filter((l) => l && l.icon && l.icon === active)[0]?.icon : undefined;
  const thumbnail = active ? list && list.filter((l) => l && l.value && l.value === active)[0]?.thumbnail : undefined;

  return (
    <>
      {/* Select is the one form control exported from the package root, so it has to stand alone
          as well as sit inside a Field. Standalone it owns its label, its error node and its
          fallback aria-label. Inside a Field it is passed inShell and gives up all three, because
          the FieldShell already renders a (possibly visually hidden) <label htmlFor> and one
          `${name}-error` node: a second error node would make aria-describedby ambiguous, and a
          leftover aria-label would beat the real label and announce the raw field name instead.
          The standalone bare-error branch must survive, since the <select> advertises the error
          id whether or not the label is visible. */}
      {!inShell && !hideLabels && label ? (
        <Label name={name} label={label} error={error} message={formMessage} />
      ) : (
        !inShell &&
        error && (
          <span className="required" id={`${name}-error`} role="alert">
            {error}
          </span>
        )
      )}
      <div className={className ? `select-wrapper ${className}` : "select-wrapper"}>
        {active && icon ? (
          <Icon icon={icon} name={icon} className="select-icon" />
        ) : thumbnail ? (
          <Hero hero={{ url: thumbnail, alt: "selection thumbnail" }} className="thumbnail-select" />
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
          aria-label={!inShell && (hideLabels || !label) ? name : undefined}
          // Mirror Input/InputCheckbox/TextArea so a select with a validation error is
          // announced as invalid and points at the Label's `${name}-error` node. Select
          // was the one form control missing this wiring.
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
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
            className="btn-icon"
            aria-label="Clear selection"
          />
        )}
      </div>
    </>
  );
};

export default Select;
