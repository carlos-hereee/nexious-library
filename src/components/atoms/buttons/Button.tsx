/* eslint-disable react/button-has-type -- `type` is a configurable prop (button | submit | reset);
   the rule only permits a static string literal, but Button intentionally forwards the caller's type. */
import React from "react";
import type { ButtonProps } from "nxs-button";
import { PingCount } from "../index";

/**
 * Component - Button
 * @param children children props
 * @param name add an optional classname of the button component
 * @param click Callback fired when button is click
 * @returns
 */
// React.forwardRef lets consumers attach a ref to the underlying <button> DOM node
// (e.g. for focus management in modals, or programmatic click triggers).
// Without forwardRef, passing ref={someRef} on <Button> would silently do nothing.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { title, theme, label, isDisable, isDisabled, name, ping, children, draggable } = props;
  const { onDragStart, onDragEnd, onClick, className: classNameProp, type, id, style } = props;

  // Explicit aria-label from the caller takes priority; fall back to title → label → name.
  // This matters for icon-only or close buttons where the caller knows the right label
  // (e.g. aria-label="Close") but none of title/label/name are set.
  const ariaLabel = props["aria-label"] || title || label || name;

  // className differs only when ping is active (uses btn-ping prefix instead of btn-main).
  // Previously this was two full duplicate <button> blocks — consolidated into one.
  const baseClass = ping ? (theme ? `btn-ping ${theme}` : "btn-main btn-icon") : theme || "btn-main";
  // Merge a caller className onto the base class instead of replacing it, so consumers can
  // extend styling (the client's PagesList passes one) without losing btn-main/theme.
  const className = classNameProp ? `${baseClass} ${classNameProp}` : baseClass;
  // isDisabled is the canonical alias; fall back to the legacy isDisable spelling.
  const disabled = isDisabled ?? isDisable;

  return (
    <button
      type={type || "button"}
      className={className}
      title={title}
      id={id}
      style={style}
      onClick={() => onClick && onClick()}
      aria-label={ariaLabel}
      disabled={disabled}
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
});

Button.displayName = "Button";
export default Button;
