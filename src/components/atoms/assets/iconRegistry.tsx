import type { FC } from "react";
import type { SizeProp, NumSize } from "nxs-button";
import { builtinIcons } from "./builtinIcons";

// Render-time props the library passes to every icon. A registered icon is just a
// component that accepts these and returns whatever it likes (SVG, <img>, emoji, an
// <FontAwesomeIcon>). size accepts BOTH library unions because IconProps.size is
// `SizeProp | NumSize`; built-ins fall back to 1em for an unknown token. label is
// carried through for a11y (the current Icon accepts a `label` prop).
export interface IconRenderProps {
  size?: SizeProp | NumSize;
  spin?: "spin" | "pulse" | false;
  color?: string; // defaults to currentColor when unset
  className?: string; // library-built class string, rendered as-is
  label?: string; // optional accessible name
}
export type IconComponent = FC<IconRenderProps>;
export type IconRegistry = Record<string, IconComponent>;

// Module-level registry seeded with the built-in defaults so library components render
// standalone with no consumer setup. Matches the library's existing global side-effect
// style (the old Assets.tsx `library.add`) — no provider to mount. A consumer calls
// registerIcons once at boot to override/extend by key.
let registry: IconRegistry = { ...builtinIcons };

/** Merge icons into the registry; consumer keys override built-ins. Call once at app boot. */
export function registerIcons(icons: IconRegistry): void {
  registry = { ...registry, ...icons };
}
export function getIconRenderer(key: string): IconComponent | undefined {
  return registry[key];
}
/** The keys currently registered. Useful for a dev "missing icon" audit. */
export function getRegisteredIconKeys(): string[] {
  return Object.keys(registry);
}

// The keys the library's OWN components render. A consumer supplying a fully custom set
// must cover these for the library to render without error icons (story-only keys such
// as cog/bell/edit are not required for the components themselves to function).
export const LIBRARY_REQUIRED_ICON_KEYS = [
  "first",
  "left",
  "right",
  "last",
  "close",
  "heart",
  "comment",
  "spinner",
  "refresh",
  "loading",
  "cancel",
  "thinking",
  "submit",
  "hint",
  "leftArrow",
  "dot",
  "star",
  "home",
  "palette",
  "chevronDown",
  "checkMark",
  "arrowUp",
  "arrowDown",
] as const;
export type LibraryIconKey = (typeof LIBRARY_REQUIRED_ICON_KEYS)[number];
