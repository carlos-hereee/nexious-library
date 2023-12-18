import type { NumberInputProps } from "nxs-form";

const InputQuantity: React.FC<NumberInputProps> = (props) => {
  const { min, max, value, onChange, onBlur, isDisabled } = props;
  return (
    <input
      className="input-quantity highlight"
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={isDisabled}
    />
  );
};
export default InputQuantity;
