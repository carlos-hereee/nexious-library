import type { NumberInputProps } from "nxs-form";

const InputPrice: React.FC<NumberInputProps> = (props) => {
  const { max, value, onChange, onBlur, isDisabled } = props;
  return (
    <input
      className="input-price"
      type="number"
      min="0"
      max={max}
      placeholder={`${value / 100}`}
      value={value < 10 ? `0${value}` : value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={isDisabled}
      inputMode="numeric"
      pattern="[0-9]*"
    />
  );
};
export default InputPrice;
