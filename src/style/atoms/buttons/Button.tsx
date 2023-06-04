// import React from "react";

type ButtonProps = {
  data: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
};
const Button = ({ data, click }: ButtonProps): JSX.Element => (
  <button type="button" className={`btn ${data}`} onClick={click}>
    <span>{data}</span>
  </button>
);
export default Button;
