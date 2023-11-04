import { Label, Option } from "@nxs-atoms";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules";
import { SelectProp } from "nxs-form";

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
  const { list, onChange, theme, active, name, hideLabels, label, error, formMessage } = props;
  // required props
  // const { lightColor, errors } = useRequiredProps({ name, list }, true);
  const selected = active || list[0].label;
  // console.log("list :>> ", list);
  // if (lightColor === "red") return <ErrorMessages errors={errors} component="select" />;
  return (
    <>
      {!hideLabels && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
      <select
        className={theme ? `select-wrapper ${theme}` : "select-wrapper"}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <Option label={selected} name={selected} value={selected} isDisabled />
        <Option label="" name="" value="" hideOption />
        {list.map((l) => (
          <Option key={l.uid} name={l.name} value={l.value} label={l.label} />
        ))}
      </select>
    </>
  );
};

export default Select;
