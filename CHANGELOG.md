# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### UI rework Phase 1: token and primitive foundation

Phase 1 of `roadmaps/specs/nexious-library-ui-rework-master-plan-2026-08-09.md`, executed under
FUTURE_PLANS items 50 (lanes 2, 3, 7, 9) and 51. **Token values and new tokens only. No `.tsx`
file was touched, and no component rule changed except the one noted under Changed.**

Why the values moved: this library and `nexious-client` share token NAMES but disagreed on
VALUES for `--space-large`, `--text-large` and the radius scale. Because the client imports
`nexious-library/@index.css` before its own `vars.css`, a shared name with a different value
means the client silently changes what a library token MEANS, not just how it looks. Those
three collisions are now resolved in the library's favour of the design language.

#### Added

- **Type scale**: `--text-extra-small` (12px), `--text-base` (16px), `--text-extra-large` (20px),
  `--text-2x-large` (24px), `--text-3x-large` (30px), plus `--line-height-tight`,
  `--line-height-base`, `--tracking-overline`, and `--font-normal` / `--font-medium` /
  `--font-semibold` / `--font-bold`.
- **Spacing**: `--space-extra-large` (2rem), `--space-section` (3rem), `--space-page` (4rem).
- **Radius**: `--radius-large` (12px), which was simply missing, so cards and panels had no
  radius to reach for and drifted to raw `10px` literals instead.
- **Motion**: `--transition-base` (200ms) and `--transition-slow` (300ms) beside the existing
  `--transition-fast`.
- **Surfaces**: `--bg`, `--card-bg`, `--input-bg`, `--input-border`, `--text-muted`,
  `--hover-bg`, `--scrim`, `--brand-wash`, and the brand shades `--main-brand-hover-color` and
  `--main-brand-color-accent`. `--brand-wash` is derived with `color-mix()` from the brand token
  rather than pinned as an rgba literal, so it tracks a consumer's brand override instead of
  desyncing from it.
- **Status surfaces**: `--success-bg` / `-border` / `-text`, and the same triple for `--warn-*`,
  `--danger-*` and `--info-*`, in both themes. The library previously had status ACCENTS with no
  paired background, which is why every status surface had to invent its own fill.
- **Elevation aliases** `--elevation-1` / `-2` / `-3` naming the ladder by role.
- **Neutral ramp** `--slate-900` / `-700` / `-600` / `-500` / `-300` / `-200` / `-50`. Nothing
  reads these yet; they exist so item 50 lane 2 has a scale to migrate the ad-hoc `$faded` /
  `$dim` / `$muted` literals onto.
- **Stacking scale**: `--z-base`, `--z-raised`, `--z-sticky`, `--z-dropdown`, `--z-overlay`,
  `--z-toast`, `--z-command`.
- **`vars/_control.scss`**, a new file holding the geometry that makes controls line up:
  `--control-height-small` / `--control-height` / `--control-height-large` (28 / 36 / 44px),
  `--control-padding-{x,y}` per size, `--control-radius-input` and `--control-radius-button`,
  `--focus-ring-width` / `-offset` / `-color` plus a `--focus-ring` shorthand, and
  `--tap-target-min`. Nothing includes these yet; Phase 2 rebuilds the Form family on them.
- **Three mixins** in `vars/mixin/_index.scss`: `focus-ring` (the library's one focus treatment,
  `:focus-visible` plus outline, promoted from the only correct existing implementation),
  `respond-from($breakpoint)` (the mobile-first min-width complement to `devices()`, added
  beside it rather than replacing it so partials can migrate one at a time), and
  `reduced-motion` (wraps content in the reduced-motion query so the media feature name is
  written in exactly one place; it has been misspelled here before).
- **`.stylelintrc.json` and a `lint:css` script**, mirroring `nexious-client`'s config, at
  **warning** severity. Baseline recorded 2026-08-09: **266 warnings, 0 errors** (244
  `declaration-property-value-allowed-list`, 22 `color-no-hex`). Phase 4 drives that to zero and
  flips the severity to error. `stylelint` and `postcss-scss` added as devDependencies.

#### Changed

- **`--space-large` 2rem to 1.5rem (32px to 24px)** and **`--text-large` 1.25rem to 1.125rem
  (20px to 18px)**, matching the design language. Neither is renamed, because renaming would
  break a consumer reading it. `nexious-client` already overrides both to the new values, so
  **production rendering is unchanged**; only the standalone and Storybook cases move.
- Radius scale corrected from the off-scale **5 / 7 / 15px to 4 / 8 / 16px**. The concentric
  nesting rule (a 12px card holds 8px rows holds 4px chips) does not work on an off-scale set.
  The client already overrides all three, so production is unchanged.
- Shadows and the dark navy ramp (`--surface`, `--card-bg`, `--border`, `--text`,
  `--text-secondary`) pinned to the client's values. Standalone dark previously used its own
  slate-blue set, which meant a Storybook dark review showed a palette the product never ships,
  and Storybook is the review surface for the rest of this rework. The client overrides every
  one of these, so production is unchanged.
