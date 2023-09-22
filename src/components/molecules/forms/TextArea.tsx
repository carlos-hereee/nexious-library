import { Label } from "@nxs-atoms/index";

type TextAreaProps = {
  name: string;
  theme?: string;
  onChange: (key: any) => void;
  value: string;
  placeholder?: string;
  hideLabels?: boolean;
  label?: string;
  errors?: string;
};
const TextArea: React.FC<TextAreaProps> = (props) => {
  const { value, onChange, name, theme, placeholder } = props;
  const { hideLabels, label, errors } = props;
  return (
    <>
      {!hideLabels && <Label name={name} label={label} errors={errors} />}
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
