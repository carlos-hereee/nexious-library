import { Icon, Label, Option } from "@nxs-atoms";
import { Hero, IconButton } from "@nxs-molecules";
import type { OptionProps, SelectProp } from "nxs-form";
import { useFieldDomId } from "@nxs-utils/hooks/useFieldDomId";

// The 4.x defaults, kept so a caller that passes no copy renders what it always did. Both are
// English, which is why placeholder and clearLabel exist: a localized caller passes its own.
const DEFAULT_PLACEHOLDER = "Choose Selection";
const DEFAULT_CLEAR_LABEL = "Clear selection";

/** Every option the control offers, the flat list first and then each group's options. */
const allOptions = (props: SelectProp): OptionProps[] => [
  ...(props.list ?? []),
  ...(props.groups ?? []).flatMap((group) => group.options),
];

/** The icon and thumbnail of the option `value` selects. */
const selectedArt = (props: SelectProp) => {
  const selected = allOptions(props).find((option) => option.value === props.value);
  return { icon: selected?.icon, thumbnail: selected?.thumbnail };
};

/** The 4.x lookups, kept as they were: `active` matched against an option's icon for the icon
 * and against its value for the thumbnail. */
const activeArt = ({ active, list }: SelectProp) => {
  if (!active || !list) return { icon: undefined, thumbnail: undefined };
  return {
    icon: list.filter((l) => l && l.icon && l.icon === active)[0]?.icon,
    thumbnail: list.filter((l) => l && l.value && l.value === active)[0]?.thumbnail,
  };
};

/**
 * Component: Select
 *
 * A styled native select. Two ways to drive it: `value` selects an option by its value (the
 * 2026-11 item 337 path), and with no `value` the 4.x `active` path renders the displayed text in
 * a disabled first option, unchanged. `groups` adds optgroups after `list`. The wrapper renders
 * `nxs-select` beside `select-wrapper`, and the control `nxs-select-control` beside `select`, so
 * a consumer styling the 4.x classes keeps matching.
 *
 * @param name the field name, also the control's id and its last resort accessible name
 * @param list the flat options
 * @param onChange fired with the chosen option's value, or "" when cleared
 */
const Select: React.FC<SelectProp> = (props) => {
  const { list, onChange, className, name, hideLabels, label, error, formMessage, active, clearSelection, isDisabled } =
    props;
  const { placeholder, inShell, value, groups, labelId, clearLabel = DEFAULT_CLEAR_LABEL } = props;
  const domId = useFieldDomId(name);
  const isValueMode = value !== undefined;

  const activeLabel = active || placeholder || DEFAULT_PLACEHOLDER;
  const { icon, thumbnail } = isValueMode ? selectedArt(props) : activeArt(props);
  const hasSelection = isValueMode ? Boolean(value) : Boolean(active);

  // Named, in order of preference: a caller's own label element, the Label this renders, the
  // label text when it is visually hidden, and only with no label at all the raw field name.
  const fallbackName = hideLabels && label ? label : name;
  const ariaLabel = labelId || inShell || (!hideLabels && label) ? undefined : fallbackName;

  return (
    <>
      {/* Select is the one form control exported from the package root, so it has to stand alone
          as well as sit inside a Field. Standalone it owns its label, its error node and its
          fallback aria-label. Inside a Field it is passed inShell and gives up all three, because
          the FieldShell already renders a (possibly visually hidden) <label htmlFor> and one
          `${domId}-error` node: a second error node would make aria-describedby ambiguous, and a
          leftover aria-label would beat the real label and announce the raw field name instead.
          The standalone bare-error branch must survive, since the <select> advertises the error
          id whether or not the label is visible. */}
      {!inShell && !hideLabels && label ? (
        <Label name={name} label={label} error={error} message={formMessage} />
      ) : (
        !inShell &&
        error && (
          <span className="required" id={`${domId}-error`} role="alert">
            {error}
          </span>
        )
      )}
      <div className={className ? `select-wrapper nxs-select ${className}` : "select-wrapper nxs-select"}>
        {hasSelection && icon ? (
          <Icon icon={icon} name={icon} className="select-icon" />
        ) : thumbnail ? (
          <Hero hero={{ url: thumbnail, alt: "selection thumbnail" }} className="thumbnail-select" />
        ) : (
          ""
        )}
        <select
          // id matches the Label's htmlFor so the visible label is properly associated.
          id={domId}
          className="select nxs-select-control"
          value={isValueMode ? value : activeLabel}
          disabled={isDisabled}
          aria-labelledby={labelId}
          aria-label={ariaLabel}
          // Mirror Input/InputCheckbox/TextArea so a select with a validation error is
          // announced as invalid and points at the Label's `${domId}-error` node.
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${domId}-error` : undefined}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {isValueMode ? (
            // The empty value is the "nothing chosen" row, disabled so it cannot be picked; the
            // clear button is how a chosen value goes back to it.
            <Option data={{ label: placeholder || DEFAULT_PLACEHOLDER, name: "", value: "" }} isDisabled />
          ) : (
            <>
              <Option data={{ label: activeLabel, name: activeLabel, value: activeLabel }} isDisabled />
              <Option data={{ label: "", name: "", value: "" }} hideOption />
            </>
          )}
          {list && list.map((l) => <Option key={l.uid ?? l.value} data={l} />)}
          {groups?.map((group) => (
            <optgroup key={group.uid ?? group.label} label={group.label}>
              {group.options.map((option) => (
                <Option key={option.uid ?? option.value} data={option} />
              ))}
            </optgroup>
          ))}
        </select>
        {hasSelection && clearSelection && (
          <IconButton
            icon={{ icon: "close" }}
            onClick={() => onChange?.("")}
            className="btn-icon nxs-select-clear"
            aria-label={clearLabel}
          />
        )}
      </div>
    </>
  );
};

export default Select;
