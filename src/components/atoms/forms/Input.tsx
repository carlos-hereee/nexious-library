import React from "react";
import type { InputProps } from "nxs-form";

// React.forwardRef lets consumers attach a ref to the underlying <input> DOM node
// (e.g. for autofocus on mount, or programmatic focus from a parent component).
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange, onBlur, name, theme, isDisabled, placeholder, type } = props;
  return (
    <input
      className={theme}
      autoComplete="on"
      name={name}
      type={type || "text"}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange && onChange(event.currentTarget.value)}
      onBlur={onBlur}
      disabled={isDisabled}
      ref={ref}
      // give labels a reason to be there give inputs id
      id={name}
    />
  );
});

Input.displayName = "Input";
export default Input;
