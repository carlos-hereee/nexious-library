import type { TextAreaProps } from "nxs-form";
import { Label } from "@nxs-atoms/index";
import { useFieldDomId } from "@nxs-utils/hooks/useFieldDomId";

const TextArea = (props: TextAreaProps) => {
  const { hideLabels, className, formMessage, input, error } = props;
  const { value, name, placeholder, label, onChange, isDisabled } = input;
  const domId = useFieldDomId(name);

  return (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={error} message={formMessage} />}
      <textarea
        className={className ? `highlight ${className}` : "highlight"}
        name={name}
        // id matches the sibling Label's htmlFor so the visible label is
        // programmatically associated (WCAG 1.3.1/4.1.2); mirrors Input.tsx.
        id={domId}
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={(event) => onChange && onChange(event.currentTarget.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${domId}-error` : undefined}
      />
    </>
  );
};
export default TextArea;
