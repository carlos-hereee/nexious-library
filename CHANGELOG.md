# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Form announces a failed submit (no API break)

#### Fixed

- **`Form`'s `responseError` paragraph is a live region and takes focus.** It rendered as a bare
  `<p className="error-message">`, so a screen reader user who submitted a wrong password heard
  nothing and a keyboard user stayed parked on the button. It now carries `role="alert"` and
  `tabIndex={-1}`, and focus moves to it when `responseError` changes to a value (keyed on the
  text, so a re-render while the user is correcting a field does not steal the caret). No prop
  changed and the classname is untouched, so consumers on 4.0.1 need no migration. In the
  Company Uno client this one element is every form on the platform (AccountForm, AppForm,
  CalendarForm, MediaForm, StoreForm twice, TaskboardForm). Pinned by
  `formResponseError.test.tsx`, including the axe sweep in the error state.

### UI rework Phase 5: verify and document (no API break)

The pass that proves the previous four. Tests go **232 across 20 suites to 361 across 24**, and
the point of the new coverage is that it catches what a build, a type check and a lint all miss.

#### Added

- **`./@nxs-template` finally resolves.** The exports map has pointed at
  `dist/esm/components/template/index.js` since it was written, and **that barrel never existed**,
  unlike atoms, molecules and organism. Any consumer following the exports map to that subpath got
  a module-not-found. It now exports exactly the ten names `main.ts` already exports, so this adds
  no public API and only delivers what package.json was already promising. Found by checking that
  every declared entry resolves, not by `npm pack` itself, which happily packs a working tree with
  a broken exports map.
- **Executable contrast assertions** (`__tests__/a11y/contrast.test.ts`, 44 cases). It reads the
  declarations out of `vars/_tokens.scss` and `vars/_control.scss` at runtime, follows `var()`
  indirection, models dark as light-plus-overrides so it matches the real cascade, and implements
  WCAG relative luminance inline rather than adding a dependency. **Nothing is hardcoded**, so
  moving a token either keeps this green or fails it here. Seven cases pin the math against
  published reference values before any of it is trusted about tokens.
- **A reduced-motion suite and a resilience suite** (long strings, RTL, zero-one-many), plus a
  states story for the resilience axes.
- **The README's full token table and the `theme`-to-`variant` migration map.**

#### Accessibility

- **Dark `--text-muted` failed AA and the token's own comment said otherwise.** `#64748b` measures
  **3.59:1 on `--surface` and 3.96:1 on `--bg`**; the comment claimed AA by citing a light-mode
  number. It is not rescued by the large-text exemption either: `.text-mute` sets no font-size at
  all, and the post byline pins it at 14px. Raised to `#7c8ba1` (4.93 and 5.44), still a visible
  step below `--text-secondary` so the two tokens keep meaning different things. **This diverges
  from nexious-client**, which declares the same failing value and wins by source order, so
  production is unchanged until the client moves.
- **A `type: "number"` field stayed editable while its form was disabled.** `FieldQuantity`
  destructured its props without `isDisabled`. The prop was declared on the type, passed by
  `fieldRegistry` and consumed by `InputQuantity`: the chain broke at exactly one missing forward,
  which is why it type-checked and looked correct on screen.
- **The theme-menu chevron reported the wrong state under reduced motion.** The global kill
  switch's `*:hover { transform: none !important }` outranks a normal declaration at any
  specificity, so merely pointing at an open menu snapped the chevron back to its closed rotation,
  lying about state to the audience that asked for less motion.
- **`.bubble` looped with no reduced-motion guard**, the only unguarded loop in the bundle. The
  kill switch clamps to a single 1ms pass rather than removing the animation, so it produced a
  50px jump-and-snap inside one frame, worse than the drift it replaced.
- The axe sweep goes **45 cases to 91**, adding Skeleton, both Loading modes, EmptyState and the
  three components rendering through it, the table markup, the post card, and the states the suite
  skipped: disabled, zero-entry and hidden-label.

#### Fixed

- **Three flex rows had no shrink floor**, so a long user-supplied string set the row's own minimum
  and blew it out. `.post-card-author` (nowrap, no ellipsis, pushed the date out of the card),
  `.post-card-handle`, and `.nav-tab-bar .nav-item`, whose minimum was the **sum of its labels**,
  so a localized set pushes a sticky full-width bar into horizontal page scroll. Plus
  `.container-row > *`, which promised equal columns with `flex: 1` and no `min-width: 0`.
