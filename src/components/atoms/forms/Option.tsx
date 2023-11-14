import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules";
import { OptionDataProps } from "nxs-form";
import { Icon } from "@nxs-atoms";

const Option: React.FC<OptionDataProps> = (props) => {
  const { label, value, name, icon } = props.data;
  const { isDisabled, hideOption } = props;
  const { lightColor, errors } = useRequiredProps({ label }, true);
  if (lightColor === "red") return <ErrorMessages errors={errors} component="option" />;
  // console.log("props.data :>> ", props.data);
  return (
    <option value={value} disabled={isDisabled} hidden={hideOption} title={name}>
      {icon && <Icon icon={icon} name="option" />}
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
