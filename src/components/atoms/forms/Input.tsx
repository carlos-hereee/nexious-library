import { InputProps } from "@nxs-utils/helpers/interface";
import { placeholders } from "@nxs-utils/form/placeholders";

const Input: React.FC<InputProps> = (props) => {
  const { type, value, change, blur, name, theme } = props;
  return (
    <input
      className={theme ? theme : ""}
      autoComplete="on"
      name={name}
      type={type ? type : "text"}
      value={value}
      placeholder={placeholders[name]}
      onChange={change}
      onBlur={blur}
    />
  );
};
export default Input;