- **`.theme-menu-list` opened off screen in RTL.** It was pinned to `right: 0`, so a 12rem popover
  opened away from its trigger when the header flowed the other way. Now `inset-inline-end`, a
  literal no-op in LTR.
- The README taught two things 4.0.0 had already deleted: a wrapper example still typing `theme`,
  and a theming example recommending an off-scale `--radius-medium: 10px`.

#### A note on what the dark-mode tests do and do not prove

jsdom applies no stylesheet, so axe's color-contrast rule cannot run there and wrapping a render in
`.dark-mode` proves nothing about color. Those cases assert **markup and naming parity** between
the two renders and say so in a comment. Contrast is the token suite's job, against real values.

### UI rework Phase 4: the fan-out (no API break)

Phases 1 to 3 built a token foundation and rebuilt the Form family on it. Phase 4 applies it to
everything else: cards, navigation, tables, containers, overlays, loading and empty states, and
the custom / assets / buttons / reset tail. **No public prop changed and no class was renamed or
deleted**, so a consumer already on 4.0.0 needs no migration for any of this.

#### The part that matters most is not the linter

`lint:css` went from 244 warnings to zero and the gate flipped from `warning` to `error`, but that
is the receipt, not the work. The work is that the library's surfaces were painted from **compiled
SCSS color literals with no dark counterpart**: `$light-secondary`, `$light-mode`, `$dark-mode`,
`$faded`, `$dim`, `$muted` and the rest. Because those paint CLASS selectors, and a class selector
beats an inherited color, **a consumer could not recover from them on its own page** (this is the
same defect that put nexious-client's dark tables at 2.3:1). Each is now the token that names its
role, so those surfaces theme for the first time.

#### Added

- **`Skeleton`**, a loading placeholder with `row`, `block`, `text` and `page` shapes and a `count`.
  It reserves the height the real content will take, which is the whole reason to prefer it over a
  spinner: a spinner occupies no space, so the page jumps when the data lands. One `role="status"`
  for the region with every bar `aria-hidden`, so a screen reader says "loading" once instead of
  reading N empty boxes. Carries its own `prefers-reduced-motion` guard because the global kill
  switch shortens animations to 1ms rather than removing them, which would strobe.
- **`EmptyState`**, the one layout behind `EmptySection`, `ComingSoon` and `PageNotFound`: glyph,
  headline, one sentence, next action. Every slot is optional and nothing renders by default, so
  none of the three sprouted content its consumers did not ask for.
- **`.panel` / `.panel-danger` / `.section`**, so `.container` can stop being a catch-all. See
  Changed for what `.container` gives up.
- **Table density and numerics**: `.table-dense` (44px rows against the default 52px, both above
  the WCAG 2.5.5 floor by construction), a sticky overline header, `.cell-numeric` for
  `tabular-nums` and right alignment, and a `.table-scroll` wrapper so a wide table scrolls itself
  instead of widening its grid column.
- **Tokens**: `--skeleton-bg`, `--skeleton-shimmer`, `--skeleton-duration`, `--row-height`,
  `--row-height-dense`. Keyframes `shimmer` and `dialogIn`.

#### Changed

- **The hover lift is now reserved for cards that navigate.** `.app-card`, `.preview-card`,
  `.merch-card` and `.post-card` keep `translateY(-2px)`; containers get no hover and rows get a
  `--hover-bg` tint instead. Design language 5.7, and it is most of why a dashboard reads as busy.
- **Border XOR shadow at rest.** No surface stacks both any more.
- **`.container` keeps its name and loses its opinions**: it is spacing and width only, with no
  fill, border or shadow. It is a published class the consumers select on, so retiring it by
  DELETING it was never available; the named intents moved to `.panel` and `.section` beside it.
- **One navigation grammar.** Active, hover and focus are each defined once (`nav-item` /
  `nav-active` mixins) and the top bar, rail and mobile tab bar reference them, rather than the
  three hand-rolled treatments they carried.
- **Dialogs sit at `--elevation-3`** with the 5.9 enter motion (300ms scrim fade, 200ms panel
  scale from 0.98), and every layered surface now reads the `--z-*` scale instead of an improvised
  literal (50, 99, 999, 9999 were all in the tree).
- Radii step concentrically now: dialog 16, card 12, row 8, chip 4. Several cards moved up a step
  and `.post-card` moved down from the modal step.
- `Loading` gained an opt-in `skeleton` prop. **The spinner is still the default**, deliberately:
  it is rendered on dozens of client surfaces, and switching the default would repaint all of them
  as a side effect of a CSS refactor. Making skeleton the default is a Phase 5 owner decision.

#### Accessibility

- The calendar tile's mobile floor was **40px, under the WCAG 2.5.5 minimum**, in the densest grid
  of tap targets in the product. It now reads `--tap-target-min`.
- The calendar's event-count pip rendered the brand indigo on amber at about **3.4:1**. It now uses
  the `--pending-accent-color` / `--status-on-pending` pair, chosen together, at about 5.5:1.
- Nav items, cards that click, table scroll regions and search inputs all take the shared focus
  ring. Adoption goes from **17 `focus-ring` sites to 58** across the stylesheets, and the
  hand-rolled `outline: 2px solid $dark-mode` treatments (which could not flip on dark, because a
  compiled literal has no theme) are gone with them.

#### Fixed

- The shimmer keyframe swept **right to left**. A percentage `background-position` on an oversized
  image inverts direction, so the intuitive `-100%` to `100%` runs backwards; it counts down now,
  and the keyframe header explains why so the next reader does not "fix" it back.
- `ErrorMessage`'s header comment claimed the dev panel is styled as a terminal *because* a
  red-bordered card could be mistaken for real UI. Phase 4 made it a red-bordered card, so the
  comment was rewritten rather than left to mislead.

#### Deliberately NOT done

- **`devices()` to `respond-from()` ships as its own commit**, because it INVERTS each breakpoint
  rather than renaming it and a regression there is invisible until someone resizes a browser.
  Keeping it separate keeps it revertible on its own.
- The CTA orange (`$cta-color`, `$action-color-alt`, `$error`) is untouched across buttons, post
  reactions and the calendar's today/selected tiles. None is on the banned list, but all are fixed
  hues with no token naming their role. Picking a home for them is a design decision.
- Form labels still are not the 12px uppercase overline. Same reason as in Phase 3: it is a visible
  change to every form in the product and belongs in an owner-reviewed pass.

### UI rework Phase 3: `theme` becomes `className`, plus a variant enum (BREAKING, 4.0.0)

**`theme` is removed from every component. There is no shim.** With one owner-controlled consumer
a shim protects nobody, and its cost is permanent: a dual resolution path, dev-warning machinery,
"which one wins" tests, and a second migration later that never happens.

#### Migration

| Before | After |
|---|---|
| `theme="cu-btn cu-btn-primary"` | `className="cu-btn cu-btn-primary"` |
| `theme="entry-rail-thumb"` | `className="entry-rail-thumb"` |
| `<Button />` (no theme) | `<Button className="btn-main" />`, or `variant="secondary"` for the new system |
| n/a | `variant="primary" size="large"` |

**The rename is the whole breaking change, and TypeScript finds every site.** Removing `theme`
from the props types means a missed call site fails the build loudly instead of silently dropping
a class. In `nexious-client` that was 333 attributes across 125 files.

#### Why a rename and not a variant migration

Measured across both repos before touching anything: **roughly 85 percent of `theme` call sites
passed a layout hook** (`entry-rail-thumb`, `select-icon`, `user-chip-compact`) **or the consuming
app's own design-system classes** (`cu-btn cu-btn-primary`, at 270 sites), and only about a dozen
passed anything that was genuinely a variant. `theme` was `className` with a misleading name, with
an untypeable variant selector welded onto it. 4.0.0 splits the two jobs.

#### Added

- **`variant` and `size`** on `Button` and `IconButton`, typed as `Variant`
  (`primary | secondary | tertiary | danger | ghost`) and `Size` (`small | medium | large`,
  mapping onto the three control heights). `Density` is declared for the Phase 4 table work.
- `Variant`, `Size`, `Density`, `VARIANT_CLASS`, `SIZE_CLASS` and `buildControlClass` exported
  from the package root, so a consumer can target the same class hooks from its own CSS.
- **`.btn-base` plus five variants and three sizes**, all from the control tokens, so a button is
  the same height as the input beside it by construction. `.nxs-button-group` is the library half
  of the width handshake the client already shipped as `cu-button-group`.

#### Changed

- **No implicit base class.** A `Button` with no `variant` renders exactly its `className` and
  nothing else. That is deliberate and it is what makes this migration pixel-neutral: `theme`
  REPLACED the base class, so a call site that moves from `theme="X"` to `className="X"` renders
  an identical string. A default variant would have appended a library class underneath the 270
  app-owned ones and started a specificity fight at every one of them. A `Button` with neither
  variant nor className now renders **no class attribute at all**.
- **`.btn-main` loses `width: 100%; max-width: 450px`.** Those two declarations were the
  `!important` war. Width belongs to the container. `.btn-main` itself is kept as LEGACY so the
  call sites migrated verbatim render as before; it is not a second system to build on.
- `.btn-danger` was declared twice, in `_button-variants.scss` and `_secondary-button.scss`, with
  different rules, and which won depended on forward order. The duplicate is deleted.
- `.btn-main`'s hand-written focus outline becomes the shared focus ring, so it flips correctly
  on dark. That was the last of the four focus treatments the library carried.
- `Heading` keeps its implicit `heading` base class and appends `className`. The difference from
  Button is deliberate: `heading` is the element's own typography, not a variant a caller picks
  between, so appending is right there and replacing is right on a button.

#### Accessibility

- The 44px touch floor applies to every button variant and size at mobile width.

#### Verification

Library: `npx tsc --noEmit` clean, `npm test` **219 passed / 19 suites**, `npm run lint` **0 new
errors** (32 pre-existing remain), `sass` clean.

Client, verified against a locally built copy of this version rather than against the published
one: `npx tsc --noEmit` **clean**, `npm run test` **1129 passed / 84 files**, `npm run lint`
**0 errors**.

> **⚠️ Publishing 4.0.0 auto-lands it, major or not.** `nexious-client`'s postinstall runs
> `npm i nexious-library@latest`, and `@latest` ignores the `^3.3.10` range, so the next
> `npm install` in the client picks this up whether or not the range allows it. A major buys no
> protection here. Publish `4.0.0-rc.0` under a `next` dist-tag first: `@latest` will not pick up
> a prerelease on another tag, so the install can be tested without arming the auto-upgrade.

### UI rework Phase 2: the Form family rebuilt on the foundation

Phase 2 of `roadmaps/specs/nexious-library-ui-rework-master-plan-2026-08-09.md`. Every form control
now renders through one field shell at one control height with one focus ring, the numbered entry
strip is gone, and the four time and date types speak one grammar.

**Nothing was removed from a public entry point.** `EntryThumbnailRail`, `FieldDateDay`,
`FieldDateWeek` and `FieldDateTime` are deleted, and all four were private: none appeared in
`main.ts` or in the `@nxs-molecules` barrel. Verified by grep before deleting, which is why there
are no back-compat wrappers. `EntryThumbnailRailProps` survives as a deprecated type alias.

#### Added

- **`FieldShell`**, the one field layout: label, control, optional help, error. Exported from
  `@nxs-molecules` with `FieldShellProps`.
- **`EntryNavigator`**, the one entry switcher, replacing both the thumbnail rail and the numbered
  strip. Tile content resolves in order: a thumbnail, then a label derived from the slot's own
  first text value, then a `getTileLabel` override, then the index. `orientation` picks the
  vertical rail or the horizontal strip.
- **`FieldTime`**, built on the native `<input type="time">`, and **`FieldDay`**, serving both
  `date-day` and `date-week`.
- **`fieldRegistry`**, a `Record<type, renderer>` map replacing the thirteen branch nested ternary
  in `Field.tsx`. Adding a field type is now one entry. The `auth.includes(name)` case stays a
  pre-check ahead of the map, because it dispatches on the field NAME rather than its type.
- **`utils/form/time`** (`to24Hour`, `toWireTime`), the conversion at the FieldTime boundary.
- `SelectProp.inShell`, set when a shell above the control owns the label and the error node.
- `styles/form/_field-shell.scss`, and `_entry-gallery.scss` renamed to `_entry-navigator.scss`.
- Storybook: `Foundation/States/Field` (10 types x 6 states, light and dark on one page),
  `Foundation/States/EntryNavigator`, `Foundation/Control Alignment` (the uniformity acceptance
  test, controls on 4px rules) and `Foundation/Design Language` (the rules, each citing its spec
  section). Story layout CSS lives outside `src/stylesheets` so it is never compiled into
  `dist/css`.
- 95 new tests across `FieldShell`, `EntryNavigator`, `FieldDate` and `FieldTime`, plus axe
  coverage of every field type in an error state, with the label shown and hidden, and again
  inside a `.dark-mode` subtree.

#### Fixed

- **`FieldDate` no longer emits `onChange(today)` on mount.** An OPTIONAL date field could never
  be left blank, because merely rendering the form filled it in. This is why the Press page kind
  stores `publishedOn` as a plain string and why `type: "date"` never entered the page kind
  vocabulary. `defaultToToday` (default **false**) opts back in.
- **`FieldDate` and `FieldDateTime` no longer `throw` on the render path.** The library ships no
  error boundary, so a throw white-screened the consumer's entire subtree. Both now log and bail,
  matching `Form.tsx` and `FormField.tsx`.
- **The meridiem is no longer flipped by string surgery.** The old control did
  `value.split("AM").join("")`, so any value carrying those letters elsewhere was silently
  corrupted. The native input removes the problem, and the parser is anchored to the end of the
  string so nothing in the middle can reach it.
- **`.select` no longer renders the same outline on hover and on focus.** A keyboard user could
  not distinguish focus from a passing mouse. Hover is now a border shift plus the hover tint;
  focus is the shared ring.

#### Accessibility

- **`aria-describedby` can no longer dangle.** Seven of the nine field types rendered the error
  node inside the Label, so hiding the label deleted the node the description pointed at and a
  screen reader announced "invalid" with no reason. The shell owns the node and renders it
  whenever there is an error, label or not.
- **`hideLabels` now hides the label visually instead of deleting it.** A visually hidden
  `<label htmlFor>` plus the control's `id={name}` names every field type, including the time
  input, the date trigger and the quantity input that had no accessible name at all, and it
  announces the human label rather than the raw field name.
- `.entry-rail-tile` gains a real focus ring. Its only focus signal was an opacity change, which
  is effectively invisible; the opacity change stays as a secondary signal.
- Entry tiles and form step controls reach the 44px touch floor.
- `InputQuantity` gains `aria-invalid` / `aria-describedby`; it was the one text-entry control in
  the library with no aria wiring.
- `.form-step-name` loses `white-space: nowrap`, which clipped a localized step name.

#### Changed

- **Empty entry slots are no longer pre-rendered as disabled boxes.** The numbered strip rendered
  `entry.max` buttons up front, so a max of ten showed eight dead boxes before the user had done
  anything. Only real slots render; remaining capacity is the "X of MAX" count line.
- **Control geometry moves to the tokens.** An input had 8px/16px padding and a select 8px/8px, so
  their text started eight pixels apart and the two resolved to different heights from the same
  font. Both now read `--control-height` and `--control-padding-*`. This one IS visible in
  `nexious-client`: the client restyles these elements but sets no padding or height, so the
  library really is the source of control geometry in production.
- `_form-navigation.scss` rebuilt on tokens. The progress connector used the orange CTA color
  while the completed state used green, so a progress bar changed hue family halfway along its own
  run; it is one family now, brand for in progress and green only for done.
- `date-week` renders as a Select rather than a DataList. `DataList` is unchanged and remains the
  right control for a genuinely open set.

#### Verification

`npx tsc --noEmit` clean, `npm test` **217 passed / 19 suites** (from 122 / 15), `npm run lint`
**0 errors in Phase 2 files** (32 pre-existing errors remain in files this phase did not touch),
`npm run lint:css` **247 warnings, 0 errors** (down from the 266 baseline). Compiled CSS 86,432
bytes before Phase 1 to 93,555 after Phase 2, **+8.2% cumulative**, inside the 10% ceiling.

**Verified by rasterizing the Storybook stories in a real browser, not by reading the CSS**, and
that is how the last three defects in this phase were found. All three read as correct markup:

1. **Controls were 36 / 37 / 38px, not uniform**, under a shared `min-height`. Identical padding
   is necessary but not sufficient: a select carries a 1px border the reset strips from an input,
   and a time input's internal segment rendering is intrinsically taller than a text input's line
   box, so each control's own content was still deciding its height. Single-line controls now take
   a hard `height` plus a pinned `line-height`; a textarea keeps a floor because it is sized to
   its content. Re-measured: every control **exactly 36px, at the same top edge, in both themes**.
2. **A text input and a textarea rendered WHITE in dark mode.** The reset strips an input's border
   and background and nothing put one back, so they fell through to the browser default while the
   select and date trigger (which do set a background) rendered dark. `nexious-client` masks this
   by setting the same tokens itself, which is exactly why it survived: the only place it showed
   is standalone, and standalone is this rework's review surface.
3. **Error text failed AA in dark mode at 3.77:1.** `.required` carries the danger ACCENT color,
   which has no dark counterpart. `.field-error` now uses `--danger-text`, half of the Phase 1
   status pair. Re-measured: **6.19:1 light, 9.92:1 dark**.

> **Q3 is answered by the code, not by a decision.** The plan asks whether to keep, gate or retire
> the 600px `.form-field-container` scroll region. It is already opt-in behind `Form`'s `formScroll`
> prop, `.no-scroll` correctly wins the cascade when the prop is off, and `nexious-client` never
> passes it. There is nothing live to retire, so nothing was changed.

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
