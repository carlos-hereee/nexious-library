// import { ButtonProps } from "@helpers/interface.tsx";

import { ButtonProps } from "@nexious-library/helpers/interface.tsx";

/**
 * Component - Button
 * @param children content of button
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns JSX.Element -> button
 */
const Button: React.FC<ButtonProps> = ({ children, name, click }) => {
  return (
    <button
      type="button"
      className={`btn${name ? ` btn-${name}` : ""}`}
      onClick={click}
    >
      {children}
    </button>
  );
};

export default Button;
