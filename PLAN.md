# quasar-encola-theme — Plan

## What this is

A **downloadable Quasar v2 theme/template** (zip, sold on the Encola store)
that makes Quasar look like a flat, Tailwind-style UI instead of Material
Design: hairline borders, slate neutrals, compact 32px controls, static
labels, no shadows, no ripple. The download is a complete Vite + Vue 3 +
Quasar starter: theme core (`src/encola/`) + a lean set of example pages.

Sibling of `../vuetify-encola-theme` (built first — **read its source when
in doubt**; the design language, palettes, docs structure, license, pricing
and packaging are shared). Same positioning: "the only Quasar theme that
isn't Material", competitive at $49 lifetime / non-SaaS ($399 SaaS).

## Why it should work (to be re-verified against quasar source)

Quasar is Material-styled but heavily configurable:

1. **SASS variables** — Quasar exposes `$primary`..`$negative`,
   `$generic-border-radius`, `$button-border-radius`, `$button-push-*`,
   `$typography-font-family`, `$input-*` and many per-component variables.
   `@quasar/vite-plugin`'s `sassVariables` option points at our file.
   ⚠️ Verify each name in `node_modules/quasar/src/css/variables.sass` and
   the component `.sass` files — never trust memory (this discipline is what
   made the Vuetify build smooth).
2. **Plugin config** — `ripple: false` globally via Quasar config; brand
   colors are runtime CSS vars (`--q-primary`, settable via `setCssVar`) so
   a Vuetify-style `encola({ primary, surface })` factory is feasible:
   generate light/dark brand + surface tokens from `palettes.ts` (copy
   verbatim from the Vuetify project — Tailwind v4 hex scales incl. olive
   and mist).
3. **Component default props** — Quasar has NO defaults API. Patch prop
   defaults once in a boot module (`QBtn.props.noCaps`, `QBtn.props.unelevated`,
   `QInput.props.outlined`, `QInput.props.dense`, ...). Centralize + comment.
4. **Override CSS** — ⚠️ Quasar does NOT use `@layer` (the Vuetify 4 luxury
   is gone). `overrides.css` is imported after Quasar's CSS and wins by
   source order at equal specificity; mirror Quasar's own selectors when a
   rule loses. `!important` stays banned.
5. **Icons** — no built-in lucide set. Two options to evaluate in Phase 1:
   (a) a custom Quasar `iconSet` mapping Quasar's internal icon names to
   lucide SVG path strings (QIcon supports raw `"M...|0 0 24 24"` values) —
   preferred, tree-shakeable; (b) an svguse sprite. Page-level icons use
   `@lucide/vue` components directly.

**The irreducible part (wrappers + conventions):**
- Floating labels: Quasar's `label` floats inside the field; `stack-label`
  stays inside the border. Ship `EFormField.vue` (port from Vuetify sibling:
  label/help/error/required/for, `horizontal` + `label-width`).
- Height math: expect Quasar's own hardcoded px (field heights, dense
  paddings) to fight the 32px target — find the real numbers in the source
  like we did for Vuetify's `--v-input-padding-top: 16px` floating-label
  headroom.

## Design targets (copy from the Vuetify sibling — keep the two in sync)

Colors, radii, type, focus, states: see `../vuetify-encola-theme/CLAUDE.md`
"Design language" + `src/encola/palettes.ts` + `preset.ts` (`buildThemes`).
Same values, same names (`surface-muted/elevated/accented`, `ring`,
`neutral`, `primary-hover`), rem everywhere per the rem convention.

## Deliverable structure

```
quasar-encola-theme/
├── CLAUDE.md / PLAN.md          (export-ignored from the zip)
├── README.md, LICENSE.md, docs/ (port from Vuetify sibling, adjust)
├── package.json                 (dev/build/build:demo/lint/package scripts)
├── vite.config.ts               (@quasar/vite-plugin + sassVariables)
├── src/
│   ├── encola/                  ← the product, drop-in, relative imports
│   │   ├── quasar-variables.scss
│   │   ├── preset.ts            (config + install fn + defaults patching)
│   │   ├── palettes.ts          (verbatim copy from Vuetify sibling)
│   │   ├── icons.ts             (lucide iconSet)
│   │   ├── overrides.css
│   │   ├── components/          (EFormField, AppSidebar, ThemeCustomizer)
│   │   └── composables/         (useSidebar, useCustomizer, useContentWidth)
│   ├── layouts/ (QLayout shell), pages/, router/, main.ts
└── ...
```

## Example pages (lean — decided policy, do not add more)

Auth (login, register, forgot, 2FA), dashboard, form layouts (+ horizontal
+ Material-behaviour demo), form wizard, invoices QTable, users CRUD,
settings, pricing, FAQ, 404/500, kitchen sink, before/after comparison
page, and the four UI showcase pages (Form Fields / Navigation / Overlays /
Feedback) — mirroring the Vuetify sibling 1:1 where Quasar has equivalents
(QTable ≈ VDataTable, QDialog, QDrawer, QTooltip, QBanner/QNotify ≈
alerts/snackbars, QSkeleton, QLinearProgress/QCircularProgress...).

## Phases

### Phase 1 — Theme core (go/no-go on visual fidelity)
Scaffold Vite + Quasar plugin; variables file, preset (config + defaults
boot + `encola({ primary, surface })` factory), overrides.css, lucide
iconSet, EFormField; kitchen-sink page. Compare side-by-side with the
deployed Vuetify Encola demo — the two products must look identical.
**Checkpoint: if a Quasar component cannot be de-materialized without
forking, list it and decide.**

### Phase 2 — App shell + example pages
QLayout shell (collapsible sidebar w/ rail + mobile drawer, header with
theme toggle + customizer + Buy now), then pages in the order above, one
commit each.

### Phase 3 — Packaging & distribution
Port docs/ + README + LICENSE from the sibling; `.gitattributes`
export-ignore; `pnpm run package`; `build:demo` with
`--base=/quasar-theme/` (deploy target: encolajs.com/quasar-theme/);
product description; buy button URL.

## Lessons imported from the Vuetify build (apply from day one)

1. **Grep the installed source, never guess** — variable names, hardcoded
   px values, DOM structure, default prop values.
2. **rem convention** — px-locked SASS values stay px with a comment; re-emit
   runtime CSS vars in rem in overrides.css. Document it in CLAUDE.md.
3. **Deprecated lucide package** — use `@lucide/vue`; no brand icons
   (no Twitter).
4. **Menus near viewport edges** — check Quasar's QMenu positioning against
   activator alignment (Vuetify needed `stickToTarget`).
5. **Floating-label geometry hides in hardcoded px** — hunt for the Quasar
   equivalents of `--v-input-padding-top: 16px` / no-label `padding-bottom:
   16px` before fighting symptoms.
6. **Keep the customizer's "make permanent" output and the theme factory the
   same code path** (`buildThemes` shared by preview and blueprint).
7. **Buttons inside action bars** — check QCardActions & friends for
   injected defaults that override globals (Vuetify's VCardActions forces
   text variant).
8. **Demo-only concerns stay out of the product**: base path via a
   `build:demo` script not vite config; Buy-now URL in the layout; the
   before/after page's Material-simulation CSS is page-scoped by design.
9. **Ask the user early** when options are ambiguous (env names, rail
   behavior, palettes) — cheap questions beat rework.

## Verification

- Kitchen sink light AND dark vs the Vuetify Encola demo side by side.
- Keyboard-tab every form; focus-visible rings, no Material halos.
- Release greps per CLAUDE.md.
- `pnpm run build` + `pnpm run package` clean.
