# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- `React.forwardRef` on `Button` and `Input` — consumers can now attach DOM refs for focus management
- `useFormValidation` and `useValues` exported as public hooks for custom form UIs
- Storybook with Vite builder — live component documentation with stories for Button, IconButton, Input, and Icon
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

### Changed

- FontAwesome packages moved from `dependencies` to `peerDependencies` — prevents duplicate installs in consumer apps
- `ListItem` renders a real `<a>` anchor when `href` or `link` is present and a `<button>` when the item is an action. Active items receive `aria-current="page"`. No longer wraps `Button` / `IconButton`, so nav links look like links again
- `FormNavigation` rewritten with step semantics. Current step is a `<span>` with `aria-current="step"` instead of a disabled button (which dropped the current step out of the tab order). Numbered step circles, connector lines, and `aria-live="polite"` status
- `Footer` nav gains `aria-label="Footer"` and footer links use `.nav-link.footer-link` so they read as supporting nav
- `.post-detail-body` caps at `70ch` for proper reading measure
- `.post-card` width driven by the dedicated `$max-post-card-width` token (620px)
- `.merch-card` width driven by the dedicated `$max-merch-card-width` token (320px)

### Fixed

- `useRequiredProps`: `objLength(value) < 0` can never be true — changed to `=== 0` so empty objects are correctly flagged
- `useRequiredProps`: stale closure caused only the last error to survive — fixed with functional state update
- `useFormValidation`: `validateForm` was setting "validated" even when errors existed — fixed priority check
- `useFormValidation`: redundant `useEffect([formErrors])` was overriding the "green" submit status — removed
- `useFormValues`: double render (`setNewValues([]); setNewValues(oldValues)`) — replaced with single set
- `Form.tsx`: `confirmRemovals || true` always evaluated to `true` — changed to `confirmRemovals ?? true`
- `Form.tsx`: `throw Error()` inside `useEffect` caused an unhandled rejection — changed to `console.error` + graceful recovery
- `HeroCard`: returning `<div />` on missing hero — changed to `null`
- `propChecker`: failed to distinguish `null` from objects and arrays from plain objects — added `isSameType` helper
- `Image`: missing `aria-label` on the "no image" button — added `aria-label="No image available"`
- `tsconfig.json`: removed deprecated `baseUrl`; added explicit `rootDir`; updated all path aliases
- `ThemeMenu` TS2322 where `wrapRef` was typed `HTMLDivElement` but attached to an `<li>`. Now typed as `HTMLLIElement`
- `PostRow` no longer nests interactive elements
- Added `@testing-library/dom` as an explicit devDependency. `@testing-library/react@16` requires it as a peer and it was previously missing, causing hook test suites to fail to load with `Cannot find module '@testing-library/dom'`

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

- SCSS refactored to Dart Sass 3.0 — replaced `@import` with `@use` / `@forward` throughout all stylesheets

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

## [2.7.x] - 2023–2024

### Added

- `CalendarEvents` template component
- Draggable button support — `onDragStart` / `onDragEnd` props on Button
- `Bubbly` background organism (blurred bubble effect)
- `Rating` component added to molecule layer
- `checkInverseCheckbox` validation for mutually exclusive checkboxes
- `Banner` organism
- `CopyButton` and `HintButton` molecules
- `DataList` field type for suggestion lists
- Entry pagination — toggle between active form entries
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

- `onchange` events consolidated — single update function handles all field types
- `onchange` now passes value string rather than the raw DOM event
- `formatEntry` extracted as reusable helper
- Form entry values only extend when checked

---

## [2.6.x] - 2023

### Added

- `Dialog` component (modal overlay)
- Scroll controls with cardinal-direction overflow indicators
- Preview mode — view form changes live before submitting
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
- Hero component made DRY — props consolidated
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

- File structure reorganised — components grouped by atomic layer
- Form entries optimised (duplicate guards, ordering fixed)
- Select active state now unique per field (no cross-field bleed)
- Theme moved to main entry point

---

## [2.2.x] - 2023

### Added

- Form field multiplication — add/remove additional entries with a button click
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

- Full TypeScript migration — all component props typed with custom `.d.ts` module declarations
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

- File upload support — select and upload images through the form
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

- Molecule layer — IconButton, Spinner, Select, Label, Input, form field molecules
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

[Unreleased]: https://github.com/carlos-hereee/nexious-library/compare/v2.9.5...HEAD
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
