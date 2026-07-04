import type { TextAreaProps } from "nxs-form";
import { Label } from "@nxs-atoms/index";

const TextArea = (props: TextAreaProps) => {
  const { hideLabels, theme, formMessage, input, error } = props;
  const { value, name, placeholder, label, onChange, isDisabled } = input;

  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <textarea
        className={theme ? `highlight ${theme}` : "highlight"}
        name={name}
        // id matches the sibling Label's htmlFor={name} so the visible label is
        // programmatically associated (WCAG 1.3.1/4.1.2); mirrors Input.tsx.
        id={name}
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    </>
  );
};
export default TextArea;
