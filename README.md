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

// Form
<Form
  name="contact"
  initialValues={{ email: "", message: "" }}
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
| `Dialog`         | Modal dialog wrapper                            |
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

**Key props:**

| Prop            | Type                        | Description                         |
| --------------- | --------------------------- | ----------------------------------- |
| `initialValues` | `{ [key: string]: any }`    | Required. Initial field values      |
| `onSubmit`      | `(values) => void`          | Submit handler (a no-op form errors otherwise) |
| `formId`        | `string`                    | Optional. Sets the `<form>` id      |
| `labels`        | `{ [key: string]: string }` | Custom field labels                 |
| `placeholders`  | `{ [key: string]: string }` | Custom placeholders                 |
| `schema`        | `{ required: string[] }`    | Validation schema                   |
| `heading`       | `string`                    | Form title                          |
| `submitLabel`   | `string`                    | Custom submit button text           |

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

## Documentation

Full docs at [www.companyuno.com](https://www.companyuno.com)

---

## License

MIT © [carlos-hereee](https://github.com/carlos-hereee)
