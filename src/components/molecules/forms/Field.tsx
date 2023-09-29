import { Input, Label } from "@nxs-atoms/index";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { ErrorMessages } from "@nxs-molecules";
import { InputProps } from "nxs-form";

const Field: React.FC<InputProps> = (props) => {
  const { name, value, onChange, placeholder, hideLabel, label, error } = props;
  // required props
  const { lightColor, errors } = usePropErrorHandling({ name }, true);

  if (lightColor === "red") return <ErrorMessages errors={errors} component="field" />;
  return (
    <>
      {!hideLabel && <Label name={name} label={label} errors={error} />}
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
