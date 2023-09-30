import { Label, Option } from "@nxs-atoms";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
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
  const { list, onChange, theme, active, name, hideLabels, label, error } = props;
  // required props
  const { lightColor, errors } = usePropErrorHandling({ name, list }, true);
  if (lightColor === "red") return <ErrorMessages errors={errors} component="select" />;
  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} errors={error} />}
      <select
        className={theme ? `select-wrapper ${theme}` : "select-wrapper"}
        value={active ? active : ""}
        onChange={onChange}
      >
        <Option name="" value="" isDisabled />
        {list.map((l) => (
          <Option
            key={l.uid}
            name={l.name}
            value={l.value}
            isDisabled={l.name === active}
          />
        ))}
      </select>
    </>
  );
};

export default Select;
