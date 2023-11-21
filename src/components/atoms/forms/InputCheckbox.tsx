import type { InputProps } from "nxs-form";
import Label from "./Label";

const InputCheckbox = (props: InputProps) => {
  const { value, onChange, name, theme, hideLabel, label, error, formMessage } = props;

  return (
    <div className="input-checkbox">
      <input
        className={theme}
        name={name}
        type="checkbox"
        checked={!!value}
        onChange={onChange}
        // give lavels a reason to be there give inputs id
        id={name}
      />
      {!hideLabel && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
    </div>
  );
};
export default InputCheckbox;
