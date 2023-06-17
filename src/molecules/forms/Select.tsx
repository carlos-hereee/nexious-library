import { OptionProp } from "@nexious-library/helpers/types";
import { Option } from "@nexious-library/atoms/index";

type SelectProp = {
  name: string;
  list: OptionProp[];
  main: OptionProp;
  change: () => void;
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
const Select: React.FC<SelectProp> = ({ name, list, change, main }) => {
  return (
    <select
      className={`dropdown-select dropdown-${name}`}
      value={name}
      onChange={change}
    >
      {list.map((l) => (
        <Option
          key={l.uid}
          name={l.name}
          value={l.value}
          isDisabled={main.uid == l.uid}
        />
      ))}
    </select>
  );
};

export default Select;
