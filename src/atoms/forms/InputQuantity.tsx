export type InputQuantityProps = {
  min: number;
  max: number;
  value: string;
  change: () => void;
  blur: () => void;
};

const InputQuantity: React.FC<InputQuantityProps> = ({
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
