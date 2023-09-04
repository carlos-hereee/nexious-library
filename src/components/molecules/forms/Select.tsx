import { Option } from "@nxs-atoms";
import { OptionProp } from "@nxs-utils/helpers/types";

type SelectProp = {
  name: string;
  list: OptionProp[];
  active?: string;
  theme?: string;
  onChange?: (key: any) => void;
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
  const { name, list, onChange, theme, active } = props;
  return (
    <select
      className={theme ? `select-wrapper ${theme}` : "select-wrapper"}
      value={active ? active : name}
      onChange={onChange}
    >
      {list.map((l) => (
        <Option
          key={l.uid}
          name={l.name}
          value={l.value}
          isDisabled={l.name === active}
        />
      ))}
    </select>
  );
};

export default Select;
