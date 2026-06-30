import React from "react";
import type { InputProps } from "nxs-form";

// React.forwardRef lets consumers attach a ref to the underlying <input> DOM node
// (e.g. for autofocus on mount, or programmatic focus from a parent component).
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange, onBlur, name, theme, isDisabled, placeholder, type, error } = props;
  return (
    <input
      className={theme}
      autoComplete="on"
      name={name}
      type={type || "text"}
      // Coalesce to "" so an initially-undefined value does not flip the input from
      // uncontrolled to controlled (React warns and can drop keystrokes). Input is
      // controlled-only by contract.
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(event) => onChange && onChange(event.currentTarget.value)}
      onBlur={onBlur}
      disabled={isDisabled}
      // aria-invalid + aria-describedby point at the Label's `${name}-error` span so screen
      // readers announce the validation message; only set when an error is actually present.
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${name}-error` : undefined}
      ref={ref}
      // give labels a reason to be there give inputs id
      id={name}
    />
  );
});

Input.displayName = "Input";
export default Input;
