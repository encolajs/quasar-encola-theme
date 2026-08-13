# quasar-encola-theme

A **downloadable Quasar theme/template** that makes Quasar v2 look like a flat,
Tailwind-style UI (the Encola design language) instead of Material Design.
Sibling product of `../vuetify-encola-theme` — same look, same positioning,
same lean-page philosophy. Sold as a complete starter project: theme core +
example pages. See `PLAN.md` for the roadmap and for the lessons imported
from the Vuetify build.

## Tech stack

- Vue 3 + Vite + TypeScript
- Quasar v2 (NOT forked — restyled via config only) via `@quasar/vite-plugin`
  with `sassVariables` pointing into the theme folder (NOT Quasar CLI — keep
  the starter a plain Vite app like the Vuetify sibling)
- lucide icons via `@lucide/vue` (NOT `lucide-vue-next` — deprecated)
- vue-router for example pages
- pnpm

## Architecture — the theming layers

All restyling flows through exactly these places. Never restyle anywhere else.

1. `src/encola/quasar-variables.scss` — Quasar SASS variables: `$primary`
   & friends, `$generic-border-radius`, `$button-border-radius`,
   `$typography-font-family`, per-component dimension variables. **Verify
   every variable name against the installed `quasar/src/css/` source before
   using it** — do not trust memory.
2. `src/encola/preset.ts` — the Quasar plugin options: `config` (e.g.
   `ripple: false`, dark mode, brand colors via CSS vars) + a
   **component-defaults boot module**. Quasar has NO Vuetify-style `defaults`
   system: default props are set by patching component prop definitions once
   at startup (e.g. `QBtn.props.noCaps = { type: Boolean, default: true }`).
   Keep every patch in one documented file.
3. `src/encola/overrides.css` — override CSS. **Quasar does NOT use CSS
   `@layer`** (unlike Vuetify 4): overrides win by source order + equal-or
   -greater specificity, so this file must be imported AFTER Quasar's CSS and
   selectors must match Quasar's specificity. Still **no `!important`** — if
   a rule loses, raise specificity by mirroring Quasar's own selector.
4. `src/encola/components/*.vue` — minimal wrappers only where Quasar's DOM
   is structurally Material (expected: `EFormField.vue` for static labels
   above fields — Quasar's `label` floats inside the field and `stack-label`
   is still inside the border, so the wrapper is required for the Nuxt-UI
   look).

Everything the theme owns lives in `src/encola/` (drop-in folder, relative
internal imports). Buyer code never goes inside it; upgrades replace the
folder wholesale.

## Design language (identical to the Vuetify sibling)

- Flat and compact. No box-shadows — 1px hairline borders + surface
  background steps convey depth. No ripple.
- Primary: indigo-500 `#6366f1` (indigo-400 in dark), generated from a hex +
  Tailwind neutral scale (slate default; also gray, zinc, neutral, stone,
  olive, mist — copy `palettes.ts` from the Vuetify project verbatim).
- Radii: buttons/inputs 4px, cards 8px. Buttons and inputs ~32px tall.
- Type: default text 14px, medium-weight buttons, **no uppercase**
  (`no-caps`), zero letter-spacing. Inter variable font.
- Focus: `focus-visible` primary ring only. Hover: color shifts with
  `transition-colors`.
- Dark mode is first-class: every page/component checked in both.

## Hard conventions

- **All dimensions in theme CSS/SCSS use rem** (16px root). Quasar SASS
  variables consumed by px arithmetic stay px with a comment, and their
  runtime effect is re-emitted in rem in `overrides.css` (same convention as
  the Vuetify sibling — see its `--v-btn-height` treatment).
- **Prefer static labels via `EFormField`** + `placeholder`; the floating
  `label` prop is supported but off-theme.
- Buttons: plain `QBtn` with props (`unelevated` is the solid look, `flat`,
  `outline`); never Material elevation. `no-caps` is defaulted globally.
- No `!important` anywhere. No page-scoped styling hacks in example pages —
  fix issues in the theme layers so every page benefits.
- Example pages use only themed Quasar components + the `E*` wrappers.

## Commands

- `pnpm run dev` / `pnpm run build` / `pnpm run lint`
- `pnpm run package` — store-ready zip via `git archive` (export-ignore
  internal files in `.gitattributes`: CLAUDE.md, PLAN.md, .idea, itself)

## Implementation flow

Work in small, incremental changes and commit after each one (one commit per
page, per theme-layer milestone, per fix). Verify against the installed
Quasar source (`node_modules/quasar/src/css/`, component `.sass` files)
before overriding anything — the Vuetify build succeeded by grepping the
real source for variable names, hardcoded px values, and DOM structure
instead of guessing.

## Verification workflow

Kitchen-sink page is the QA surface: check light AND dark after any theme
change; tab through forms (focus states leak Material the most). Before
release grep pages for `label=` on fields (wrapper convention), ripple,
elevation classes (`shadow-`, `q-hoverable` leftovers), `!important`.

## Positioning note

Do not use "Nuxt UI" or "Tailwind" in the package name or in a way implying
affiliation — describe the aesthetic ("flat, Tailwind-style theme for
Quasar"). Not affiliated with Quasar, Google, Tailwind Labs or Nuxt.
