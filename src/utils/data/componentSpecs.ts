import type { ComponentSpec, ComponentSpecMap } from "nxs-errors";

// ── Component teaching specs ─────────────────────────────────────────────────
// WHAT: the copy a dev-mode error panel renders when a component is called wrong.
// WHY IT LIVES HERE: the goal of an error is to END the interruption, not redirect it.
// A message that says "check that all required props are passed" costs the reader a trip
// to the docs or the source; a message that names the shape, shows a working call, and
// lists the two mistakes that actually cause this costs them nothing. The docs link is
// the LAST line on purpose — it is the escape hatch, not the answer.
// WHO READS IT: consumers of the npm package, in their own dev build, mid-render.
//
// ACCURACY RULE: every `type` and `shape` below is copied from the real prop type in
// src/@types (HeroProps, IconProps, NavigationProps, ...). A spec that drifts from the
// type is worse than no spec, because it is confidently wrong. When a prop type changes,
// change its spec in the same commit.
//
// `docsSlug` resolves against DOCS_BASE_URL. Slugs are the kebab-case component name and
// are verified against the live catalog in nexious-client/src/features/docs/content/catalog.

/** Public docs home for the package. Matches package.json `homepage`. */
export const DOCS_BASE_URL = "https://www.companyuno.com/docs";

