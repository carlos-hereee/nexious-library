import type { ButtonProps } from "nxs-button";
import { PingCount } from "../index";

/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { title, theme, label, isDisable, name, ping, children, draggable, ref } = props;
  const { onDragStart, onDragEnd, onClick } = props;
  if (ping) {
    return (
      <button
        type="button"
        className={theme ? `btn-ping ${theme}` : "btn-main btn-icon"}
        title={title}
        onClick={() => onClick && onClick()}
        aria-label={title || label || name}
        disabled={isDisable}
        draggable={draggable}
        ref={ref}
        onDragStart={(e) => onDragStart && onDragStart(e)}
        onDragEnd={(e) => onDragEnd && onDragEnd(e)}
      >
        {label && label} {ping && ping > 0 && <PingCount data={ping} />} {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={theme || "btn-main"}
      title={title}
      onClick={() => onClick && onClick()}
      draggable={draggable}
      ref={ref}
      onDragStart={(e) => onDragStart && onDragStart(e)}
      onDragEnd={(e) => onDragEnd && onDragEnd(e)}
      aria-label={title || label || name}
      disabled={isDisable}
    >
      {label && label}
      {children}
    </button>
  );
};

export default Button;
