import type { ButtonProps } from "nxs-button";
import { PingCount } from "../index";

/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
const Button: React.FC<ButtonProps> = ({ onClick, title, theme, label, isDisable, name, ping }) => {
  if (ping) {
    return (
      <button
        type="button"
        className={theme ? `btn-main btn-icon ${theme}` : "btn-main btn-icon"}
        title={title}
        onClick={onClick}
        aria-label={title || label || name}
        disabled={isDisable}
      >
        {label && label} {ping && ping > 0 && <PingCount data={ping} />}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={theme ? `btn-main ${theme}` : "btn-main"}
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
