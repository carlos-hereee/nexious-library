import { Label, Option } from "@nxs-atoms";
import { OptionProp } from "@nxs-utils/helpers/types";

type SelectProp = {
  list: OptionProp[];
  active?: string;
  theme?: string;
  name: string;
  onChange?: (key: any) => void;
  hideLabels?: boolean;
  labels?: string;
  errors?: string;
};
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
  const { list, onChange, theme, active, name } = props;
  const { hideLabels, labels, errors } = props;
  return (
    <>
      {!hideLabels && <Label name={name} label={labels} errors={errors} />}
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
