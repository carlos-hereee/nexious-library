import type { ButtonProps } from "nxs-button";

/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, title, theme, label, isDisable } = props;
  return (
    <button
      type="button"
      className={theme ? `btn-main ${theme}` : "btn-main"}
      title={title ? title : undefined}
      onClick={onClick}
      disabled={isDisable}
    >
      {label}
    </button>
  );
};

export default Button;
