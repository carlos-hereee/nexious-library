import type { OptionDataProps } from "nxs-form";

const Option: React.FC<OptionDataProps> = (props) => {
  const { isDisabled, hideOption, data } = props;
  const { label, value, name } = data;

  return (
    <option value={value} disabled={isDisabled} hidden={hideOption} title={name}>
      {label &&
        label
          .replace(/([a-z0-9](A-Z))/g, "$1 $2")
          .split(" ")
          .map((str) => str.charAt(0) + str.substring(1))
          .join(" ")}
    </option>
  );
};
export default Option;
