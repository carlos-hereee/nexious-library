import { Label } from "@nxs-atoms/index";
import { TextAreaProps } from "nxs-form";

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { value, name, placeholder, error, label, onChange } = props.input;
  const { hideLabels, theme, formMessage } = props;

  return (
    <>
      {!hideLabels && label && (
        <Label name={name} label={label} errors={error} message={formMessage} />
      )}
      <textarea
        className={theme}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};
export default TextArea;
