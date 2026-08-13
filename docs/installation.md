# Installation

Encola supports two installation paths: starting from this starter, or
dropping the theme into an existing Quasar (or soon-to-be-Quasar) app.

## Path A — use the starter

```bash
pnpm install
pnpm run dev     # dev server with example pages
pnpm run build   # production build
pnpm run lint
```

Delete the example pages you don't need (`src/pages/`, routes in
`src/router/index.ts`, entries in `src/encola/components/AppSidebar.vue`).
The theme itself lives entirely in `src/encola/` — leave that folder alone
so future theme updates are a wholesale folder replacement.

## Path B — existing app

The starter is a plain Vite app using `@quasar/vite-plugin` — not Quasar
CLI. The theme works in a Quasar CLI app too (point
`quasar.config > css/sassVariables` handling at the same files), but the
instructions below assume the Vite plugin.

### 1. Dependencies

```bash
pnpm add quasar @lucide/vue @fontsource-variable/inter
pnpm add -D @quasar/vite-plugin sass-embedded
```

Versions this theme is developed against: `quasar ^2.24`,
`@quasar/vite-plugin ^2.0`, `vue ^3.5`, `vite ^8`.

### 2. Copy the theme folder

Copy `src/encola/` into your `src/`. All internal imports are relative, so
it works with or without the `@` alias.

### 3. Vite config

`@quasar/vite-plugin` must compile Quasar's SASS through the theme's
variables file — this is what applies the brand seeds, radius, typography
and component dimensions. The path must be absolute (the plugin injects
the file into every Quasar style module by path):

```ts
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: fileURLToPath(
        new URL('./src/encola/quasar-variables.scss', import.meta.url),
      ),
    }),
  ],
})
```

Keep `quasar-variables.scss` definitions-only (plain `$var: value;`
lines) — the plugin then uses a fast targeted-injection path.

### 4. Install Quasar with the theme options

```ts
// src/main.ts
import { Dialog, Notify, Quasar } from 'quasar'
import { encola } from '@/encola'

app.use(Quasar, {
  ...encola({
    primary: '#6366f1',   // any 6-digit hex
    surface: 'slate',     // slate | gray | zinc | neutral | stone | olive | mist
  }),
  plugins: { Dialog, Notify }, // your Quasar plugins
  // any other Quasar options — yours win over the spread theme options
})
```

Calling `encola()` does three things, all before the app mounts:

1. Returns Quasar plugin options: the lucide `iconSet` and `config`
   (ripple off, Notify text defaults).
2. Injects the theme's CSS variables (`--q-*`) for light and dark as one
   style tag.
3. Patches the theme's component prop defaults (no-caps unelevated
   buttons, outlined dense fields, bordered flat cards). Props you pass in
   templates always win over a patched default.

> Importing anything from `@/encola` has side effects on purpose: it loads
> `quasar/src/css/index.sass`, the Inter variable font and the theme's
> `overrides.css`.

### 5. Optional pieces

Everything below is opt-in — unused files tree-shake to nothing:

- `EFormField` (`@/encola/components/EFormField.vue`) — static labels;
  effectively required for forms, see [conventions](conventions.md).
- `AppSidebar` + `useSidebar` — collapsible app-shell sidebar (rail via
  Quasar's mini mode).
- `ThemeCustomizer` + `useCustomizer` — live theme preview drawer.
- `useContentWidth` — compact/wide main-content switch (pairs with the
  `.e-content--*` / `.e-page-narrow` classes in `overrides.css`).

## Upgrading the theme

Your code should never live inside `src/encola/`. To upgrade, replace the
folder with the new version and re-run your visual QA (the kitchen-sink
page, if you kept it).