- `--text-success-color` is now an alias for `--success-text` so the two cannot disagree. It has
  no readers inside this library and none in `nexious-client`.
- **`--main-brand-color` default moves from `#484b6a` to the design language's indigo `#4f46e5`**
  (owner decision on plan Q1). `nexious-client` overrides this token, so production is unchanged;
  what moves is the standalone and Storybook rendering, which is the point, since Storybook is
  the review surface for the rest of the rework.
- **`.countdown-timer` font size moves from `--text-large` to `--text-extra-large`.** This is the
  one component declaration that changes, and the one place a consumer will see a difference. It
  is the visual anchor of the banner and wanted the 20px step; under the client it had already
  been silently shrunk to 18px by the client's `--text-large` override, which is precisely the
  collision this phase removes.
- `.btn-lg` keeps `var(--space-large)` and `var(--text-large)`. Its declarations are textually
  unchanged but its resolved standalone values move from 32px/20px to 24px/18px. That was a
  per-site decision, not an oversight: 24px horizontal padding and an 18px label are correct for
  a large button, and it is what the client has always rendered. The class has zero call sites in
  `nexious-client`.

#### Accessibility

- The reduced-motion guard in `vars/reset/_index.scss` now also drops `transform` on `:hover`,
  `:focus`, `:focus-visible` and `:active`. Zeroing the transition duration stopped a hover lift
  from ANIMATING but not from HAPPENING, so a motion-sensitive user still got an instant
  positional jump. Scoped to the interaction pseudo-classes rather than `*` because plenty of
  transforms are layout, not motion.
- `--focus-ring-color` flips to the lighter brand accent in dark mode. The base brand fails
  contrast against a dark navy surface, and the per-component inlined outlines it replaces could
  never have flipped.

#### Verification

Compiled CSS diffed before and after (`sass src/stylesheets/index.scss`, expanded). Every changed
declaration is a token definition, plus the two rules named above and nothing else. Size 86,432
to 89,362 bytes, **+3.4%**, inside the 10% ceiling. `npm test` green, 122 tests across 15 suites.
The three new mixins were each compiled through a throwaway call site rather than assumed to
work, since an uninvoked Sass mixin body is parsed but never evaluated: `respond-from(tablet)`
emits `min-width: 770.02px`, `respond-from(mini)` emits `375.02px`.

> Note for anyone repeating that diff: `styles/theme/_bubbly.scss` calls `math.random()`, so
> `dist/css/index.css` is **not reproducible between builds** and a raw diff shows ~200 spurious
> changed declarations under `.bubble:nth-child(n)`. Filter that block out before reading a CSS
> diff, and see TECH_DEBT for the underlying issue.

## [3.3.9] - 2026-07-24

> **Should have been a MINOR bump** (it adds public API: `setDevMode`, `getDevMode`, root
> `ErrorMessage` / `ErrorMessages` exports, and an `isDev` prop on ~13 components). It shipped
> as a patch. The runtime surface is purely additive, nothing was removed.
>
> **One narrow type break.** `isAProp` is gone from `ErrorMessageProp` and `ErrorProp`. Because
> TypeScript only excess-property-checks OBJECT LITERALS, this breaks exactly one authoring
> pattern, an inline literal in the `errors` prop:
>
> ```diff
>   <ErrorMessages
>     component="Header"
> -   errors={[{ prop: "menu", code: "missingProps", name: "menu", isAProp: true }]}
> +   errors={[{ prop: "menu", code: "missingProps", name: "menu" }]}
>   />
> ```
>
> The same data through an intermediate variable compiles unchanged (verified against the
> published 3.3.9 types), and `ErrorMessageProp` is not exported from any entry point, so the
> inline literal above is the only way to reach it. Nothing read the flag, so deleting the key
> changes no rendered output. `component` is what names a component in the headline now.
>
> `useRequiredProps(props, isAProp)` also lost its second argument. The hook is not exported
> from any entry point, so only forks are affected.

### Added

- **Dev-mode error panels that teach the component instead of describing the failure.** Calling a
  component wrong now renders a terminal-styled panel naming the component and the prop, with a
  `received` / `expected` pair leading (always visible, collapsed or not) and a collapsible detail
  carrying how the component works, any other required props, a copy-pasteable working call with
  its import, the mistakes that usually cause that error, and a link to that component's own
  `/docs/<slug>` page as the last line. The terminal styling is deliberate: a build-time
  diagnostic should never be mistakable for real UI, and it lets the panel and the `console.warn`
  render from one report with the same leading lines so the two cannot drift. Component
  descriptions live in `utils/data/componentSpecs.ts`; a component with no spec still gets a
  headline, the received value, and a docs-home link
- When several panels render at once, the first on the page expands and the rest collapse to their
  headline plus the received/expected pair, so five broken components give five readable diagnoses
  rather than five walls of prose. Election is by render order, resolved in a layout effect before
  paint, so panels only ever open, never collapse out from under a reader mid-sentence
