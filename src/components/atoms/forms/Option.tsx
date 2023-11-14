import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules";
import { OptionDataProps } from "nxs-form";

const Option: React.FC<OptionDataProps> = (props) => {
  const { label, value, name } = props.data;
  const { isDisabled, hideOption } = props;
  const { lightColor, errors } = useRequiredProps({ label }, true);

  if (lightColor === "red") return <ErrorMessages errors={errors} component="option" />;
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
