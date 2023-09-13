import { InputProps } from "@nxs-utils/helpers/interface";
import { placeholders } from "@nxs-utils/form/placeholders";

const Input: React.FC<InputProps> = (props) => {
  const { type, value, onChange, blur, name, theme, placeholder } = props;
  return (
    <input
      className={theme ? theme : ""}
      autoComplete="on"
      name={name}
      type={type ? type : "text"}
      value={value}
      placeholder={placeholder ? placeholder : placeholders[name]}
      onChange={onChange}
      onBlur={blur}
    />
  );
};
export default Input;
