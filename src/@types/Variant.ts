/**
 * The enumerated visual vocabulary, replacing the free-form `theme?: string` prop in 4.0.0.
 *
 * Why this had to be an enum and a rename rather than one or the other: `theme` was doing two
 * unrelated jobs at once. Measured across both repos before the change, roughly 85 percent of its
 * call sites passed a LAYOUT hook (`entry-rail-thumb`, `select-icon`, `user-chip-compact`) or the
 * consuming app's own design-system classes (`cu-btn cu-btn-primary`, at 270 sites), and only
 * about a dozen passed something that was genuinely a variant. So `theme` was `className` with a
 * misleading name, plus a variant selector nobody could type-check, welded together.
 *
 * 4.0.0 splits them. `className` is the escape hatch and behaves the way every React consumer
 * already expects. `variant` and `size` are the semantic API, and a typo in either is a compile
 * error instead of an unstyled control.
 *
 * There is deliberately NO default variant. A button with no `variant` renders only what its
 * `className` says, which is exactly what `theme` did (it REPLACED the base class), so every
 * existing call site keeps its current output through the migration. A default would have
 * appended a library class underneath the 270 app-owned ones and started a specificity fight.
 */
export type Variant = "primary" | "secondary" | "tertiary" | "danger" | "ghost";

/** Maps onto the three control heights in vars/_control.scss: 28px, 36px, 44px. */
export type Size = "small" | "medium" | "large";

/**
 * Reserved for the table and list work in Phase 4, where a dense row legitimately drops one
 * spacing step. Declared here so both halves land on one name rather than inventing two.
 */
export type Density = "comfortable" | "compact";

/** The class a variant renders. Exported so a consumer can target the same hooks in its own CSS. */
export const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
  danger: "btn-danger",
  ghost: "btn-ghost",
};

export const SIZE_CLASS: Record<Size, string> = {
  small: "btn-sm",
  medium: "btn-md",
  large: "btn-lg",
};

/**
 * Builds the class string for a control from its variant, its size and the caller's className.
 *
 * One helper rather than the same three-way join copied into five button components, so they
 * cannot disagree about precedence or about what an absent variant means (CLAUDE.md rule 17).
 * Order matters and is not cosmetic: the caller's className comes LAST so an equal-specificity
 * rule of theirs wins on source order without needing !important.
 */
export const buildControlClass = (parts: {
  variant?: Variant;
  size?: Size;
  className?: string;
  extra?: string;
}): string | undefined => {
  const { variant, size, className, extra } = parts;
  const classes = [
    variant ? "btn-base" : "",
    variant ? VARIANT_CLASS[variant] : "",
    size ? SIZE_CLASS[size] : "",
    extra || "",
    className || "",
  ].filter(Boolean);
  // undefined rather than "" so React omits the attribute entirely on an unstyled control.
  return classes.length ? classes.join(" ") : undefined;
};
