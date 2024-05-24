import { Icon, Label, Option } from "@nxs-atoms";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages, IconButton } from "@nxs-molecules";
import type { SelectProp } from "nxs-form";

/**
 *
 * @param name the title of the selection tag
 * @param list an array of all the options
 * @param change a callback fired when a selection is made
 * @param main the default option when page loads
 *        main: { uid, value, name }
 * @returns
 */
const Select: React.FC<SelectProp> = (props) => {
  const { list, onChange, theme, name, hideLabels, label, error, formMessage, active, clearSelection, isDisabled } =
    props;
  // require key variable
  if (!onChange) throw Error("onChange is required");
  // required props
  const { lightColor, errors } = useRequiredProps({ name, list }, true);

  const activeLabel = active || "Choose Selection";
  const icon = active ? list && list.filter((l) => l && l.icon && l.icon === active)[0]?.icon : undefined;

  if (lightColor === "red") return <ErrorMessages errors={errors} component="select" />;
  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <div className={theme ? `select-wrapper ${theme}` : "select-wrapper"}>
        {active && icon && <Icon icon={icon} name={icon} theme="select-icon" />}
        <select className="select" value={activeLabel} disabled={isDisabled} onChange={(e) => onChange(e.target.value)}>
          <Option data={{ label: activeLabel, name: activeLabel, value: activeLabel }} isDisabled />
          <Option data={{ label: "", name: "", value: "" }} hideOption />
          {list && list.map((l) => <Option key={l.uid} data={l} />)}
        </select>
        {active && clearSelection && (
          <IconButton icon={{ icon: "close" }} onClick={() => onChange("")} theme="btn-icon" />
        )}
      </div>
    </>
  );
};

export default Select;
