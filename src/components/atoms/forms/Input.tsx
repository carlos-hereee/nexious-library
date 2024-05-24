import type { InputProps } from "nxs-form";

const Input: React.FC<InputProps> = (props) => {
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
      // give labels a reason to be there give inputs id
      id={name}
    />
  );
};
export default Input;
