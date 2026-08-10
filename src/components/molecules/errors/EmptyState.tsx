import Button from "@nxs-atoms/buttons/Button";
import Icon from "@nxs-atoms/assets/Icon";
import Hero from "@nxs-molecules/assets/Hero";
import type { EmptyStateProps } from "nxs-errors";

// Appends rather than replaces. Every wrapper below already carried a class a consumer's CSS
// may target, and the pattern's own class has to survive alongside it.
const join = (base: string, extra?: string): string => (extra ? `${base} ${extra}` : base);

// Imported by direct path, not through the @nxs-atoms / @nxs-molecules barrels: EmptySection,
// ComingSoon and PageNotFound are all re-exported FROM those barrels, so a barrel import here
// would close a module cycle for no gain.

/**
 * Component - EmptyState
 *
 * The one layout behind every "there is nothing here" surface: a small glyph, a one-line
 * headline, a sentence of guidance, and the primary next action (design language 5.10).
 *
 * Why one component instead of three: EmptySection, ComingSoon and PageNotFound were three
 * independent stacks of markup wearing a utility class each, which is exactly how three
 * surfaces that mean the same thing end up looking like three different products. They now
 * render through this, so a change to the pattern reaches all of them.
 *
 * Every slot is optional and nothing renders by default, which is deliberate. The three
 * callers are published components with live consumers, and a glyph or a heading that appears
 * where none appeared before is a visible change nobody asked for.
 */
const EmptyState: React.FC<EmptyStateProps> = (props) => {
  const { icon, iconSpin, hero, heading, message, actionLabel, actionVariant, onAction } = props;
  const { className, iconClassName, messageClassName, children } = props;

  return (
    <div className={join("empty-state", className)}>
      {hero && <Hero hero={hero} />}
      {icon && (
        <div className={join("empty-state-icon", iconClassName)}>
          <Icon icon={icon} spin={iconSpin} />
        </div>
      )}
      {heading && <h3 className="empty-state-heading">{heading}</h3>}
      {message && <p className={join("empty-state-message", messageClassName)}>{message}</p>}
      {/* Gated on the label alone, not on the handler. PageNotFound renders its button with no
          onClick when the caller omits one, and requiring a handler here would delete that
          button from every such call site. */}
      {actionLabel && (
        <Button label={actionLabel} variant={actionVariant} className="empty-state-action" onClick={onAction} />
      )}
      {children}
    </div>
  );
};

export default EmptyState;
