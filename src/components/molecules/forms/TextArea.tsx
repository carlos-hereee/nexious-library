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
        value={value}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};
export default TextArea;
