import { InputProps } from "@nxs-utils/helpers/interface";
import { initPlaceholders } from "@nxs-utils/form/placeholders";

const Input: React.FC<InputProps> = (props) => {
  const { type, value, onChange, onBlur, name, theme, placeholder } = props;
  return (
    <input
      className={theme ? theme : ""}
      autoComplete="on"
      name={name}
      type={type ? type : "text"}
      value={value}
      placeholder={placeholder ? placeholder : initPlaceholders[name]}
      onChange={onChange}
      onBlur={onBlur}
      // give lavels a reason to be there give inputs id
      id={name}
    />
  );
};
export default Input;
