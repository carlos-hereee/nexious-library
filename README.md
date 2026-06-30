# nexious-library

> React component library powering [companyuno.com](https://www.companyuno.com)

[![npm version](https://img.shields.io/npm/v/nexious-library)](https://www.npmjs.com/package/nexious-library)
[![license](https://img.shields.io/npm/l/nexious-library)](./LICENSE)

A TypeScript-first React component library with built-in Calendar, Form, Navigation, Checkout, and more — designed for business apps.

---

## Install

```bash
npm i nexious-library
```

## Setup

Import the stylesheet once in your app entry file:

```ts
import "nexious-library/@index.css";
```

To re-skin the components or enable dark mode, override the CSS custom properties after this
import — see [Theming](#theming).

> **ESM only.** This package ships ES modules (no CommonJS build). Use it from a bundler (Vite, webpack 5, esbuild) or from Node with ESM enabled.

---

## Quick Start

```tsx
import { Button, Form, Icon, IconButton, Loading } from "nexious-library";

// Button
<Button label="Get started" onClick={() => {}} />

// Icon (see icon list below)
<Icon icon="heart" name="Like" />

// IconButton — always pass a title for accessibility
<IconButton icon={{ icon: "edit" }} title="Edit item" onClick={() => {}} />

// Loading state
<Loading />

// Form (see Form Usage below; there is no `name` prop)
<Form
  initialValues={{ email: "", message: "" }}
  labels={{ email: "Email", message: "Message" }}
  schema={{ required: ["email"] }}
  onSubmit={(values) => console.log(values)}
/>
```

---

## Components

| Component        | Description                                     |
| ---------------- | ----------------------------------------------- |
| `Header`         | App header with navigation, logo, and user menu |
| `Footer`         | App footer                                      |
| `Calendar`       | Full calendar with event support                |
| `CalendarEvents` | Displays a list of calendar events              |
| `Form`           | Dynamic form builder from field config          |
| `PaginateForm`   | Multi-step paginated form                       |
| `Dialog`         | Dialog panel shell (close button, optional header, body). Use inside your own overlay, or pass `asModal` for focus-trap + Escape |
| `DialogOverlay`  | Complete drop-in modal: portal + dimmed backdrop + body scroll-lock around `Dialog asModal` (click backdrop or Escape to close) |
| `ItemDetail`     | Labeled detail row                              |
| `Socials`        | Social media links row                          |
| `Button`         | Primary button                                  |
| `ButtonCancel`   | Cancel/destructive button                       |
| `IconButton`     | Icon-only button with accessible `title` prop   |
| `CopyButton`     | Copy-to-clipboard button                        |
| `HintButton`     | Info/hint popover button                        |
| `Icon`           | FontAwesome icon wrapper                        |
| `Hero`           | Image/hero display with lazy loading            |
| `Spinner`        | Animated loading spinner                        |
| `Loading`        | Full loading state component                    |
| `PageNotFound`   | 404 fallback page                               |
| `Bubbly`         | Decorative bubble background                    |
| `Rating`         | Star rating display                             |
| `Navigation`     | Horizontal/vertical nav from menu config        |
| `NavBar`         | App navigation bar                              |
| `SectionList`    | Sectioned content list                          |
| `HeroCard`       | Card with hero image                            |
| `CardTextBubble` | Card with text bubble overlay                   |
| `UserCard`       | User profile card                               |
| `MerchCard`      | Product/merch card                              |
| `Card`           | Generic card container                          |
| `Banner`         | Announcement banner                             |
| `PaymentMethods` | Payment method icons row                        |
| `Total`          | Order total display                             |
| `Cart`           | Shopping cart list                              |
| `Select`         | Styled select dropdown                          |
| `ReadMore`       | Expandable text block                           |
| `HeaderContent`  | Header text content block                       |

---

## Form Usage

```tsx
<Form
  initialValues={{ email: "", message: "" }}
  onSubmit={(values) => handleSubmit(values)}
  labels={{ email: "Your email", message: "Your message" }}
  schema={{ required: ["email"] }}
/>
```

The form is built from `initialValues`: each key becomes a field, and `types` selects the
input (text, `number`, `select`, `textarea`, `checkbox`, `file`, `date`, `date-time`, ...).

**Key props:**

| Prop            | Type                                   | Description                                              |
| --------------- | -------------------------------------- | ------------------------------------------------------- |
| `initialValues` | `{ [key: string]: FormInitialValue }`  | **Required.** Field keys + initial values (drives the fields). Returning `null` here renders an error |
| `onSubmit`      | `(values) => void`                     | Submit handler. Receives `formatFormData(values)` (a record), or `FormData` when `withFileUpload` is set |
| `types`         | `{ [key: string]: string }`            | Per-field input type (`select`, `textarea`, `checkbox`, `file`, `date`, `date-time`, ...). Defaults to text |
| `labels`        | `{ [key: string]: string }`            | Custom field labels                                     |
| `placeholders`  | `{ [key: string]: string }`            | Custom placeholders                                     |
| `schema`        | `{ required?, unique?, match?, count?, strictCheckbox? }` | Validation. `required: string[]`; `match: { name, value }[]`; `count: { [name]: { min, max } }` |
| `dataList`      | `{ [key: string]: SelectOption[] }`    | Options for `select` / `datalist` fields                |
| `withFileUpload`| `boolean`                              | Submit as `multipart/form-data`; `onSubmit` then receives `FormData`                                |
| `onViewPreview` | `(values) => void`                     | Wires a preview action (the eye icon); fires on a valid form                                        |
| `onCancel`      | `() => void`                           | Renders a cancel button                                 |
| `formId`        | `string`                               | Optional `<form>` id                                    |
| `heading`       | `string`                               | Form title                                              |
| `submitLabel`   | `string`                               | Custom submit button text                               |
| `disableForm`   | `boolean`                              | Disables submit; the submit control is also auto-disabled while an async `onSubmit` is in flight    |

> The submit control is disabled while an async `onSubmit` resolves, so a double-click cannot
> double-submit. `onSubmit` may be sync or return a promise.

For richer forms (multi-step, repeatable entry groups) see `PaginateForm` and the `addEntry`
prop. The validation/state logic is also exposed as the `useFormValidation` and `useValues`
hooks if you want to build a custom form UI.

---

## Calendar Usage

```tsx
<Calendar
  value={new Date()}
  onDayClick={(date) => console.log(date)}
  events={[{ date: "2025-06-15", list: [...] }]}
/>
```

---

## Icon System

Icons resolve through a pluggable registry. Pass an icon name string to `Icon` or
`IconButton` via the `icon` prop. An unregistered key renders a small error icon, so
check `getRegisteredIconKeys()` if a glyph is missing.

### Built in (work out of the box, zero setup)

The core ships a dependency free SVG set seeded into the registry by default:

`close` `cancel` `cross` `x` `check` `checkMark` `submit` `confirm` `reply` `comment` `heart` `star` `copy` `eye` `eyeSlash` `secure` `lock` `hint` `info` `loading` `spinner` `circle` `dot` `uncheck` `palette` `thinking` `refresh` `chevronDown` `arrowUp` `top` `arrowDown` `left` `leftArrow` `prev` `back` `goBack` `right` `next` `first` `last` `minus` `plus` `burger` `logout` `signOut` `bell` `bellSlash` `today` `hands` `book` `home` `edit` `cog`

Digits `0`–`9` (and the words `zero`–`nine`) also resolve.

### Extended set (FontAwesome, opt in)

Social, payment, and domain glyphs (`facebook`, `instagram`, `linkedin`, `github`,
`tiktok`, `twitter`, `discord`, `visa`, `mastercard`, `paypal`, `cashapp`, plus app
domain icons) live in the optional FontAwesome adapter. Install the FontAwesome peers,
then register the set once at app boot:

```ts
// main.tsx / app entry, called once before render
import { registerFontawesomeIcons } from "nexious-library/fontawesome-icons";

registerFontawesomeIcons();
```

You can also supply your own set with `registerIcons({ myIcon: MyIconComponent })`.

---

## Utilities

```ts
import { uniqueId, combineArraysWithOutDups, objToArray, capFirstCharacter, urlFile } from "nexious-library";
```

---

## Peer Dependencies

```json
"react": ">=18.0.0",
"react-dom": ">=18.0.0"
```

FontAwesome is an **optional** peer dependency. It is only needed if you use icon-based components (`Icon`, `IconButton`, and anything built on them). Install it when you do:

```bash
npm i @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
```

---

## Theming

The library is styled with CSS custom properties defined in `:root` (shipped in the
stylesheet). Override any of them **after** importing `@index.css` to re-skin the components —
this re-skins both the token-driven styles and the SCSS-driven ones (buttons, nav, cards),
which now resolve through the same tokens.

```css
/* your app's CSS, loaded after nexious-library/@index.css */
:root {
  --main-brand-color: #6d28d9;
  --radius-medium: 10px;
  --space-medium: 1.25rem;
}
```

**Core tokens:**

| Token | Default | Purpose |
| --- | --- | --- |
| `--main-brand-color` | `#484b6a` | Brand / primary |
| `--surface` | `#ffffff` | Card & panel background |
| `--text` | `#2c3e50` | Body text |
| `--border` | `#dddddd` | Dividers / outlines |
| `--danger-accent-color` | `crimson` | Destructive / error |
| `--success-accent-color` / `--text-success-color` | `#2e7d46` | Success (AA on white) |
| `--pending-accent-color` | `#eaab4c` | Pending / warning |
| `--space-extra-small … --space-large` | `0.25rem … 2rem` | Spacing scale |
| `--radius-small / -medium / -extra-large / -full` | `5px / 7px / 15px / 9999px` | Corner radii |
| `--shadow-small / -medium / -large` | — | Elevation |

### Dark mode

Apply the `dark-mode` class (or `data-theme="dark"`) to a container; the tokens flip for that
subtree and every token-driven descendant re-themes:

```tsx
<div className="dark-mode">{/* app */}</div>
// or: <html data-theme="dark">
```

> Dark mode is being completed surface-by-surface. The token-driven components re-theme today;
> a few legacy surfaces still use hardcoded light values and are being migrated.

---

## Security

User- or consumer-supplied URLs are a stored-XSS vector: React escapes link **text** but not a
URL **scheme**, so a stored `href` of `javascript:alert(...)` is one click from executing in
every consuming app. The library defends against this with `safeUrl()` (also exported from the
root), which allowlists `http`/`https`/`mailto`/`tel` (plus relative/anchor URLs) and collapses
anything else (`javascript:`, `data:`, `vbscript:`, including control-char obfuscation) to `#`.
Every built-in anchor (`Post`, `PostDetail`, `Navlink`, `ListItem`, `Footer`, `Hyperlink`,
`UnsplashCredit`) already routes its `href` through it.

**Rule:** if you build your own anchor from external or user data, wrap the URL:

```tsx
import { safeUrl } from "nexious-library";

<a href={safeUrl(userSuppliedUrl)} rel="noopener noreferrer">…</a>;
```

---

## Dev diagnostics

In development the library logs warnings for misuse (missing required props, unregistered icon
keys) and renders a small inline error in place of a broken component. These are gated on
`process.env.NODE_ENV !== "production"` and are stripped in production builds. Some Vite setups
do not replace `process.env.NODE_ENV` inside library code; if you do not see the warnings in
dev, add a define so they activate:

```ts
// vite.config.ts
export default defineConfig(({ mode }) => ({
  define: { "process.env.NODE_ENV": JSON.stringify(mode) },
}));
```

---

## Documentation

Full docs at [www.companyuno.com](https://www.companyuno.com)

---

## License

MIT © [carlos-hereee](https://github.com/carlos-hereee)
