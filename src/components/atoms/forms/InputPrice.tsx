import type { NumberInputProps } from "nxs-form";

const InputPrice: React.FC<NumberInputProps> = ({ max, value, onChange, onBlur, isDisabled, theme }) => {
  return (
    <input
      className={`input-price highlight${theme ? ` ${theme}` : ""}`}
      type="number"
      min={0}
      max={max}
      placeholder={`${value / 100}`}
      value={value < 10 ? `0${value}` : value}
      onChange={(event) => onChange && onChange(event.currentTarget.value)}
      onBlur={onBlur}
      disabled={isDisabled}
      inputMode="numeric"
      pattern="[0-9]*"
    />
  );
};
export default InputPrice;
