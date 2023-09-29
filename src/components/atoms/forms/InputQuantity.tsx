import { InputProps } from "nxs-form";

const InputQuantity: React.FC<InputProps> = (props) => {
  const { min, max, value, onChange, onBlur } = props;
  return (
    <input
      className="input-quantity"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
export default InputQuantity;
