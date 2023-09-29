import { InputProps } from "@nxs-utils/helpers/interface";

const Input: React.FC<InputProps> = (props) => {
  const { value, onChange, onBlur, name, theme, placeholder } = props;
  return (
    <input
      className={theme}
      autoComplete="on"
      name={name}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      // give labels a reason to be there give inputs id
      id={name}
    />
  );
};
export default Input;
