import { InputPrice, Label } from "@nxs-atoms";
import type { NumberInputProps } from "nxs-form";
// import { useState } from "react";

const FieldPrice: React.FC<NumberInputProps> = (props) => {
  const { max, value, onChange, onBlur, name, label, hideLabel, error, formMessage } = props;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const { value: val } = e.target;
    if (type === "pennies" && onChange) {
      const dollars = Math.floor(value / 100);
      e.target.value = `${dollars * 100 + parseInt(val, 10)}`;
      onChange(e);
    }
    if (type === "dollars" && onChange) {
      const pennies = value % 100;
      e.target.value = `${parseInt(val, 10) * 100 + pennies}`;
      onChange(e);
    }
  };
  return (
    <>
      {!hideLabel && label && <Label name={name} label={label} errors={error} message={formMessage} />}
      <div className="input-price-wrapper">
        $
        <InputPrice
          name={name}
          max={max}
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
    </>
  );
};
export default FieldPrice;
