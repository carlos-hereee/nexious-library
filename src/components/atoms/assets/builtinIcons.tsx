import type { AriaRole, FC, ReactNode } from "react";
import type { IconComponent, IconRegistry, IconRenderProps } from "./iconRegistry";

// Dependency-free default icon set. Seeds the registry so the library's own
// components (and Storybook stories) render standalone with zero consumer setup.
// A consumer that registers another set (e.g. the fontawesome adapter) overrides
// these by key; nothing here imports an icon library.

// Map the library's size tokens (SizeProp | NumSize) to an em dimension. Unknown
// tokens fall back to 1em so a bad size never collapses the glyph to nothing.
const SIZE_EM: Record<string, string> = {
  "2xs": "0.625em",
  xs: "0.75em",
  sm: "0.875em",
  lg: "1.25em",
  xl: "1.5em",
  "2xl": "2em",
  "1x": "1em",
  "2x": "2em",
  "3x": "3em",
  "4x": "4em",
  "5x": "5em",
  "6x": "6em",
  "7x": "7em",
  "8x": "8em",
  "9x": "9em",
  "10x": "10em",
};
const toEm = (size?: IconRenderProps["size"]): string => (size ? SIZE_EM[size] ?? "1em" : "1em");

// Compose the className the library hands us with the spin/pulse animation hook.
// The .icon-spin/.icon-pulse keyframes live in the library stylesheet (_icons.scss).
const composeClass = (className?: string, spin?: IconRenderProps["spin"]): string | undefined => {
  const classes = `${className ?? ""}${spin ? ` icon-${spin}` : ""}`.trim();
  return classes || undefined;
};

// a11y: when a label is passed the SVG is a named image; otherwise it is decorative
// and hidden from the accessibility tree (the surrounding button/text carries meaning).
const a11y = (label?: string): { role?: AriaRole; "aria-label"?: string; "aria-hidden"?: true } =>
  label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

// Build a stroked (outline) or filled icon component from its inner shapes. Most
// glyphs are outline-style; pass filled for solid shapes (heart, star, dot, ellipsis).
const svgIcon = (children: ReactNode, filled = false): IconComponent => {
  const Component: FC<IconRenderProps> = ({ size, color, className, spin, label }) => {
    const dimension = toEm(size);
    return (
      <svg
        className={composeClass(className, spin)}
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill={filled ? color ?? "currentColor" : "none"}
        stroke={filled ? "none" : color ?? "currentColor"}
        strokeWidth={filled ? undefined : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...a11y(label)}
      >
        {children}
      </svg>
    );
  };
  return Component;
};

// Digits render as centered text so IconButton's numeric splitting ("12" -> "1","2")
// resolves each character to a registry entry without a bespoke glyph per number.
const digitIcon = (digit: string): IconComponent => {
  const Component: FC<IconRenderProps> = ({ size, color, className, spin, label }) => {
    const dimension = toEm(size);
    return (
      <svg
        className={composeClass(className, spin)}
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        {...a11y(label)}
      >
        <text x="12" y="18" textAnchor="middle" fontSize="20" fontWeight="700" fill={color ?? "currentColor"}>
          {digit}
        </text>
      </svg>
    );
  };
  return Component;
};

