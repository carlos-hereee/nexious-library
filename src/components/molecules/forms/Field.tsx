import { Input, Label } from "@nxs-atoms/index";
// import { useErrors } from "@nxs-utils/hooks/useErrors";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { ErrorMessages } from "..";

type FieldProp = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hideLabel?: boolean;
  label?: string;
  error?: string;
};
const Field: React.FC<FieldProp> = (props) => {
  const { name, value, onChange, placeholder } = props;
  const { hideLabel, label, error } = props;
  const { lightColor, errors } = usePropErrorHandling({ name }, true);

  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="field" />;
  }

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
