import { InputQuantity, Label } from "@nxs-atoms";
import type { NumberInputProps } from "nxs-form";

const FieldQuantity: React.FC<NumberInputProps> = (props) => {
  const { schema, value, onChange, onBlur, name, label, hideLabel, error, formMessage } = props;
  return (
    <>
      {!hideLabel && label && <Label name={name} label={label} errors={error} message={formMessage} />}
      <InputQuantity
        name={name}
        min={schema?.min || 0}
        max={schema?.max}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};
export default FieldQuantity;
