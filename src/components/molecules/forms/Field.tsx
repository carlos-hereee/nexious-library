import { Input, Label } from "@nxs-atoms/index";
import type { InputProps } from "nxs-form";

const Field: React.FC<InputProps> = (props) => {
  const { name, value, onChange, placeholder, hideLabel, label, error, formMessage } = props;

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
