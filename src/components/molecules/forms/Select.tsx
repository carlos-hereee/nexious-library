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
  const { list, onChange, theme, name, hideLabels, label, error, formMessage, active } = props;
  // required props
  const { lightColor, errors } = useRequiredProps({ name, list }, true);
  if (lightColor === "red") return <ErrorMessages errors={errors} component="select" />;
  return (
    <>
      {!hideLabels && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
      <select
        className={theme ? `select-wrapper ${theme}` : "select-wrapper"}
        value={active || "Choose Selection"}
        onChange={(e) => onChange(e.target.value)}
      >
        <Option
          data={{
            label: active || "Choose Selection",
            name: active || "Choose Selection",
            value: active || "Choose Selection",
          }}
          isDisabled
        />
        <Option data={{ label: "", name: "", value: "" }} hideOption />
        {list && list.map((l) => <Option key={l.uid} data={l} />)}
      </select>
    </>
  );
};

export default Select;
