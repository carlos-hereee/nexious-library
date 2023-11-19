import { Input, Label } from "@nxs-atoms/index";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { ErrorMessages } from "@nxs-molecules";
import type { InputProps } from "nxs-form";

const Field: React.FC<InputProps> = (props) => {
  const { name, value, onChange, placeholder, hideLabel, label, error, formMessage } = props;
  // required props
  const { lightColor, errors } = useRequiredProps({ name }, true);

  if (lightColor === "red") return <ErrorMessages errors={errors} component="field" />;
  return (
    <>
      {!hideLabel && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
      <Input
        value={value}
        onChange={onChange}
        name={name}
        theme="highlight"
        placeholder={placeholder}
      />
    </>
  );
};
export default Field;
