import React from "react";
import type { InputProps } from "nxs-form";
import { useFieldDomId } from "@nxs-utils/hooks/useFieldDomId";

// React.forwardRef lets consumers attach a ref to the underlying <input> DOM node
// (e.g. for autofocus on mount, or programmatic focus from a parent component).
const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange, onBlur, onKeyDown, name, className, isDisabled, placeholder, type, error } = props;
  const { autoComplete = "on" } = props;
  const domId = useFieldDomId(name);
  return (
    <input
      className={className}
      autoComplete={autoComplete}
      name={name}
      type={type || "text"}
      // Coalesce to "" so an initially-undefined value does not flip the input from
      // uncontrolled to controlled (React warns and can drop keystrokes). Input is
      // controlled-only by contract.
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(event) => onChange && onChange(event.currentTarget.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
      // aria-invalid + aria-describedby point at the Label's `${domId}-error` span so screen
      // readers announce the validation message; only set when an error is actually present.
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${domId}-error` : undefined}
      ref={ref}
      // give labels a reason to be there give inputs id
      id={domId}
    />
  );
});

Input.displayName = "Input";
export default Input;
