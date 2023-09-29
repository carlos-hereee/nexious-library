import { InputQuantity, Label } from "@nxs-atoms";
import { InputProps } from "nxs-form";

const FieldQuantity: React.FC<InputProps> = (props) => {
  const { min, max, value, onChange, onBlur, name, label } = props;
  return (
    <div className="field">
      <Label label={label} name={name} />
      <InputQuantity
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};
export default FieldQuantity;
