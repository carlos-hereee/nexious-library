import { InputPrice, Label } from "@nxs-atoms";
import type { NumberInputProps } from "nxs-form";

const FieldPrice: React.FC<NumberInputProps> = (props) => {
  const { max, value, onChange, onBlur, name, label, hideLabel, error, formMessage, type } = props;

  const handlePriceChange = (e: string, t: string) => {
    if (t === "pennies" && onChange) {
      const dollars = Math.floor(value / 100);
      const val = `${dollars * 100 + parseInt(e, 10)}`;
      onChange(val);
    }
    if (t === "dollars" && onChange) {
      const pennies = value % 100;
      const val = `${parseInt(e, 10) * 100 + pennies}`;
      onChange(val);
    }
  };
  return (
    <>
      {!hideLabel && label && <Label name={name} label={label} error={error} message={formMessage} />}
      {type === "price-dollars-cents" ? (
        <div className="input-price-wrapper">
          <span className="size-2x">$ </span>
          <InputPrice
            name={name}
            max={max}
            theme="field-dollars"
            value={Math.floor(value / 100)}
            onChange={(e) => handlePriceChange(e, "dollars")}
            onBlur={onBlur}
          />
          <span className="size-3x">.</span>
          <InputPrice
            name={name}
            max={100}
            value={value % 100}
            onChange={(e) => handlePriceChange(e, "pennies")}
            onBlur={onBlur}
          />
        </div>
      ) : (
        <div className="input-price-wrapper">
          <InputPrice
            name={name}
            max={100}
            value={value % 100}
            onChange={(e) => handlePriceChange(e, "pennies")}
            onBlur={onBlur}
          />
        </div>
      )}
    </>
  );
};
export default FieldPrice;
