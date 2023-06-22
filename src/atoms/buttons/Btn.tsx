import { ButtonProps } from "./Button";

/**
 * Component - Button
 * @param children content of button
 * @param name add an optional classname of the button component
 * @returns JSX.Element -> button
 */
const Btn: React.FC<ButtonProps> = ({ children, name }) => {
  return (
    <button type="button" className={`btn${name ? ` btn-${name}` : ""}`}>
      {children}
    </button>
  );
};

export default Btn;
