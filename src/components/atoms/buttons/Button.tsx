/* eslint-disable react/button-has-type -- `type` is a configurable prop (button | submit | reset);
   the rule only permits a static string literal, but Button intentionally forwards the caller's type. */
import React from "react";
import type { ButtonProps } from "nxs-button";
import { buildControlClass } from "../../../@types/Variant";
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
  const { title, label, isDisable, isDisabled, name, ping, children, draggable } = props;
  const { onDragStart, onDragEnd, onClick, variant, size, className: callerClass, type, id, style } = props;

  // Explicit aria-label from the caller takes priority; fall back to title → label → name.
  // This matters for icon-only or close buttons where the caller knows the right label
  // (e.g. aria-label="Close") but none of title/label/name are set.
  const ariaLabel = props["aria-label"] || title || label || name;

  // 4.0.0: no implicit base class. `theme` used to REPLACE the base and `className` used to
  // APPEND to it, which is two ways to style one element and is why the two props existed at
  // all. Now variant and size choose library classes, className is the caller's, and with
  // neither variant nor size the button renders exactly the className it was given. That is
  // what lets 319 call sites that passed their own design-system classes through `theme` keep
  // their rendered output through the migration instead of gaining a library class underneath.
  const buttonClass = buildControlClass({ variant, size, className: callerClass, extra: ping ? "btn-ping" : "" });
  // isDisabled is the canonical alias; fall back to the legacy isDisable spelling.
  const disabled = isDisabled ?? isDisable;

  return (
    <button
      type={type || "button"}
      className={buttonClass}
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
