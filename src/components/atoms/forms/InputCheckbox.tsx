import Label from "./Label";

type CheckboxProps = {
  name: string;
  value: boolean;
  theme?: string;
  hideLabel?: boolean;
  label?: string;
  error?: string;
  onChange?: (key: any) => void;
};
const InputCheckbox: React.FC<CheckboxProps> = (props) => {
  const { value, onChange, name, theme, hideLabel, label, error } = props;
  // console.log("value, name", value, name);
  return (
    <div className="input-checkbox">
      <input
        className={theme}
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        // give lavels a reason to be there give inputs id
        id={name}
      />
      {!hideLabel && <Label name={name} label={label} errors={error} />}
    </div>
  );
};
export default InputCheckbox;
