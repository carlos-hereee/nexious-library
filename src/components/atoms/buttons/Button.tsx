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

  // Explicit aria-label from the caller takes priority; fall back to title → label → name.
  // This matters for icon-only or close buttons where the caller knows the right label
  // (e.g. aria-label="Close") but none of title/label/name are set.
  const ariaLabel = props["aria-label"] || title || label || name;

  // className differs only when ping is active (uses btn-ping prefix instead of btn-main).
  // Previously this was two full duplicate <button> blocks — consolidated into one.
  const className = ping
    ? theme ? `btn-ping ${theme}` : "btn-main btn-icon"
    : theme || "btn-main";

  return (
    <button
      type="button"
      className={className}
      title={title}
      onClick={() => onClick && onClick()}
      aria-label={ariaLabel}
      disabled={isDisable}
      draggable={draggable}
      ref={ref}
      onDragStart={(e) => onDragStart && onDragStart(e)}
      onDragEnd={(e) => onDragEnd && onDragEnd(e)}
    >
      {label && label}
      {ping && ping > 0 && <PingCount data={ping} />}
      {children}
    </button>
  );
};

export default Button;
