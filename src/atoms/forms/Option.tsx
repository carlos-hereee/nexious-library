import { OptionProp } from "@nexious-library/helpers/types.tsx";

const Option: React.FC<OptionProp> = ({ name, value, isDisabled }) => {
  return (
    <option value={name} className="dropdown-option" disabled={isDisabled}>
      {value
        .replace(/([a-z0-9](A-Z))/g, "$1 $2")
        .split(" ")
        .map((str) => str.charAt(0) + str.substring(1))
        .join(" ")}
    </option>
  );
};
export default Option;
