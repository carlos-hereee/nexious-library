import type { ButtonProps } from "nxs-button";

/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, title, theme, label, isDisable, name } = props;

  const buttonStyle = theme ? `btn-main ${theme}` : "btn-main";
  return (
    <button
      type="button"
      className={buttonStyle}
      title={title}
      onClick={onClick}
      aria-label={title || label || name}
      disabled={isDisable}
    >
      {label && label}
    </button>
  );
};

export default Button;
