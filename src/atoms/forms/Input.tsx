// import { InputProps } from "@helpers/interface.tsx";

import { InputProps } from "@nexious-library/helpers/interface.tsx";

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
