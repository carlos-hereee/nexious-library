import { InputProps } from "nxs-form";

const Option: React.FC<InputProps> = (props) => {
  const { name, value, isDisabled } = props;
  return (
    <option value={name} className="dropdown-option" disabled={isDisabled}>
      {value &&
        value
          .replace(/([a-z0-9](A-Z))/g, "$1 $2")
          .split(" ")
          .map((str) => str.charAt(0) + str.substring(1))
          .join(" ")}
    </option>
  );
};
export default Option;