- `setDevMode(value?: boolean)` and `getDevMode()` (root entry) plus an `isDev?: boolean` prop on
  every component that can render a panel (`Hero`, `Icon`, `IconButton`, `NavButton`, `Navigation`,
  `UserCard`, `HeaderContent`, `CalendarEvents`, `Form`, `PaginateForm`, `Header`, `ErrorMessage`,
  `ErrorMessages`). Visibility resolves prop → `setDevMode()` → `process.env.NODE_ENV`. Call
  `setDevMode(import.meta.env.DEV)` once at boot: a bare Vite app does not reliably replace
  `process.env.NODE_ENV` inside pre-bundled library code, so the env probe alone could hide the
  panels in development or show them in production, both silently
- `ErrorMessage` and `ErrorMessages` are now exported from the root entry, alongside the
  `ErrorProp`, `ErrorCodes`, `ComponentSpec`, and `SpecProp` types

### Fixed

- `IconButton` rendered a bare `<p>Double check icon prop</p>` when `icon` was absent, bypassing
  the dev-mode gate entirely, so that string could reach production users. Both of its guard
  clauses now route through the gated panel
- `ErrorMessages` overwrote every error's `code` with `missingProps` (discarding a real code such
  as `iconNotFound`) and passed the error record itself as the received value, so the panel
  reported its own bookkeeping instead of the prop
- `useRequiredProps` ran its check once on mount (`[]` deps), so a corrected prop kept showing the
  stale error after a hot reload and the fix looked like it had not worked. It now re-derives when
  the set of missing props actually changes
- The dev panel no longer prints the PROP name inside angle brackets as though it were a component
  (`<hero> is missing a required prop`); it names the real component

### Removed

- **`isAProp` on `ErrorMessageProp` and `ErrorProp`, and the second `isAProp` argument to
  `useRequiredProps`.** The flag used to choose between rendering `<Component> prop "x"` and a bare
  `<x>`. The rebuild above replaced that guess with an explicit `component` field that every call
  site passes, so nothing read the flag any more while `useRequiredProps` kept writing it and the
  type kept demanding it. It is removed in the same release that made it dead rather than left to
  rot, because a required field that changes no output is a field every caller has to think about
  for no reason

### Migration notes

- Building an `errors` array by hand for `<ErrorMessages>`, or an `error` object for
  `<ErrorMessage>`? Delete the `isAProp` key. Passing it inline now fails the TypeScript
  excess-property check (`TS2353`). An array built as a separate variable first is unaffected and
  keeps compiling, so a silent leftover is possible; grep for `isAProp` to be sure
- Calling `useRequiredProps(props, true)`? Drop the second argument, it no longer exists
- To get the framing the flag used to imply, pass `component` on the error (or on
  `<ErrorMessages component="...">`), which is what actually drives the headline and the docs link
  now

- Published `dist` no longer ships dangling sourcemap references. The tarball excludes `*.map`
  to stay lean, but the emitted JS/CSS still carried `//# sourceMappingURL` / `/*# sourceMappingURL */`
  comments pointing at the excluded maps, so consumers (e.g. Vite) logged "Failed to load source
  map" for `index.css.map`. Sourcemap generation is now off for the build (`sourceMap` and
  `declarationMap` off, `sass --no-source-map`), so no references are emitted. (Introduced in 3.3.2.)

## [3.3.2] - 2026-06-30

> Shipped as a patch (the intended minor bump was run as `release:patch`); 3.3.1 was tagged
> but its publish failed, so 3.3.2 is the first npm release carrying this work. Despite the
> patch number it adds public API (DialogOverlay, new exports); future feature batches should
> bump the minor.

### Added

- `DialogOverlay` (`@nxs-template`, exported from the root): a complete, self-sufficient modal, `createPortal` to `document.body` + dimmed backdrop + body scroll-lock + click-outside-to-close, wrapping `Dialog` with `asModal`. `Dialog` itself stays a bare shell for consumers that own their modal shell
- The root entry now re-exports a prop type for every root-exported component (`DialogProps`, `DialogOverlayProps`, `CartProps`, `TotalProps`, `PaymentMethodsProps`, `CalendarPEventDays`, `ICalEvent`, `HeroProps`, `ErrorProps`, `IconProps`, `ItemDetailProps`, `BannerProps`, ...) plus the nested data types consumers construct (`PostData`, `PostAuthor`, `PostReaction`, `AssetProps`, `PEventDay`, `ThemeList`, `CTAProp`)
- `IconKey` (`LibraryIconKey | (string & {})`) types `IconProps.icon` / `ButtonProps.icon`: editors autocomplete the built-in icon keys while any registered string still compiles
- Dark-mode token layer: a `.dark-mode` / `[data-theme="dark"]` block reassigns `--surface` / `--border` / `--text` / `--text-success-color` / `--shadow-*`, so the theme switch re-themes every token-driven surface instead of leaving white cards on a dark page
- `BurgerButton` `controls` prop (renders `aria-controls` only when provided); `Header` wires it to the toggled mobile nav's `id`

