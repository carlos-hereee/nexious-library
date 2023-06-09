import { InputProps } from "types/interface";

const Input: React.FC<InputProps> = ({ type, value, change, blur }) => {
  return (
    <input
      className="input"
      type={type}
      value={value}
      onChange={change}
      onBlur={blur}
    />
  );
};
export default Input;
