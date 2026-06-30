# Contributing to nexious-library

Thanks for contributing. This is the shared component library behind
[companyuno.com](https://www.companyuno.com); it is published to npm and auto-upgraded into the
platform client, so changes here ripple widely — keep them additive and well-tested.

## Local setup

```bash
npm install          # installs deps
npm run storybook    # live component playground at http://localhost:6006
npm test             # jest + React Testing Library + jest-axe
npm run lint         # eslint (airbnb + jsx-a11y)
npx tsc --noEmit     # type-check only (strict mode)
```

## Project structure (atomic design)

```
src/
  components/
    atoms/        smallest primitives (Button, Input, Icon, ...)
    molecules/    compositions of atoms (Select, Field, IconButton, Post, ...)
    organism/     larger compositions (Card, Cart, Navbar, Table, ...)
    template/     page-level shells (Form, Dialog, DialogOverlay, Header, ...)
  @types/         public prop types (one module per domain: Button.ts, Form.ts, ...)
  utils/          pure helpers + hooks (no component imports)
  stylesheets/    SCSS — vars/_tokens.scss (CSS custom properties), variables/* (SCSS vars)
  main.ts         the public package entry (every export the package ships)
```

A component lives at the lowest layer that fits, and its prop type lives in `@types/`. New
public components must be exported from `main.ts` **with their prop type**.

## Conventions

- **TypeScript strict.** No `any` in public types; `noUnusedLocals` / `noUnusedParameters` are on.
- **Accessibility is a feature.** Wire `aria-*` correctly, give icon-only controls an accessible
  name, associate form errors (`aria-invalid` + `aria-describedby` → a rendered `role="alert"`
  node), and keep keyboard support. ARIA-heavy components get a `jest-axe` test.
- **No hardcoded user-facing copy.** Default strings must be overridable via a prop so consumers
  can localize.
- **Use design tokens, not literals.** Reach for the `:root` CSS custom properties
  (`var(--main-brand-color)`, `var(--space-medium)`, `var(--radius-medium)`) or the SCSS
  variables that alias them — never raw hex / rem in component styles.
- **URLs from external data go through `safeUrl()`.** Never render `<a href={userData}>` directly.
- **Comments explain _why_,** not what. See the existing files for the voice.

## Testing

- Tests live in `src/__tests__/`. Add a render test for new components and a `jest-axe`
  assertion for anything with hand-rolled ARIA (dialogs, listboxes, custom form controls).
- `npm test` must be green before a PR. CI (`.github/workflows/ci.yml`) runs lint, type-check,
  and tests on every push and pull request.

## Changelog & release

- Add your change to the `## [Unreleased]` section of `CHANGELOG.md` (Keep a Changelog format:
  Added / Accessibility / Security / Changed / Fixed / Removed).
- Releases are owner-run via `npm run release:patch` | `release:minor` | `release:major`
  (`build` → `npm version` → `npm publish`). `prepublishOnly` re-builds, type-checks, and tests
  as a publish gate.
- `npm run build` = `clean` (`rimraf dist/`) → `tsc` → `tsc-alias` (rewrites path aliases in the
  emitted `.d.ts`) → `sass`. The package is **ESM-only**.
