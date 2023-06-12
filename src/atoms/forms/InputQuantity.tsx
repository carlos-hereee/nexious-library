import { InputProps } from "@nexious-library/helpers/interface.js";

const InputQuantity: React.FC<InputProps> = ({
  min,
  max,
  value,
  change,
  blur,
}) => {
  return (
    <input
      className="input input-quantity"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={change}
      onBlur={blur}
    />
  );
};
export default InputQuantity;