### Accessibility

- `prefers-reduced-motion` is now honored, the global motion kill-switch had a typo'd media feature (`prefers-reduced-inputdirection`) and never matched, so animations always ran (WCAG 2.3.3)
- `Select` sets `aria-invalid` / `aria-describedby`; `Field` and `Select` render the `${name}-error` node even when the label is hidden, so `aria-describedby` no longer dangles (WCAG 1.3.1 / 4.1.2)
- `BurgerButton` `aria-controls` no longer references a non-existent id
- Perceivable `:focus-visible` outlines on `.btn-main` and the theme-menu options (were a faint border / background shift): WCAG 2.4.7
- `jest-axe` coverage extended to `Dialog` (asModal), `Select` (with and without a visible label), and `ThemeMenu` (open listbox)

### Changed

- Design tokens: the highest-traffic SCSS vars (`$dark-primary`, `$danger`, `$rem` / `$rem05` / `$rem025`, `$border-radius` / `-sm` / `-lg`) now alias the canonical `:root` custom properties, so overriding a token re-skins the SCSS-driven partials too (they were previously frozen compiled literals). Values are unchanged, so light mode renders identically
- `CancelDialog` opts into `asModal` (focus trap + Escape + dialog role; was a non-modal `div`)
- Packaging: compiled tests, Storybook stories, and source maps are excluded from the published tarball via `files`-field negation patterns (a `.npmignore` is ignored once a `files` allowlist is present, verified with `npm pack`, which dropped the tarball from 935 to 402 files); `prepublishOnly` now runs `npm run build`; `clean` no longer reformats `src/`; `inlineSources` is off
- Dropped the inaccurate `mobile-first` keyword (the responsive system is desktop-first / max-width)
- `LICENSE`: fixed a typo in the grant clause and named the copyright holder

### Fixed

- `DataList` multi-select corrupted its saved set via substring matching (a value like `"category"` false-matched the item `"cat"`, and removal mangled overlapping entries): replaced with an exact-token array model
- `Form` `onViewPreview` was unreachable dead code; clicking the preview action now fires the callback
- `FormField` threw raw `Error`s on the render path (crashing the consumer tree with no error boundary): now degrades to a graceful fallback
- `$success` was a literal `#4bb161` (2.7:1, fails WCAG 1.4.3 AA) on the SCSS path while the CSS token was already the compliant `#2e7d46`: aligned
- `Input` coerces `value` to `""` so an initially-undefined value does not flip the input from uncontrolled to controlled
- `CopyButton` guards the clipboard write (try/catch, success state only on resolve) and clears its reset timer; `PageNotFound` clears its redirect timer on unmount
- `Bubbly` no longer runs ~2,400 `crypto.getRandomValues` calls per render to key decorative `div`s (uses the index)

---

## [3.3.0] - 2026-06-25

> Consolidated entry. The 3.0.0-3.3.0 releases (3.1.0/3.2.0/3.3.0 tagged 2026-06-25, 3.0.0 on 2026-04-03) were never cut into the changelog per-release, so their combined changes are recorded here. Releases from this point are cut individually.

### Added