// ── Distinct glyphs ───────────────────────────────────────────────────────────
const Close = svgIcon(<path d="M18 6 6 18M6 6l12 12" />);
const Check = svgIcon(<path d="M20 6 9 17l-5-5" />);
const Send = svgIcon(
  <>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </>
);
const Reply = svgIcon(
  <>
    <path d="M9 17 4 12l5-5" />
    <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
  </>
);
const Comment = svgIcon(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />);
const Heart = svgIcon(
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
  true
);
const Star = svgIcon(
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  true
);
const Copy = svgIcon(
  <>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </>
);
const Eye = svgIcon(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
const EyeSlash = svgIcon(
  <>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68" />
    <path d="M6.6 6.6A13.6 13.6 0 0 0 2 12s3.5 7 10 7a9.1 9.1 0 0 0 5.4-1.6" />
    <path d="m2 2 20 20" />
  </>
);
const Lock = svgIcon(
  <>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </>
);
const Hint = svgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </>
);
const Info = svgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </>
);
const Notch = svgIcon(<path d="M21 12a9 9 0 1 1-6.22-8.56" />);
const Dot = svgIcon(<circle cx="12" cy="12" r="5" />, true);
const Ring = svgIcon(<circle cx="12" cy="12" r="9" />);
const Palette = svgIcon(
  <>
    <path d="M12 2C6.5 2 2 6 2 11c0 3 2.5 5 5.5 5H9a2 2 0 0 1 2 2 2 2 0 0 0 2 2c5 0 9-4 9-9 0-5-4.5-9-10-9Z" />
    <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
  </>
);
const Ellipsis = svgIcon(
  <>
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </>,
  true
);
const Refresh = svgIcon(
  <>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </>
);
const ChevronDown = svgIcon(<path d="m6 9 6 6 6-6" />);
const ArrowUp = svgIcon(
  <>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </>
);
const ArrowDown = svgIcon(
  <>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </>
);
const ArrowLeft = svgIcon(
  <>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </>
);
const ArrowRight = svgIcon(
  <>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </>
);
const CircleChevronLeft = svgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m14 16-4-4 4-4" />
  </>
);
const CircleChevronRight = svgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m10 8 4 4-4 4" />
  </>
);
const Minus = svgIcon(<path d="M5 12h14" />);
const Plus = svgIcon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>
);
const Burger = svgIcon(
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </>
);
const Logout = svgIcon(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </>
);
const Bell = svgIcon(
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>
);
const BellSlash = svgIcon(
  <>
    <path d="M8.7 3A6 6 0 0 1 18 8c0 2.5.5 4.3 1.2 5.6" />
    <path d="M6 8c0 7-3 9-3 9h13" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    <path d="m2 2 20 20" />
  </>
);
const Calendar = svgIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
    <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
  </>
);
const Hand = svgIcon(
  <>
    <path d="M18 11V6a2 2 0 0 0-4 0v5" />
    <path d="M14 10V4a2 2 0 0 0-4 0v6" />
    <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 13" />
  </>
);
const Book = svgIcon(
  <>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  </>
);
const Home = svgIcon(
  <>
    <path d="m3 10 9-7 9 7" />
    <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
    <path d="M9 21v-7h6v7" />
  </>
);
const Pencil = svgIcon(
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </>
);
const Cog = svgIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 3.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H8a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V8a1.65 1.65 0 0 0 1.51 1H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </>
);

// Digit aliases so both numeric ("0".."9") and word ("zero".."nine") keys resolve.
const DIGIT_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const digitEntries: IconRegistry = {};
DIGIT_WORDS.forEach((word, value) => {
  const glyph = digitIcon(String(value));
  digitEntries[String(value)] = glyph;
  digitEntries[word] = glyph;
});

export const builtinIcons: IconRegistry = {
  // close / dismiss synonyms
  close: Close,
  cancel: Close,
  cross: Close,
  x: Close,
  // confirm / check synonyms
  check: Check,
  checkMark: Check,
  // send synonyms
  submit: Send,
  confirm: Send,
  reply: Reply,
  comment: Comment,
  heart: Heart,
  star: Star,
  copy: Copy,
  eye: Eye,
  eyeSlash: EyeSlash,
  secure: Lock,
  lock: Lock,
  hint: Hint,
  info: Info,
  // spinner synonyms (animate via spin="spin")
  loading: Notch,
  spinner: Notch,
  circle: Notch,
  dot: Dot,
  uncheck: Ring,
  palette: Palette,
  thinking: Ellipsis,
  refresh: Refresh,
  chevronDown: ChevronDown,
  arrowUp: ArrowUp,
  top: ArrowUp,
  arrowDown: ArrowDown,
  // left synonyms
  left: ArrowLeft,
  leftArrow: ArrowLeft,
  prev: ArrowLeft,
  back: ArrowLeft,
  goBack: ArrowLeft,
  // right synonyms
  right: ArrowRight,
  next: ArrowRight,
  first: CircleChevronLeft,
  last: CircleChevronRight,
  minus: Minus,
  plus: Plus,
  burger: Burger,
  logout: Logout,
  signOut: Logout,
  bell: Bell,
  bellSlash: BellSlash,
  today: Calendar,
  hands: Hand,
  book: Book,
  home: Home,
  edit: Pencil,
  cog: Cog,
  ...digitEntries,
};
