// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/empty-state/README.md
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
  const { as: Root = "div", headingLevel = 3, classNames, media, actions } = props;
  // A raw element rather than the Heading atom, which adds a class of its own and would change
  // the markup every existing caller renders (pinned in EmptyState.test.tsx).
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <Root className={join(classNames?.root ?? "empty-state", className)}>
      {hero && <Hero hero={hero} />}
      {icon && (
        <div className={join(classNames?.icon ?? "empty-state-icon", iconClassName)}>
          <Icon icon={icon} spin={iconSpin} />
        </div>
      )}
      {media}
      {heading && <HeadingTag className={classNames?.heading ?? "empty-state-heading"}>{heading}</HeadingTag>}
      {message && <p className={join(classNames?.message ?? "empty-state-message", messageClassName)}>{message}</p>}
      {/* A caller's own row replaces the single action outright, so a gate with two buttons
          never also grows a third from a stray actionLabel. */}
      {actions ? <div className={classNames?.actions ?? "empty-state-actions"}>{actions}</div> : null}
      {/* Gated on the label alone, not on the handler. PageNotFound renders its button with no
          onClick when the caller omits one, and requiring a handler here would delete that
          button from every such call site. */}
      {!actions && actionLabel && (
        <Button
          label={actionLabel}
          variant={actionVariant}
          className={classNames?.action ?? "empty-state-action"}
          onClick={onAction}
        />
      )}
      {children}
    </Root>
  );
};

export default EmptyState;