- `React.forwardRef` on `Button` and `Input`: consumers can now attach DOM refs for focus management
- `useFormValidation` and `useValues` exported as public hooks for custom form UIs
- Storybook with Vite builder, live component documentation with stories for Button, IconButton, Input, and Icon
- `CHANGELOG.md`
- `ThemeMenu` molecule (`@nxs-molecules`). Listbox button theme picker that replaces the native `<select>` in the header. Follows the WAI ARIA authoring pattern for a listbox button (`aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, `role="listbox"`, `role="option"` with `aria-selected`). Full keyboard support (Arrow, Home, End, Enter, Space, Escape, Tab), color swatch per theme, scales to many themes without a redesign
- `Post` molecule (`@nxs-molecules`). Editorial feed card with linkable title, author byline, locked 16:9 thumbnail, body with read more truncation, tags, and optional reactions footer
- `PostRow` molecule (`@nxs-molecules`). Compact list row variant. Fixes the invalid nested interactive elements pattern from the prior client implementation (remove button was inside the selection button)
- `PostDetail` organism (`@nxs-organism`). Full detail view with banner thumbnail, `h1` title, byline, reactions, and a `children` slot for the consumer's comment list
- `nxs-post` type declarations: `PostData`, `PostAuthor`, `PostReaction`, `PostCallbacks`, `PostProps`, `PostRowProps`, `PostDetailProps`
- Reading measure utilities: `.prose` (70ch), `.prose-narrow` (55ch), `.prose-wide` (80ch). Applied on the wrapper around body copy, not on individual paragraphs
- SCSS width tokens: `$content-max-narrow` (680px), `$content-max` (960px), `$content-max-wide` (1200px), `$card-max-compact` (320px), `$max-merch-card-width` (320px), `$max-post-card-width` (620px)
- Nav landmark `aria-label`s on primary, mobile, and footer navs
- `activePath` on `HeaderProps` and `NavbarProps` so the active page is marked with `aria-current="page"`
- Icons: `palette`, `chevronDown`, `checkMark`
- `:root` design-token defaults (`vars/_tokens.scss`) so the library renders standalone instead of silently depending on consumer-defined CSS custom properties
- `Button`: additive `className` (merges with the theme class rather than replacing it), `type` (enables a real form-submit button), `id`, and `style` props
- `isDisabled` alias on `Button` and `IconButton` (alongside the legacy `isDisable`) so the API can converge on one spelling without a breaking rename
- `Dialog`: opt-in `asModal` prop adding `role="dialog"`, `aria-modal`, `aria-labelledby`, a focus trap and Escape-to-close, backed by a new shared `useFocusTrap` hook (off by default so existing modal wrappers are unaffected)
- `Select`: `placeholder` prop (defaults to the previously hardcoded "Choose Selection")
- Component render tests (React Testing Library) for `Button`, `Select`, `Dialog`, the form inputs and the icon buttons; `jest-axe` accessibility assertions; `jest.setup.ts` wiring `@testing-library/jest-dom`
- `lint` and `test:ci` scripts plus a `prepublishOnly` gate (`tsc --noEmit` + tests) so a failing build cannot be published
- GitHub Actions CI running lint, type-check and tests on push and pull request

### Accessibility

- Form inputs (`Input`, `TextArea`, `InputCheckbox`) set `aria-invalid` and `aria-describedby`, and field errors render in a `role="alert"` live region (WCAG 3.3.1 / 4.1.3)
- Icon-only controls get real accessible names: `IconButton` accepts `aria-label` / `aria-expanded` / `aria-controls`; `CopyButton` announces copy success via an `aria-live` region; the `AuthField` password toggle and the hidden `UploadFile` input are labeled; `HintButton` exposes its disclosure state
- `Select` names its native control with the field name when the visible label is hidden, and associates the visible label via `id`
- Table header cells (`<th>`) get `scope="col"`
- `TextArea` and `InputQuantity` now set `id={name}` so the visible `<label htmlFor={name}>` is programmatically associated (WCAG 1.3.1 / 4.1.2); previously the textarea and quantity fields had a label pointing at no element
- Status badges (`.status-pending`, `.status-due-soon`, `.status-complete`, `.status-success`) are now self-contained and meet WCAG 1.4.3 AA: each pins a text color that clears 4.5:1 on its own background. The greens are darkened to `#2e7d46` so white badge text passes (~5.1:1); the old rules rendered green text on a green background (invisible)

### Security

- `safeUrl()` URL-scheme guard added (`@nxs-utils/data/safeUrl`, also exported from the root). Every anchor that renders a consumer/user-supplied URL (`Post`, `PostDetail`, `Navlink`, `ListItem`, `Footer`, `Hyperlink`, `UnsplashCredit`) now routes its `href` through it, neutralizing `javascript:` / `data:` / `vbscript:` schemes (incl. control-char obfuscation like `java\tscript:`) to `#`. This closes a stored-XSS vector on the post/feed surfaces. `UnsplashCredit` external links also gained `rel="noopener noreferrer"`

### Changed

- FontAwesome packages moved from `dependencies` to `peerDependencies`: prevents duplicate installs in consumer apps
- `ListItem` renders a real `<a>` anchor when `href` or `link` is present and a `<button>` when the item is an action. Active items receive `aria-current="page"`. No longer wraps `Button` / `IconButton`, so nav links look like links again
- `FormNavigation` rewritten with step semantics. Current step is a `<span>` with `aria-current="step"` instead of a disabled button (which dropped the current step out of the tab order). Numbered step circles, connector lines, and `aria-live="polite"` status
- `Footer` nav gains `aria-label="Footer"` and footer links use `.nav-link.footer-link` so they read as supporting nav
- `.post-detail-body` caps at `70ch` for proper reading measure
- `.post-card` width driven by the dedicated `$max-post-card-width` token (620px)
- `.merch-card` width driven by the dedicated `$max-merch-card-width` token (320px)
- Packaging: `sideEffects` changed from `false` to `["**/*.css"]` so bundlers never tree-shake the shipped stylesheet
- Packaging: top-level `types` now points to `./dist/@types/main.d.ts` (was a directory, which only resolved by accident via the exports map); stale `src/**/*.d.ts` removed from the published `files` list
- FontAwesome peer dependencies marked optional via `peerDependenciesMeta` (only the `Icon` / `Assets` path needs them)
- Documented that the package is ESM-only (no CommonJS build; requires a bundler or Node ESM)
- **BEHAVIOR CHANGE, `Total` checkout primitive:** the hardcoded 6.25% US sales tax is gone. Tax is now consumer-driven via a precomputed `tax` prop or a `taxRate` fraction, and **defaults to 0** (a shared checkout primitive must not invent a jurisdiction's rate). Added `currencySymbol` (default `$`) and `labels` props for i18n. Consumers that relied on the implicit 6.25% must now pass `tax`/`taxRate`. The tax row hides when the amount is 0
- `Form` `formId` is now optional (was required but only used by `PaginateForm`). When provided it is applied to the `<form>` element's `id`; `PaginateForm` falls back to the page index when a sub-form omits it
- README corrected: the Icon System list conflated the dependency-free built-in set with the opt-in FontAwesome set. It is now split, with the `registerFontawesomeIcons()` boot step documented. The `Form` usage example no longer passes a non-existent `name` prop or omits a (previously required) `formId`

### Fixed

- **Published types now resolve for consumers (was the biggest defect in the package).** Every component prop type was declared inside ambient `declare module "nxs-button"` / `"nxs-form"` / `"custom-props"` (etc.) blocks in `src/@types/*.d.ts`. Those blocks were never emitted into `dist`, yet ~118 shipped `.d.ts` files imported from them, so any consumer on `skipLibCheck:false` (or `node16`/`nodenext` resolution) got `TS2307 Cannot find module 'nxs-button'` across the whole prop surface, and everyone else silently got `any`. The ambient blocks are now real, exported modules (`src/@types/*.ts`) mapped via `tsconfig` `paths`, so `tsc-alias` rewrites the imports to relative paths and the type modules ship in `dist/@types/@types/`. Verified by a clean emit: 0 phantom `nxs-*`/`custom-props` specifiers remain in the emitted `.d.ts`. The headline prop types (`HeaderProps`, `FormProps`, `ButtonProps`, `SelectProp`, `CalendarProps`, `PostProps`, ...) are also re-exported from the package entry so consumers can import them by name from `nexious-library`
- `useRequiredProps`: `objLength(value) < 0` can never be true, changed to `=== 0` so empty objects are correctly flagged
- `useRequiredProps`: stale closure caused only the last error to survive, fixed with functional state update
- `useFormValidation`: `validateForm` was setting "validated" even when errors existed, fixed priority check
- `useFormValidation`: redundant `useEffect([formErrors])` was overriding the "green" submit status, removed
- `useFormValues`: double render (`setNewValues([]); setNewValues(oldValues)`): replaced with single set
- `Form.tsx`: `confirmRemovals || true` always evaluated to `true`: changed to `confirmRemovals ?? true`
- `Form.tsx`: `throw Error()` inside `useEffect` caused an unhandled rejection, changed to `console.error` + graceful recovery
- `HeroCard`: returning `<div />` on missing hero, changed to `null`
- `propChecker`: failed to distinguish `null` from objects and arrays from plain objects, added `isSameType` helper
- `Image`: missing `aria-label` on the "no image" button, added `aria-label="No image available"`
- `tsconfig.json`: removed deprecated `baseUrl`; added explicit `rootDir`; updated all path aliases
- `ThemeMenu` TS2322 where `wrapRef` was typed `HTMLDivElement` but attached to an `<li>`. Now typed as `HTMLLIElement`
- `PostRow` no longer nests interactive elements
- Added `@testing-library/dom` as an explicit devDependency. `@testing-library/react@16` requires it as a peer and it was previously missing, causing hook test suites to fail to load with `Cannot find module '@testing-library/dom'`
- `BurgerButton`: `aria-label` was inverted relative to the open/closed state (it said "open menu" while the menu was already open): swapped
- `Select`: no longer throws inside render when `onChange` is missing, and no longer renders an error card on missing `name`/`list`; it relies on the already-required types, so a misconfigured prop is a compile error instead of a runtime crash
- `useRequiredProps`: now flags an empty string, array, or object as missing (previously only `null`/`undefined`), matching its test suite
- `Header`: an empty `menu` array no longer blanks the entire header. Once `useRequiredProps` began flagging `[]` as missing, the old `lightColor === "red"` gate replaced the whole header (logo + utilities included) with an error block on every menu-less page (public landings, minimal apps, initial load). The header now renders its chrome whenever `menu` is present and only draws the nav when there are items; a genuinely absent `menu` prop still surfaces the developer error
- Removed a duplicate `$dim-color` SCSS declaration (kept the value already in effect via source order, so no rendered color changed)

### Removed

- Global `p { max-width: 400px }` in the typography reset. Line length is a container concern and the global cap broke every paragraph that lived inside a narrower or wider context. Use `.prose` utilities on the wrapper or a page level `$content-max-*` token instead
- `.card` no longer caps its own width. The base primitive is width agnostic; width is set by the page layout or by variant specific classes. The invalid `max-width: auto` mobile override was also removed
- `$max-card-width` SASS variable. Consumers should migrate to a dedicated variant token (`$max-post-card-width`, `$max-merch-card-width`, `$card-max-compact`), a page level content width (`$content-max-narrow`, `$content-max`, `$content-max-wide`), or set width on the page layout wrapper

### Migration notes

- Grep for `$max-card-width`. Replace with the appropriate variant or content token, or remove the cap and let the page wrapper drive width
- Grep for pages that relied on the global `p` max-width. Wrap body copy in a container with `.prose`, `.prose-narrow`, or `.prose-wide`
- For Post adoption, delete client local copies and import from `@nxs-molecules` and `@nxs-organism`. Map your domain `Post` type to `PostData` at the call site
- Pass `activePath` to `Header` so nav links mark the active page with `aria-current="page"`

---

## [2.9.5] - 2024

### Changed

- SCSS refactored to Dart Sass 3.0, replaced `@import` with `@use` / `@forward` throughout all stylesheets

---

## [2.9.4] - 2024

### Fixed

- Resolved remaining Sass deprecation warnings from `@import` usage

---

## [2.9.3] - 2024

### Added

- Additional FontAwesome icons added to the icon asset map

---

## [2.9.2] - 2024

### Changed

- Select fields now display the `label` value instead of `data` value

---

## [2.9.1] - 2024

### Changed

- Temporarily removed peer dependency constraints to unblock consumers on older setups

---

## [2.9.0] - 2024

### Added

- Initial `peerDependencies` declaration for React 18

---

## [2.8.0] - 2024

### Added

- Table component with header, body, and footer sections
- `SectionList` organism for grouped content display
- `HeaderContent` molecule for reusable header areas

### Changed

- Footer and navigation styling improvements
- Navigation items refactored to be DRY
- Component titles centered

---

## [2.7.x] - 2023-2024

### Added

- `CalendarEvents` template component
- Draggable button support, `onDragStart` / `onDragEnd` props on Button
- `Bubbly` background organism (blurred bubble effect)
- `Rating` component added to molecule layer
- `checkInverseCheckbox` validation for mutually exclusive checkboxes
- `Banner` organism
- `CopyButton` and `HintButton` molecules
- `DataList` field type for suggestion lists
- Entry pagination, toggle between active form entries
- `CardTextBubble` organism
- Checklist icon support in CalendarEvents
- Date picker with active-day selection and event injection
- Thumbnail property on `Select` options
- Submit icon prop on Form
- Brand icon support (FontAwesome brands)
- Notification ping on IconButton
- `UserCard` organism

### Fixed

- Select wrapper now fits parent width correctly
- Hint button prop drilling fixed
- Calendar: active day no longer resets when a day is clicked
- Calendar: AM/PM hidden for time-choice selection
- Form entries: only one new field added per group (duplicate guard)
- Checkbox no longer creates duplicate entries on re-check

### Changed

- `onchange` events consolidated, single update function handles all field types
- `onchange` now passes value string rather than the raw DOM event
- `formatEntry` extracted as reusable helper
- Form entry values only extend when checked

---

## [2.6.x] - 2023

### Added

- `Dialog` component (modal overlay)
- Scroll controls with cardinal-direction overflow indicators
- Preview mode, view form changes live before submitting
- `DataList` selection with toggle and reset
- Disabled prop on Form
- `active` prop for navigation items
- Grid styling improvements
- Form field responsiveness

### Fixed

- Unique list message now resets correctly between selections
- Empty array values filtered out from entries before submission
- Navigation weeks widths corrected on mobile

### Changed

- `Dialog` added to public entry point
- Hero component made DRY, props consolidated
- Navigation menu schema updated
- Removal confirmation dialog added with "don't show again" option

---

## [2.5.x] - 2023

### Added

- Clearable selection on form fields
- Color prop on Icon component
- Icon data expanded (LinkedIn and others)
- App-card styles
- Navigation icons

### Changed

- Menu items normalised to same height
- Alternative escape method for modal/dialog close
- `themeList` separated from main header props

---

## [2.4.x] - 2023

### Added

- `PaginateForm` template with mini navigation between form pages
- Form hero styling
- Media links and footer media section
- `InputCheckbox` prop type
- Burger menu closes on outside click
- Count schema for number fields (min/max validation)
- Price field type
- `PaymentMethods`, `Total`, and `Cart` checkout organisms
- `MerchCard` organism with CTA buttons
- Scroll made optional on long forms
- Navbar update-theme prop

### Fixed

- PropType checker: skip validation when proptype already exists
- File submission: field name now correctly attached to file value
- FormData: non-file values now included alongside file uploads
- Cart row schema aligned with form schema
- Number field validation fixed
- Z-index optimised to prevent view obstruction

### Changed

- Components moved into organism layer
- `onchange` consolidated across all field types
- `formatEntry` helper centralised for DRY entry formatting
- Removed sold-out items from add-to-cart flow

---

## [2.3.x] - 2023

### Added

- Calendar preview mode
- Form data formatting helpers (`formatFormData`, `formatPreviewData`)
- `onClick` prop on HeroCard
- Entry values: show all initial entry fields on load

### Changed

- File structure reorganised, components grouped by atomic layer
- Form entries optimised (duplicate guards, ordering fixed)
- Select active state now unique per field (no cross-field bleed)
- Theme moved to main entry point

---

## [2.2.x] - 2023

### Added

- Form field multiplication, add/remove additional entries with a button click
- Entry data toggled by checkbox state
- Field headings displayed alongside checkbox entries
- Labels, placeholders, and types carried into new entry fields
- Form fields added to molecule layer

### Changed

- Initial form setup moved to `initForm` helper
- Entry toggle logic consolidated

---

## [2.1.x] - 2023

### Added

- Atoms exported from main entry point
- Multiple TypeScript module declaration files added for all component groups

### Changed

- Build pipeline cleaned and stabilised for first typed release

---

## [2.0.x] - 2023

### Added

- Full TypeScript migration, all component props typed with custom `.d.ts` module declarations
- Watcher script to programmatically add types to the build output
- `PaginateForm` navigation with prev/next controls
- `tsc-alias` for resolving path aliases in compiled output
- Scripts directory for build automation

### Changed

- Templates set as the main entry point
- One shared Card module replaces multiple card variants

---

## [1.4.0] - 2022

### Changed

- README updated with usage examples and documentation

---

## [1.3.0] - 2022

### Added

- File upload support, select and upload images through the form
- Custom form labels, placeholders, and types
- Auth form field with password strength validation and visible-toggle
- `Loading` error component
- Cart row component
- Calendar with fully dynamic weeks, month navigation, and event injection
- Ping count on calendar events
- Language / locale toggle on navigation
- `PageNotFound` component

### Fixed

- Form values correctly sent via FormData when uploading files
- Label display bug resolved
- CORS issue with hero image (`crossOrigin="anonymous"`)
- Only update file state when a new file is selected
- Responsive widths for form and navigation

### Changed

- `onSubmit` renamed from earlier `submit` prop
- DRY pass applied across Button, Label, Hero, and Calendar components

---

## [1.2.x] - 2022

### Added

- Path aliases via `tsc-alias` and `tsconfig` `paths`
- Nodemon integration for dev watching
- CSS bundled into build output (SCSS partials loaded via Sass)
- Icon enum for type-safe icon name references

### Changed

- Migrated from Webpack to `tsc` + `tsc-alias` build pipeline
- Switched to absolute imports throughout the source tree
- Relative imports removed

---

## [1.1.x] - 2022

### Added

- Molecule layer, IconButton, Spinner, Select, Label, Input, form field molecules
- Table component (header, body, data cells)
- Card header and card body atoms
- Hero component
- Burger button with navigation dropdown
- SCSS partial system with mixin support
- Rollup build configuration (later replaced by tsc)

---

## [1.0.x] - 2022

### Added

- Initial library scaffold
- Header, Footer, and navigation templates
- Calendar component with tile placement, month traversal, and event listing
- HeroCard, CardTextBubble, UserCard organisms
- Button, Icon atoms
- Ping count notification badge
- Logo and app-name props on Header

[Unreleased]: https://github.com/carlos-hereee/nexious-library/compare/v3.3.9...HEAD
[3.3.9]: https://github.com/carlos-hereee/nexious-library/compare/v3.3.2...v3.3.9
[3.3.2]: https://github.com/carlos-hereee/nexious-library/compare/v3.3.0...v3.3.2
[3.3.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.5...v3.3.0
[2.9.5]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.4...v2.9.5
[2.9.4]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.3...v2.9.4
[2.9.3]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.2...v2.9.3
[2.9.2]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.1...v2.9.2
[2.9.1]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.0...v2.9.1
[2.9.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.8.0...v2.9.0
[2.8.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.7.25...v2.8.0
[2.7.25]: https://github.com/carlos-hereee/nexious-library/compare/v2.7.0...v2.7.25
[2.7.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.6.6...v2.7.0
[2.6.6]: https://github.com/carlos-hereee/nexious-library/compare/v2.6.0...v2.6.6
[2.6.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.5.1...v2.6.0
[2.5.1]: https://github.com/carlos-hereee/nexious-library/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.4.3...v2.5.0
[2.4.3]: https://github.com/carlos-hereee/nexious-library/compare/v2.4.0...v2.4.3
[2.4.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.3.4...v2.4.0
[2.3.4]: https://github.com/carlos-hereee/nexious-library/compare/v2.3.0...v2.3.4
[2.3.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/carlos-hereee/nexious-library/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/carlos-hereee/nexious-library/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/carlos-hereee/nexious-library/compare/v1.4.0...v2.0.0
[1.4.0]: https://github.com/carlos-hereee/nexious-library/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/carlos-hereee/nexious-library/compare/v1.2.6...v1.3.0
[1.2.6]: https://github.com/carlos-hereee/nexious-library/compare/v1.2.0...v1.2.6
[1.2.0]: https://github.com/carlos-hereee/nexious-library/compare/v1.1.14...v1.2.0
[1.1.14]: https://github.com/carlos-hereee/nexious-library/compare/v1.1.0...v1.1.14
[1.1.0]: https://github.com/carlos-hereee/nexious-library/compare/v1.0.14...v1.1.0
[1.0.14]: https://github.com/carlos-hereee/nexious-library/releases/tag/v1.0.14
