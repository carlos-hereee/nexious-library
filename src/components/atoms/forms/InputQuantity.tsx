import { InputProps } from "@nxs-utils/helpers/interface";

const InputQuantity: React.FC<InputProps> = (props) => {
  const { min, max, value, onChange, blur } = props;
  return (
    <input
      className="input-quantity"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onBlur={blur}
    />
  );
};
export default InputQuantity;
