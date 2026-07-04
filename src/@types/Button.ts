import type { CardinalDirectionProps } from "nxs-typography";
import type { LibraryIconKey } from "@nxs-atoms/assets/iconRegistry";

export type SizeProp = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
export type NumSize = "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
// `LibraryIconKey | (string & {})` makes editors autocomplete the built-in icon keys while
// ANY string still compiles (consumers register custom keys against an open registry, so we
// cannot hard-restrict the union). Discoverability without locking the registry. The import
// is type-only, so it is erased at emit and does not create a runtime cycle with iconRegistry.
export type IconKey = LibraryIconKey | (string & {});
export type IconProps = {
  icon: IconKey;
  isNum?: boolean;
  size?: SizeProp | NumSize;
  spin?: string;
  color?: string;
  label?: string;
  name?: string;
  hideHints?: boolean;
  theme?: string;
  layout?: string;
};
export interface ButtonProps {
  // optional
  // Called on click. Kept as an optional data string (not the DOM event) because internal
  // callers such as NavButton pass a payload through it; widening to the event would break them.
  onClick?: (data?: string) => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  theme?: string;
  // className merges with the computed theme/btn-main class rather than replacing it,
  // so consumers can extend styling without losing the base button styles.
  className?: string;
  // type defaults to "button"; pass "submit" to use Button inside a form.
  type?: "button" | "submit" | "reset";
  id?: string;
  style?: React.CSSProperties;
  isDisable?: boolean;
  // isDisabled is the canonical spelling used by the form components; accepted here as
  // an alias of isDisable so the whole library can converge on one name without a breaking rename.
  isDisabled?: boolean;
  hideIcon?: boolean;
  draggable?: boolean;
  icon?: IconKey;
  confirmSubmit?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLButtonElement>) => void;
  // onDragStart?: (event: React.DragEventHandler<HTMLButtonElement>) => void;
  title?: string;
  // Added: callers (e.g. nexious-client's CardHeader/CloseHeader) pass aria-label="Close"
  // directly on <Button>. Without this field, TypeScript would reject it and the
  // attribute would be silently dropped at runtime since Button doesn't spread props.
  "aria-label"?: string;
  toggleLabel?: string;
  label?: string;
  activeTheme?: string;
  ping?: number;
  name?: string;
  data?: string;
  body?: string;
  active?: CardinalDirectionProps;
}
export interface IconButtonProps {
  // all of button props
  name?: string;
  title?: string;
  theme?: string;
  isDisable?: boolean;
  // alias of isDisable (see ButtonProps); lets callers use the canonical spelling.
  isDisabled?: boolean;
  isBurger?: boolean;
  label?: string;
  // Accessible name for icon-only buttons. Without it a button whose only content is an
  // icon has no name for screen readers; the component falls back to title/label/name.
  "aria-label"?: string;
  // Disclosure wiring for buttons that toggle a panel (e.g. HintButton).
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  // notification count
  ping?: number;
  // icon props
  icon?: IconProps;
  // optional onclick event handler
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export interface BurgerButtonProps {
  isBurger?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // notification count
  ping?: number;
  // id of the navigation region this button shows/hides. Rendered as aria-controls only
  // when provided, so the reference never dangles (it previously hardcoded a non-existent
  // "primary-navigation" id). Header wires this to the mobile nav it toggles.
  controls?: string;
}
export interface CopyToClipboardProps {
  heading?: string;
  label?: string;
  labelLayout?: string;
  theme?: string;
  data: string;
  isCopy?: boolean;
}