export const COMPONENT_SPECS: ComponentSpecMap = {
  Hero: {
    docsSlug: "hero",
    summary:
      "Renders an image with a blur-up placeholder and an optional Unsplash credit. Everything it draws comes from the single `hero` object.",
    importStatement: 'import { Hero } from "nexious-library";',
    props: [
      {
        name: "hero",
        type: "AssetProps",
        required: true,
        shape: "{ url?: string; alt?: string; small?: string; creditTo?: UnplashAsset }",
        description:
          "The asset to render. `url` is the full-size image. `alt` is the accessible description. `small` is an optional low-res thumbnail used for the blur-up; omit it and Hero skips the placeholder rather than requesting a broken URL.",
      },
    ],
    example: '<Hero hero={{ url: "/banner.jpg", alt: "storefront at dusk" }} theme="hero-banner" />',
    fixes: [
      "Passing a bare URL string? Hero takes an object, not a string: hero={{ url, alt }}.",
      "Asset still loading? Hero has no loading state. Render <Loading /> until the data resolves, or Hero mounts with an undefined prop.",
      "Sizing looks wrong? The base .hero class sets width: 100%, so a theme must cap its own width. Pass theme= a class that sets one.",
    ],
  },
  Icon: {
    docsSlug: "icon",
    summary:
      "Draws one icon by key. Keys resolve through the pluggable icon registry, so the set is whatever the app registered at boot, NOT a fixed list.",
    importStatement: 'import { Icon } from "nexious-library";',
    props: [
      {
        name: "icon",
        type: "IconKey (string)",
        required: true,
        shape: '"close" | "check" | ... | (any key you registered)',
        description:
          "The registry key to render. Autocomplete suggests the built-in keys, but any string compiles because consumers register their own.",
      },
    ],
    example: '<Icon icon="check" size="lg" label="Saved" />',
    fixes: [
      "Never called registerIcons? Nothing resolves. Register a set once at app boot: registerIcons(myIcons), or registerFontawesomeIcons() from nexious-library/fontawesome-icons.",
      "Key registered but still missing? Registry keys are case-sensitive and exact.",
      "Want silence instead of this panel for an optional icon? Pass hideHints and Icon renders nothing.",
    ],
  },
  IconButton: {
    docsSlug: "icon-button",
    summary:
      "A button whose visible content is one icon, with an optional text label and notification ping. The icon config is nested one level deep.",
    importStatement: 'import { IconButton } from "nexious-library";',
    props: [
      {
        name: "icon",
        type: "IconProps",
        required: true,
        shape: "{ icon: string; label?: string; name?: string; size?: SizeProp; color?: string; isNum?: boolean }",
        description:
          "The icon config object. Note the nesting: the KEY lives at icon.icon. `label` renders as visible text beside the glyph and doubles as the accessible name.",
      },
    ],
    example: '<IconButton icon={{ icon: "trash", label: "Delete" }} onClick={remove} theme="btn-icon" />',
    fixes: [
      'Wrote icon="trash"? IconButton nests it: icon={{ icon: "trash" }}. The flat string form is <Icon>, not <IconButton>.',
      "Icon-only button? Pass aria-label (or icon.label/title) or a screen reader announces nothing.",
      "No icons resolving anywhere? The registry is empty. Call registerIcons once at boot.",
    ],
  },
  NavButton: {
    docsSlug: "nav-button",
    summary:
      "One entry in a nav list. Renders a plain <li> when given no onClick, a Button when given one, and an IconButton when given both an icon and an onClick.",
    importStatement: 'import { NavButton } from "nexious-library/@nxs-atoms";',
    props: [
      {
        name: "data",
        type: "string",
        required: true,
        shape: '"dashboard"',
        description:
          "The entry's value. It is both the visible text (unless `label` overrides it) and the payload handed to onClick.",
      },
    ],
    example: '<NavButton data="dashboard" label="Dashboard" icon="grid" onClick={go} />',
    fixes: [
      "Passing an object? `data` is a plain string. Map your menu items to their value first.",
      "Want different text than the payload? Keep data as the value and pass label for the visible text.",
    ],
  },
  Navigation: {
    docsSlug: "navigation",
    summary: "Renders a list of nav entries. Accepts either plain strings or full menu objects, but not a mix.",
    importStatement: 'import { Navigation } from "nexious-library";',
    props: [
      {
        name: "menus",
        type: "string[] | MenuProp[]",
        required: true,
        shape: '["home", "about"]  OR  [{ name, label?, value?, icon?, link? }]',
        description:
          "The entries to render. Strings are the quick form. Objects unlock per-entry icons, labels, and links; `name` is the only required field on one.",
      },
    ],
    example: '<Navigation menus={["home", "about"]} active="home" onClick={go} />',
    fixes: [
      "Menus fetched from an API? An empty array counts as missing here. Render <Loading /> until it fills.",
      "Passing an object map? Convert it to an array first: objToArray(menuMap).",
    ],
  },
  UserCard: {
    docsSlug: "user-card",
    summary: "A compact identity card: avatar, name, and contact rows. Every field is read off the one `user` object.",
    importStatement: 'import { UserCard } from "nexious-library";',
    props: [
      {
        name: "user",
        type: "UserProps",
        required: true,
        shape: "{ name?, nickname?, username?, email?, phone?, address?, hero?, uid?, userId? }",
        description:
          "The person to render. Every field is optional, so a partial user renders fine; the card only fails when the object itself is absent. `hero` is an avatar URL string here, not an asset object.",
      },
    ],
    example: '<UserCard user={{ name: "Ada Lovelace", email: "ada@example.com" }} />',
    fixes: [
      "Spreading fields directly (name=, email=)? UserCard takes one object: user={{ name, email }}.",
      "Auth context not hydrated yet? user is undefined on first render. Guard with user && <UserCard .../>.",
    ],
  },
  HeaderContent: {
    docsSlug: "header-content",
    summary: "Renders a heading block: title, tagline, subtitle, description. All four come from the `data` object.",
    importStatement: 'import { HeaderContent } from "nexious-library";',
    props: [
      {
        name: "data",
        type: "DataContent",
        required: true,
        shape: "{ title?, tagline?, subtitle?, description?, details? }",
        description:
          "The copy to render. Every field is optional and an absent one renders nothing, so pass whichever subset you have.",
      },
    ],
    example: '<HeaderContent data={{ title: "Pricing", tagline: "One platform, one login." }} />',
    fixes: [
      "Passing a bare string? Wrap it: data={{ title: myString }}.",
      "An empty object {} also trips this. Give it at least one populated field.",
    ],
  },
  CalendarEventList: {
    docsSlug: "calendar-events",
    summary: "Renders one selectable button per calendar event, highlighting whichever matches the `event` prop.",
    importStatement: 'import { CalendarEvents } from "nexious-library";',
    props: [
      {
        name: "events",
        type: "ICalEvent[]",
        required: true,
        shape: "[{ uid, eventId, name, date, details, startTime, endTime, isOpen, attendees }]",
        description:
          "The events to list. `uid` is the React key and the identity used to match the highlighted `event`, so it must be unique and stable.",
      },
    ],
    example: "<CalendarEvents events={events} event={selected} onEventClick={setSelected} />",
    fixes: [
      "No events yet? An empty array trips this. Render <EmptySection /> for a genuinely empty day instead of handing it an empty list.",
      "Nothing highlights? The `event` prop is matched by uid, not by object identity. Pass the item from this same array.",
    ],
  },
  Form: {
    docsSlug: "form",
    summary:
      "Builds a whole form from data. Each key in `initialValues` becomes one field, in key order, and `types` decides which control that key renders.",
    importStatement: 'import { Form } from "nexious-library";',
    props: [
      {
        name: "initialValues",
        type: "Record<string, FormInitialValue>",
        required: true,
        shape: "{ email: '', quantity: 1, agree: false }   // File | Blob | string | number | boolean",
        description:
          "The single source of the field set. Keys define which fields exist and their order; values seed them. There is no separate `fields` prop, so an empty object renders an empty form.",
      },
    ],
    example: `<Form
  initialValues={{ email: "", password: "" }}
  types={{ password: "password" }}
  labels={{ email: "Email", password: "Password" }}
  onSubmit={handleSubmit}
/>`,
    fixes: [
      "Passing an array of field configs? Form is key-driven: convert to an object keyed by field name.",
      "Values arrive async? Form seeds state on mount, so a later object is ignored. Hold the render until the data lands, or remount with key={dataVersion}.",
      "Field renders as a plain text box? Its `types` entry is missing or unrecognized. Any unlisted value falls back to text.",
    ],
  },
  Header: {
    docsSlug: "header",
    summary:
      "The full site header: logo, nav, theme menu, language switch, and burger menu. Nav content comes from `menu`.",
    importStatement: 'import { Header } from "nexious-library";',
    props: [
      {
        name: "menu",
        type: "MenuProp[]",
        required: true,
        shape: "[{ name: string; link?: string; icon?: string; active?: MenuItemProp; alternatives?: MenuItemProp[] }]",
        description:
          "Top-level nav entries. `name` is the only required field. `active` plus `alternatives` turn one entry into a dropdown.",
      },
      {
        name: "updateMenu",
        type: "(e: MenuProp) => void",
        required: true,
        shape: "(entry) => navigate(entry.link)",
        description: "Fires with the clicked entry. This is how the header hands navigation back to your router.",
      },
    ],
    example: '<Header menu={[{ name: "home", link: "/" }]} updateMenu={(e) => navigate(e.link)} logo={logo} />',
    fixes: [
      "Menu built from a route config? Map it to MenuProp objects first; raw route records will not have `name`.",
      "An empty array counts as missing. Render the header only once the menu is built.",
    ],
  },
  PaginateForm: {
    docsSlug: "paginate-form",
    summary:
      "A multi-step Form. Each entry in `paginate` is a whole Form config for one page, with its own validation gate before Continue advances.",
    importStatement: 'import { PaginateForm } from "nexious-library";',
    props: [
      {
        name: "paginate",
        type: "FormProps[]",
        required: true,
        shape: "[{ initialValues, labels?, types?, placeholders?, heading?, onSubmit? }]",
        description:
          "One Form config per step, in display order. Each carries its own initialValues, so a step with no fields renders an empty page. A step's own onSubmit, when present, wins over the parent's.",
      },
    ],
    example: "<PaginateForm paginate={steps} onFormSubmit={handleSubmit} />",
    fixes: [
      "Only have one step? Use <Form /> instead. Splitting a short form makes it feel longer, not shorter.",
      "Answers lost on Back? State lives in PaginateForm, so do not remount it between steps (no changing key).",
    ],
  },
  ErrorMessages: {
    docsSlug: "error-messages",
    summary: "Renders a list of ErrorMessage panels. Used internally by components that validate several props at once.",
    importStatement: 'import { ErrorMessages } from "nexious-library/@nxs-molecules";',
    props: [
      {
        name: "errors",
        type: "ErrorMessageProp[]",
        required: true,
        shape: "[{ name, prop, code, isAProp, value? }]",
        description: "The errors to render, normally the `errors` array returned by the useRequiredProps hook.",
      },
    ],
    example: '<ErrorMessages errors={errors} component="MyComponent" />',
    fixes: [
      "Pass `component` too, or each panel has no component name to show and the message gets vaguer.",
      "Building the array by hand? Prefer useRequiredProps(props), which produces the right shape and re-checks on change.",
    ],
  },
};

/**
 * Look up a spec by component name, tolerating the casing drift in existing call sites
 * ("header" and "error messages" are both passed today where "Header"/"ErrorMessages" is meant).
 * Returns undefined for an unknown component so the panel degrades to its generic form.
 */
export const getComponentSpec = (component?: string): ComponentSpec | undefined => {
  if (!component) return undefined;
  if (COMPONENT_SPECS[component]) return COMPONENT_SPECS[component];
  const normalized = component.replace(/[\s_-]/g, "").toLowerCase();
  const match = Object.keys(COMPONENT_SPECS).find((key) => key.toLowerCase() === normalized);
  return match ? COMPONENT_SPECS[match] : undefined;
};

/** Docs URL for a component, falling back to the docs home when the component has no page yet. */
export const getDocsUrl = (component?: string): string => {
  const spec = getComponentSpec(component);
  return spec ? `${DOCS_BASE_URL}/${spec.docsSlug}` : DOCS_BASE_URL;
};
