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

const PrimaryButton = (props: ButtonProps) => <Button theme="btn-primary" {...props} />;
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

The library is styled with CSS custom properties defined in `:root`. Override any of them **after** importing `@index.css` to re-skin the components:

```css
:root {
  --main-brand-color: #6d28d9;
  --radius-medium: 10px;
  --space-medium: 1.25rem;
}
```

### Dark mode

Apply the `dark-mode` class (or `data-theme="dark"`) to a container; the tokens flip for that subtree:

```tsx
<div className="dark-mode">{/* app */}</div>
```

Full token reference: [Theming](https://www.companyuno.com/docs/theming).

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
- **Dark mode is completing surface by surface.** Token-driven components re-theme today; a few legacy surfaces still carry light values and are being migrated.

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
