import { InputPrice, Label } from "@nxs-atoms";
import type { NumberInputProps } from "nxs-form";
// import { useState } from "react";

const FieldPrice: React.FC<NumberInputProps> = (props) => {
  const { max, value, onChange, onBlur, name, label, hideLabel, error, formMessage, type } = props;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, t: string) => {
    const { value: val } = e.target;
    if (t === "pennies" && onChange) {
      const dollars = Math.floor(value / 100);
      e.target.value = `${dollars * 100 + parseInt(val, 10)}`;
      onChange(e);
    }
    if (t === "dollars" && onChange) {
      const pennies = value % 100;
      e.target.value = `${parseInt(val, 10) * 100 + pennies}`;
      onChange(e);
    }
  };
  return (
    <>
      {!hideLabel && label && <Label name={name} label={label} errors={error} message={formMessage} />}
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
