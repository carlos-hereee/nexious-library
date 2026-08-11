import { InputQuantity, Label } from "@nxs-atoms";
import type { NumberInputProps } from "nxs-form";

const FieldQuantity: React.FC<NumberInputProps> = (props) => {
  // isDisabled was declared on NumberInputProps, passed by fieldRegistry's renderNumber as
  // `isDisabled={disableForm}`, and consumed by InputQuantity as `disabled`, but it was never
  // destructured here, so the chain broke at this one link and a `type: "number"` field stayed
  // editable while the rest of a submitting form was disabled. Found by the Phase 5 axe sweep.
  const { schema, value, onChange, onBlur, name, label, hideLabel, error, formMessage, isDisabled } = props;

  return (
    <>
      {!hideLabel && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <InputQuantity
        name={name}
        min={schema?.min || 0}
        max={schema?.max}
        value={value}
        error={error}
        isDisabled={isDisabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};
export default FieldQuantity;
