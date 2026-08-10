import type { NumberInputProps } from "nxs-form";

const InputQuantity: React.FC<NumberInputProps> = (props) => {
  const { min, max, value, onChange, onBlur, isDisabled, name, error } = props;
  return (
    <input
      className="input-quantity highlight"
      type="number"
      // Matches Input/TextArea/Select: a quantity field with a validation error is announced as
      // invalid and points at the `${name}-error` node the field shell renders. This control was
      // the one text-entry input in the library with no aria wiring at all.
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      // id/name match FieldQuantity's Label htmlFor={name} so the visible label is
      // programmatically associated (WCAG 1.3.1/4.1.2). One control per field.
      id={name}
      name={name}
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange && onChange(event.currentTarget.value)}
      onBlur={onBlur}
      disabled={isDisabled}
    />
  );
};
export default InputQuantity;
