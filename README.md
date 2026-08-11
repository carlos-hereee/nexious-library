# nexious-library

> The React component library that powers [companyuno.com](https://www.companyuno.com). Fewer tools, one design language.

[![npm version](https://img.shields.io/npm/v/nexious-library)](https://www.npmjs.com/package/nexious-library)
[![types](https://img.shields.io/npm/types/nexious-library)](https://www.npmjs.com/package/nexious-library)
[![license](https://img.shields.io/npm/l/nexious-library)](./LICENSE)

A TypeScript-first React component library with a built-in **Calendar**, a schema-driven **Form** engine, **Navigation**, **Checkout**, and a pluggable **icon** system. It ships accessible, themeable primitives (buttons, dialogs, cards) alongside the larger composed surfaces (a `Header`/`Footer` app shell, a full month calendar, a cart), so one dependency covers the whole design language instead of four.

## 📖 Documentation

**Full, searchable documentation lives at [companyuno.com/docs](https://www.companyuno.com/docs).**

Every component, hook, and utility is documented there with props, defaults, live examples, accessibility notes, and the exact import path. This README is the quick tour; the docs are the reference.

---

## Features

- **TypeScript first.** Every component ships prop types, and the root entry re-exports them so you can type your own wrappers.
- **Accessible by default.** Focus traps, `aria` wiring, keyboard patterns (listbox, disclosure, stepper), and link-name safety are built in.
- **Themeable with CSS variables.** Re-skin everything, dark mode included, by overriding custom properties after one stylesheet import. No theme provider, no build step.
- **Zero-config icons.** A dependency-free SVG set is seeded by default. Opt into the FontAwesome adapter or register your own set for the rest.
- **Secure links.** Every built-in anchor routes its `href` through `safeUrl()`, which neutralizes `javascript:` and other stored-XSS vectors.
- **Tree-shakeable.** Import the popular components from the root, or reach for the atomic subpath entries (`@nxs-atoms`, `@nxs-molecules`, `@nxs-organism`) when you want the bundler to drop the rest.

---

## Install

```bash
npm i nexious-library
```

React 18+ is a required peer dependency. FontAwesome is optional (only for the extended icon adapter).

## Setup

Import the stylesheet once in your app entry:

```ts
import "nexious-library/@index.css";
```

> **ESM only.** This package ships ES modules (no CommonJS build). Use it from a modern bundler (Vite, webpack 5, esbuild) or from Node with ESM enabled.

---

## Quick Start

```tsx
import { Button, Form, Icon, IconButton, Loading } from "nexious-library";

// Button
<Button label="Get started" onClick={() => {}} />

// Icon (see the icon list in the docs)
<Icon icon="heart" label="Like" />

// IconButton (always pass a title for accessibility)
<IconButton icon={{ icon: "edit" }} title="Edit item" onClick={() => {}} />

// Loading state
<Loading message="Fetching…" />

// Form (built from initialValues; there is no `name` prop)
<Form
  initialValues={{ email: "", message: "" }}
  labels={{ email: "Email", message: "Message" }}
  schema={{ required: ["email"] }}
  onSubmit={(values) => console.log(values)}
/>
```

### TypeScript

Prop types are re-exported from the root, so you can type wrappers without reaching into subpaths:

```tsx
import { Button, type ButtonProps } from "nexious-library";

const PrimaryButton = (props: ButtonProps) => <Button variant="primary" {...props} />;
```

---

## Import paths

The most-used components are on the package root. The fuller set is organized by atomic layer on subpath entries, which keeps the root light and lets bundlers tree-shake:

| Entry | Holds |
| --- | --- |
| `nexious-library` | Popular components (Button, Form, Calendar, Dialog, Card, Header, …), all hooks, all string/currency utils, the icon registry |
| `nexious-library/@nxs-atoms` | Leaf primitives (Input, Label, Heading, Hyperlink, …) |
| `nexious-library/@nxs-molecules` | Composed inputs and rows (Select, Field, Post, ListItem, …) |
| `nexious-library/@nxs-organism` | Larger units (PostDetail, CalendarView, FormNavigation, …) |
| `nexious-library/@nxs-math` | `add`, `multiply`, `subtract` |
| `nexious-library/fontawesome-icons` | The optional FontAwesome icon adapter |
| `nexious-library/@index.css` | The stylesheet |

The docs list the exact entry for every export.

---

## Components

A selection of what ships. The [documentation](https://www.companyuno.com/docs) has the full catalog with props and examples.

| Component | Description |
| --- | --- |
| `Header` / `Footer` | App shell with navigation, logo, and user menu |
| `Calendar` / `CalendarEvents` | Full month calendar with events, and an agenda panel |
| `Form` / `PaginateForm` | Schema-driven form engine, and its multi-step variant |
| `Dialog` / `DialogOverlay` | A dialog shell, and a complete drop-in modal (portal, backdrop, scroll-lock) |
| `Button` / `IconButton` / `ButtonCancel` | The button family |
| `Select` / `Input` / `TextArea` / `UploadFile` | Form controls |
| `Card` / `HeroCard` / `MerchCard` / `UserCard` | Cards |
| `Cart` / `Total` / `PaymentMethods` | Checkout |
| `Navigation` / `NavBar` / `Socials` | Navigation |
| `Post` / `PostDetail` | Feed and detail views |
| `Loading` / `PageNotFound` / `Banner` / `CountDown` | Feedback and status |
| `Icon` / `Hero` / `Spinner` / `CopyButton` | Assets and utilities |

---

## Variants, sizes, and migrating from `theme`

4.0.0 removed the free-form `theme` prop from every component, with no shim. `theme` was two props
welded together: measured across both repos before the change, roughly 85 percent of its call sites
passed a layout hook (`entry-rail-thumb`, `select-icon`) or the consuming app's own design-system
classes, and only about a dozen passed something that was genuinely a variant.

**For most call sites the migration is a rename.** `theme="X"` becomes `className="X"`, verbatim,
multi-class strings included:

```diff
-<Button theme="cu-btn cu-btn-primary" label="Save" />
+<Button className="cu-btn cu-btn-primary" label="Save" />
```

The sites that meant a variant get the typed API instead. `variant` and `size` are string unions, so
a typo is a compile error rather than a silently unstyled control.

| `variant` | Classes rendered | At rest |
| --- | --- | --- |
| `primary` | `btn-base btn-primary` | `--main-brand-color` fill and border, hover moves to `--main-brand-hover-color` |
| `secondary` | `btn-base btn-secondary` | `--surface` fill, `--border` hairline, `--text` label. A neutral, deliberately not a second brand hue |
| `tertiary` | `btn-base btn-tertiary` | transparent, `--main-brand-color` label, hover tints with `--brand-wash` |
| `danger` | `btn-base btn-danger` | `--danger-accent-color` fill, `--status-on-accent` label, hover deepens to `--danger-text` |
| `ghost` | `btn-base btn-ghost` | transparent with a `--border` hairline, hover gains `--surface` plus `--elevation-1` |

| `size` | Class | Height | Font |
| --- | --- | --- | --- |
| `small` | `btn-sm` | `--control-height-small` (28px) | `--text-extra-small` |
| `medium` | `btn-md` | `--control-height` (36px) | `--text-small` |
| `large` | `btn-lg` | `--control-height-large` (44px) | `--text-base` |

`btn-md` is identical to the base and exists so a caller can state the size rather than rely on an
omission to mean medium. All four classes carry `min-height: var(--tap-target-min)` (44px) at base
width for WCAG 2.5.5, and each drops back to its own control height above the mobile breakpoint,
because a 44px control at desktop density makes a dense toolbar unusable.

**A `<Button>` with no `variant`, no `size` and no `className` renders no `class` attribute at all.**
That is deliberate, and it is what makes the migration pixel neutral: `theme` REPLACED the base class
rather than appending to it, so a default variant would have slid a library class underneath the
app-owned classes at every one of those sites and started a specificity fight. `className` is joined
LAST, after the variant and size classes, so an equal-specificity rule of yours wins on source order
without `!important`.

**Button width is owned by the container, never by the button.** The library reset ships
`button { width: 100%; max-width: 250px }`, which `.btn-base` reclaims with `width: auto;
max-width: none`. Wrap a row of buttons in `.nxs-button-group` (flex, wrapping, `--space-small` gap,
and it neutralizes width on its children) and reach for `.nxs-button-group-stretch` when they should
share the row equally.

`Button` is the component that resolves `variant` and `size` into classes. The other button
components take `className` only. If you want to target the same hooks from your own CSS rather than
retype the strings, `VARIANT_CLASS`, `SIZE_CLASS` and `buildControlClass` are exported from the root
alongside the `Variant`, `Size` and `Density` types.

---

## Form usage

The form is built from `initialValues`: each key becomes a field, and `types` selects the input (`text`, `number`, `select`, `textarea`, `checkbox`, `file`, `date`, `date-time`, …).

```tsx
<Form
  initialValues={{ email: "", plan: "", message: "" }}
  types={{ plan: "select", message: "textarea" }}
  labels={{ email: "Your email", plan: "Plan", message: "Your message" }}
  dataList={{ plan: [{ name: "plan", label: "Pro", value: "pro" }] }}
  schema={{ required: ["email", "plan"] }}
  onSubmit={(values) => handleSubmit(values)}
/>
```

The submit control disables itself while an async `onSubmit` resolves, so a double-click cannot double-submit. For richer forms (multi-step, repeatable entry groups) see `PaginateForm`, and the `useFormValidation` / `useValues` hooks if you want to build a custom form UI. Full guide: [Forms](https://www.companyuno.com/docs/forms).

## Calendar usage

```tsx
<Calendar
  value={new Date()}
  onDayClick={(date) => console.log(date)}
  events={[{ date: "2026-06-15", eventId: "e1", details: "Launch day" }]}
/>
```

## Icon system

Icons resolve through a pluggable registry. Pass a name string to `Icon` or `IconButton`. A dependency-free SVG set is seeded by default (`close`, `check`, `heart`, `star`, `copy`, `edit`, `home`, arrows, digits, and more). For social, payment, and domain glyphs, install the FontAwesome peers and register the adapter once at boot:

```ts
import { registerFontawesomeIcons } from "nexious-library/fontawesome-icons";

registerFontawesomeIcons();
```

You can also supply your own set with `registerIcons({ myIcon: MyIconComponent })`. Full list and details: [Icon System](https://www.companyuno.com/docs/icons).

---

## Theming

Every color, size, radius, shadow and duration in the library resolves from a CSS custom property
declared in `:root`. No theme provider, no build step: import `@index.css` once, then redeclare
whatever you want to change **after** that import. The token layer below is the entire re-skin
surface, which makes this table the API for it.

```css
/* your own stylesheet, loaded after nexious-library/@index.css */
:root {
  --main-brand-color: #6d28d9;
  --radius-large: 14px;
  --space-large: 1.25rem;
}
```

**Three things to know before you override anything.**

1. **The defaults below only reach the standalone and Storybook cases.** A consuming app whose own
   variables load after the library import wins every shared token on source order, so overriding is
   the normal path rather than an escape hatch. The trap runs the other way: redeclaring a token with
   a *different* value silently changes what a library rule MEANS, not just how it looks. Setting
   `--space-large` back to 2rem does not merely loosen your own layout, it re-spaces every library
   surface that asked for "one step up".
2. **The radius scale is concentric by design.** Dialog 16, card and panel 12, row and button and
   dropdown 8, input and chip and badge 4, with pills and avatars at `--radius-full`. A child is
   exactly one step smaller than its parent, so overriding one step in isolation breaks the nesting
   everywhere it appears. Move the whole scale or none of it.
3. **A surface gets a border OR a shadow at rest, never both.** Light mode reads depth from
   `--elevation-1`; dark drops the shadow and states a `--border` hairline instead, because a shadow
   barely registers on navy. If you re-skin the surfaces, keep that pairing, or every card in the
   product gains weight at once.

### Brand

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--main-brand-color` | `#4f46e5` | unchanged | The primary action color. Brand fills, brand text and the focus ring all derive from it |
| `--main-brand-hover-color` | `#4338ca` | unchanged | Hover state of a brand fill |
| `--main-brand-color-accent` | `#818cf8` | unchanged | The lighter brand, used where the base indigo fails contrast on navy |
| `--brand-wash` | `color-mix(in srgb, var(--main-brand-color) 6%, transparent)` | `color-mix(in srgb, var(--main-brand-color-accent) 16%, transparent)` | Selected-row tint and subtle brand backgrounds. Derived rather than pinned, so it tracks an overridden brand |

### Surfaces and text

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--bg` | `#f9fafb` | `#0b1120` | Page background |
| `--surface` | `#ffffff` | `#111c2e` | Panel and sheet fill |
| `--card-bg` | `#ffffff` | `#111c2e` | Card fill |
| `--border` | `#dddddd` | `#1e293b` | Hairline dividers and rest borders |
| `--input-bg` | `#ffffff` | `#111c2e` | Field fill |
| `--input-border` | `#cbd5e1` | `#334155` | Field border |
| `--text` | `#2c3e50` | `#f8fafc` | Body text |
| `--text-secondary` | `#4b5563` | `#94a3b8` | Quieter prose: captions, detail lines |
| `--text-muted` | `#6b7280` | `#64748b` | Quieter still: timestamps, metadata |
| `--hover-bg` | `rgba(15, 23, 42, 0.04)` | `rgba(255, 255, 255, 0.06)` | The neutral row and cell hover tint. A lift on dark needs more alpha than a darken on light to read as the same step |
| `--scrim` | `rgba(15, 23, 42, 0.45)` | `rgba(0, 0, 0, 0.6)` | Modal backdrop. Plain black on dark, because a slate-tinted scrim over navy reads as haze |
| `--table-header-bg` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.09)` | Table header fill |
| `--table-stripe-bg` | `rgba(0, 0, 0, 0.04)` | `rgba(255, 255, 255, 0.06)` | Zebra stripe |
| `--table-row-hover-bg` | `rgba(0, 0, 0, 0.12)` | `rgba(255, 255, 255, 0.12)` | Row hover |

The three table tokens are translucent rather than opaque on purpose: a table composites over
whatever sits beneath it (page, card, panel, dialog), and an opaque fill would have to assume that
surface is white.

### Neutral ramp

Not reassigned on dark. These are the intentional gray steps, so a library rule never reaches for an
ad-hoc literal. `--skeleton-bg` reads `--slate-200` in light mode.

| Token | Value |
| --- | --- |
| `--slate-900` | `#0f172a` |
| `--slate-700` | `#334155` |
| `--slate-600` | `#475569` |
| `--slate-500` | `#6b7280` |
| `--slate-300` | `#cbd5e1` |
| `--slate-200` | `#e2e8f0` |
| `--slate-50` | `#f9fafb` |

### Type scale

Not reassigned on dark.

| Token | Value | Role |
| --- | --- | --- |
| `--text-extra-small` | `0.75rem` | Overlines, badges, the small button size |
| `--text-small` | `0.875rem` | Field labels, the default button size |
| `--text-base` | `1rem` | Body |
| `--text-large` | `1.125rem` | Lead paragraphs |
| `--text-extra-large` | `1.25rem` | Card and panel titles |
| `--text-2x-large` | `1.5rem` | Section headings |
| `--text-3x-large` | `1.875rem` | Page headings |
| `--line-height-tight` | `1.2` | Headings and controls |
| `--line-height-base` | `1.5` | Prose |
| `--tracking-overline` | `0.06em` | The one eyebrow and field-label tracking, so the two cannot drift apart by a hundredth of an em |
| `--font-normal` | `400` | Body weight |
| `--font-medium` | `500` | Emphasis inside prose |
| `--font-semibold` | `600` | Titles, buttons, overlines |
| `--font-bold` | `700` | Page headings |

### Spacing

Not reassigned on dark. Controls take their interior rhythm from the same scale, so a form's
insides and the layout around it march to one grid.

| Token | Value | Role |
| --- | --- | --- |
| `--space-extra-small` | `0.25rem` | Icon to label |
| `--space-small` | `0.5rem` | Inside a control, between chips |
| `--space-medium-small` | `0.75rem` | Tight row gaps |
| `--space-medium` | `1rem` | The default gap between siblings |
| `--space-large` | `1.5rem` | Card and panel padding |
| `--space-extra-large` | `2rem` | Between grouped blocks |
| `--space-section` | `3rem` | Between sections of a page |
| `--space-page` | `4rem` | Page top and bottom |

### Radii

Not reassigned on dark. See point 2 above: the steps are concentric, not decorative.

| Token | Value | Role |
| --- | --- | --- |
| `--radius-small` | `4px` | Inputs, chips, badges, skeleton bars |
| `--radius-medium` | `8px` | Rows, buttons, dropdowns |
| `--radius-large` | `12px` | Cards and panels |
| `--radius-extra-large` | `16px` | Dialogs and modals |
| `--radius-full` | `9999px` | Pills, avatars, status dots |

### Elevation

The `--elevation-*` tokens are aliases that name the ladder by ROLE, so a rule can say what a
surface is instead of which blur radius it wanted. Dark deepens every shadow, because the same
values disappear against a dark page.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--shadow-small` | `0 1px 2px rgba(0, 0, 0, 0.05)` | `0 1px 2px rgba(0, 0, 0, 0.5)` | Raw value behind `--elevation-1` |
| `--shadow-medium` | `0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)` | `0 4px 10px rgba(0, 0, 0, 0.55)` | Raw value behind `--elevation-2` |
| `--shadow-large` | `0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)` | `0 12px 30px rgba(0, 0, 0, 0.6)` | Raw value behind `--elevation-3` |
| `--elevation-1` | `var(--shadow-small)` | follows | Cards and panels at rest |
| `--elevation-2` | `var(--shadow-medium)` | follows | Dropdowns and popovers |
| `--elevation-3` | `var(--shadow-large)` | follows | Modals and dialogs |

### Motion

Not reassigned on dark. Three named speeds, so a component picks a role rather than a number.

| Token | Value | Role |
| --- | --- | --- |
| `--transition-fast` | `150ms ease` | Hover, focus, color changes |
| `--transition-base` | `200ms ease` | Enter and exit, expand and collapse |
| `--transition-slow` | `300ms ease` | Overlays and dialogs |

### Status accents

Not reassigned on dark: each is paired with a text color chosen for contrast against it, so the
pair has to move together or not at all.

| Token | Value | Role |
| --- | --- | --- |
| `--danger-accent-color` | `crimson` | Destructive fill |
| `--pending-accent-color` | `#eaab4c` | Pending badge fill |
| `--success-accent-color` | `#2e7d46` | Success badge fill |
| `--complete-accent-color` | `#2e7d46` | Completed badge fill, read by `.status-complete` |
| `--status-on-accent` | `#ffffff` | Label placed on the success, complete and danger fills (about 5.1:1 on the green) |
| `--status-on-pending` | `#2c3e50` | Label placed on the amber pending fill (about 5.5:1) |
| `--primary-text-light-mode-color` | `#2c3e50` | Dark label for placement on a light fill |
| `--primary-text-dark-mode-color` | `#f8fafc` | Light label for placement on a brand fill |

### Status surfaces

Each status ships a background, a border and a text color as a set, so a badge or a banner can be
built from tokens alone and inherits dark correctness for free.

| Token | Light | Dark |
| --- | --- | --- |
| `--success-bg` / `--success-border` / `--success-text` | `#dcfce7` / `#86efac` / `#15803d` | `#052e1a` / `#14532d` / `#4ade80` |
| `--warn-bg` / `--warn-border` / `--warn-text` | `#fef3c7` / `#f59e0b` / `#92400e` | `#78350f` / `#f59e0b` / `#fde68a` |
| `--danger-bg` / `--danger-border` / `--danger-text` | `#fef2f2` / `#fca5a5` / `#b91c1c` | `#450a0a` / `#991b1b` / `#fca5a5` |
| `--info-bg` / `--info-border` / `--info-text` | `#dbeafe` / `#93c5fd` / `#1e40af` | `#1e3a5f` / `#1d4ed8` / `#93c5fd` |
| `--text-success-color` | `var(--success-text)` | follows |

`--text-success-color` is an older name kept as an alias so the two can never disagree. Nothing
inside the library reads it.

### Loading placeholders

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--skeleton-bg` | `var(--slate-200)` | `rgba(255, 255, 255, 0.08)` | The resting fill of a placeholder bar |
| `--skeleton-shimmer` | `rgba(255, 255, 255, 0.65)` | `rgba(255, 255, 255, 0.16)` | The lighter band that sweeps across it |
| `--skeleton-duration` | `1200ms` | unchanged | One sweep. Long enough to read as deliberate, short enough that a slow request still shows motion |

A skeleton is two colors rather than one because the sweep is a background gradient over the resting
fill, not an opacity pulse. Both drop to low-alpha white on dark: a solid slate bar with a white
sweep would make the loudest thing on a navy page the part with nothing in it yet.

### List rows

Not reassigned on dark. Both clear the 44px tap floor by construction, which is the point of naming
them: a "compact" row someone sets to 36px because it looked tighter is a WCAG 2.5.5 failure that no
visual review catches.

| Token | Value | Role |
| --- | --- | --- |
| `--row-height` | `52px` | Comfortable density, the default |
| `--row-height-dense` | `44px` | Compact density |

### Stacking

Not reassigned on dark. Named steps, so two layered surfaces can never fight over an improvised
`z-index`.

| Token | Value |
| --- | --- |
| `--z-base` | `0` |
| `--z-raised` | `10` |
| `--z-sticky` | `100` |
| `--z-dropdown` | `1000` |
| `--z-overlay` | `2000` |
| `--z-toast` | `3000` |
| `--z-command` | `4000` |

### Sizing

| Token | Value | Role |
| --- | --- | --- |
| `--max-card-width` | `600px` | The width a card stops growing at |

### Control

The shared geometry of every interactive element, declared separately from the palette because it is
the library's own system rather than the design language's scale. It is why a text input, a select
and a submit button in one row share a top and bottom edge by construction instead of by someone
measuring.

| Token | Value | Role |
| --- | --- | --- |
| `--control-height-small` | `28px` | Dense rows and toolbars |
| `--control-height` | `36px` | The default, comfortable at desktop density |
| `--control-height-large` | `44px` | Large controls. The same number as the tap floor, which is not a coincidence |
| `--control-padding-y-small` / `--control-padding-x-small` | `4px` / `8px` | Small control interior |
| `--control-padding-y` / `--control-padding-x` | `8px` / `12px` | Default control interior |
| `--control-padding-y-large` / `--control-padding-x-large` | `12px` / `16px` | Large control interior |
| `--control-radius-input` | `var(--radius-small)` | Inputs read as fields cut into a surface |
| `--control-radius-button` | `var(--radius-medium)` | Buttons read as objects sitting on it |
| `--focus-ring-width` | `2px` | Ring thickness |
| `--focus-ring-offset` | `2px` | Gap between the control and its ring |
| `--focus-ring-color` | `var(--main-brand-color)`, and `var(--main-brand-color-accent)` on dark | The base indigo fails contrast against navy, so the ring is the one focus token that flips |
| `--focus-ring` | `var(--focus-ring-width) solid var(--focus-ring-color)` | A shorthand for the `outline` shorthand, so width and style cannot get out of sync |
| `--tap-target-min` | `44px` | WCAG 2.5.5 target size, applied at mobile width |

### The focus ring and reduced motion

Two behaviors are implemented as SCSS mixins rather than tokens, so you cannot call them, but you
will see their output on every surface and you can steer both from the token layer.

**The focus ring** is included on every interactive selector in the library and renders as
`:focus-visible { outline: var(--focus-ring); outline-offset: var(--focus-ring-offset) }`. Two
choices in that line are load bearing. `:focus-visible` rather than `:focus`, so the ring shows for
keyboard and assistive-tech users without firing on every mouse click. `outline` rather than
`box-shadow`, so it can neither shift layout nor be clipped by an ancestor's `overflow`. Tune it with
the `--focus-ring-*` tokens; removing it without replacing it is a WCAG 2.4.7 failure.

**Reduced motion** is honored globally. Under `prefers-reduced-motion: reduce` the library zeroes
transition durations, clamps animations to a single 1ms iteration, and strips `transform` from
`:hover`, `:focus`, `:focus-visible` and `:active`, so a hover lift degrades to a color change rather
than to an instant positional jump. The strip is scoped to those pseudo-classes on purpose, because
plenty of transforms are layout rather than motion and killing those would break a component instead
of calming it. Anything that animates outside an interaction state carries its own override: the
skeleton shimmer drops its gradient and rests on the flat `--skeleton-bg`, since the global switch
shortens an animation to 1ms rather than removing it, which would make the sweep strobe.

### Dark mode

Apply the `dark-mode` class (or `data-theme="dark"`) to any container. Both selectors REASSIGN the
token layer for that subtree, and custom properties cascade, so every token-driven descendant
re-themes with no per-component work:

```tsx
<div className="dark-mode">{/* app */}</div>
```

What deliberately does not flip: `--main-brand-hover-color` and `--main-brand-color-accent` keep
their light values, because a consumer that declares that pair should not be repainted by a
library-only decision. The neutral ramp, type scale, spacing, radii, motion, status accents, list
rows, stacking and sizing groups do not flip either, since none of them is a value whose meaning
changes when the background does.

More examples and the live swatches: [Theming](https://www.companyuno.com/docs/theming).

---

## Security

User- or consumer-supplied URLs are a stored-XSS vector: React escapes link text but not a URL scheme, so a stored `href` of `javascript:alert(...)` is one click from executing. The library defends with `safeUrl()` (exported from the root), which allowlists `http`/`https`/`mailto`/`tel` (plus relative and anchor URLs) and collapses anything else to `#`. Every built-in anchor already uses it. If you build your own anchor from external data, wrap the URL:

```tsx
import { safeUrl } from "nexious-library";

<a href={safeUrl(userSuppliedUrl)} rel="noopener noreferrer">…</a>;
```

---

## Architecture

The source follows atomic design: `atoms` (leaf primitives), `molecules` (composed inputs and rows), `organism` (larger units), and `template` (full surfaces like `Header`, `Form`, `Calendar`). Those layers map to the subpath entries above. Styles are authored in SCSS and compiled to a single stylesheet driven by CSS custom properties, so a consumer re-themes without touching the components.

## Accessibility

`Dialog asModal` traps focus and closes on Escape; `ThemeMenu` implements the WAI-ARIA listbox pattern; form fields wire `aria-invalid` / `aria-describedby`; and every built-in anchor is link-name and scheme safe. You are responsible for giving icon-only buttons a `title` or `aria-label`, and images meaningful `alt` text. See [Accessibility](https://www.companyuno.com/docs/accessibility).

## Dev diagnostics

Call a component wrong and it renders a teaching panel in place of itself, instead of failing
silently or throwing. It is styled as a terminal, deliberately: a build-time diagnostic should
never be mistakable for real UI, and it means the panel and the `console.warn` render from one
report with the same leading lines, so the two can never drift.

```
● ● ●  nexious-library · dev only
<Hero> is missing a required prop: hero

received   undefined
expected   AssetProps  { url?: string; alt?: string; small?: string }

▾ How Hero works
  ...summary, any other required props, a copy-pasteable example, common causes
companyuno.com/docs/hero →
```

`received` and `expected` are always visible, collapsed or not, so a panel answers the question
before you click anything. The detail below carries how the component works, a working call you
can copy, and the mistakes that usually cause that error. The docs link is last, there if the
panel was not enough.

**When several panels render at once**, the first on the page expands and the rest collapse to
their headline plus that received/expected pair. Five broken components give you five readable
diagnoses instead of five walls of prose. Any panel can be toggled open.

**These panels are development only.** Visibility resolves from three sources, most specific first:

```tsx
// ① per call, on any component that can render a panel
<Hero hero={hero} isDev={false} />

// ② app wide, once at boot. This is the recommended setup.
import { setDevMode } from "nexious-library";
setDevMode(import.meta.env.DEV);

// ③ inherited default: process.env.NODE_ENV !== "production"
```

Prefer ② over relying on ③. A bare Vite app does not reliably replace `process.env.NODE_ENV`
inside pre-bundled library code, so without an explicit setting the panels can be missing in
development or, worse, visible in production. `import.meta.env.DEV` IS replaced correctly in
your own build, so handing it to `setDevMode` is the one line that makes the gate deterministic.

Adding a panel to a component you are writing: describe it in `src/utils/data/componentSpecs.ts`
(summary, required prop shapes, working example, common causes, docs slug), then render
`<ErrorMessage error={{ code, prop, value, component }} isDev={isDev} />` from the guard clause.
A component with no spec still gets a headline, the received value, and a docs-home link.

## Known limitations

- **ESM only.** There is no CommonJS build.
- **Client rendering.** Components target the browser. `DialogOverlay` is SSR safe (renders nothing without `document`), but most components use browser APIs and should be treated as client components under a framework like Next.js. See [SSR](https://www.companyuno.com/docs/ssr).
- **Dark mode is completing surface by surface.** Token-driven components re-theme today; a few legacy surfaces still carry light values and are being migrated. The remaining ones are the explicit paint utilities in `styles/theme` (`.bg-light`, `.bg-dark`, `.bg-light-alt`, `.alt-dark-mode`, `.active`), which are compiled literals with no dark counterpart. A consumer cannot recover from those from the outside, because they are class selectors and a class beats an inherited color.
- **There is no Table component.** The table parts under `components/*/table/` (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableColumn`, `CellData`, `CellTitle`, `Column`, `TableCaption`) are commented out of every barrel pending their prop types, so none of them is importable from any entry. What is reachable is the element-level styling: write your own `<table>` and the reset paints it from the token layer (header fill, zebra stripe, row hover, and a header that pins when the table sits in a `.table-scroll` box).
- **`Loading` still defaults to a spinner.** Skeletons are opt in: pass `skeleton="row" | "text" | "block" | "page"`, with `skeletonCount` for the number of bars. The default stayed a spinner deliberately, because `Loading` is rendered on dozens of consumer surfaces this repo cannot see and flipping it would repaint every one of them as a side effect of a CSS refactor. `Skeleton` and `EmptyState` are also exported directly if you want to place them yourself.
- **`.panel` and `.section` are CSS only.** Both ship as complete class systems (`.panel` with `.panel-header` / `.panel-title` / `.panel-actions` / `.panel-body` and a `.panel-danger` variant, and `.section` with `.section-row` / `.section-card`), but no library component renders them yet. Apply them to your own markup.
- **`IconButton` accepts `variant` and `size` and ignores them.** Both are declared on `IconButtonProps`, so they compile, but the component renders `btn-icon` plus your `className` regardless. `Button` is the only component that resolves the variant system today.

---

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/carlos-hereee/nexious-library). Common scripts:

```bash
npm run build        # clean + compile TS and SCSS
npm test             # jest
npm run lint         # eslint
npm run storybook    # component workbench
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

## Support

- 📖 Docs: [companyuno.com/docs](https://www.companyuno.com/docs)
- 🐛 Issues: [github.com/carlos-hereee/nexious-library/issues](https://github.com/carlos-hereee/nexious-library/issues)
- 📦 npm: [npmjs.com/package/nexious-library](https://www.npmjs.com/package/nexious-library)

## License

MIT © [carlos-hereee](https://github.com/carlos-hereee)
