import { InputProps } from "nxs-form";
import Label from "./Label";

const InputCheckbox: React.FC<InputProps> = (props) => {
  const { checked, onChange, name, theme, hideLabel, label, error } = props;
  return (
    <div className="input-checkbox">
      <input
        className={theme}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        // give lavels a reason to be there give inputs id
        id={name}
      />
      {!hideLabel && label && <Label name={name} label={label} errors={error} />}
    </div>
  );
};
export default InputCheckbox;
