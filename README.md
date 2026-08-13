# Encola — a flat, Tailwind-style theme for Quasar

Encola makes Quasar v2 look like a modern flat UI kit instead of Material
Design: hairline borders, slate neutrals, compact 32px controls, static
labels, no shadows, no ripple — while staying 100% standard Quasar.
Nothing is forked; everything is configuration.

- **Every Quasar component themed** — verified in light and dark on the
  built-in showcase pages.
- **Drop-in** — the entire theme lives in one folder (`src/encola/`) with
  relative internal imports. Copy it into an existing app or start from
  this starter.
- **Your options win** — `encola()` returns plain Quasar plugin options;
  spread them into your own `app.use(Quasar, …)` call and add anything on
  top.
- **Customizable at a glance** — pick a primary color and one of 7 Tailwind
  neutral scales; preview live with the built-in theme customizer.

## Quick start (this starter)

```bash
pnpm install
pnpm run dev
```

## Install into an existing app

1. Install the dependencies:

   ```bash
   pnpm add quasar @lucide/vue @fontsource-variable/inter
   pnpm add -D @quasar/vite-plugin sass-embedded
   ```

2. Copy `src/encola/` into your `src/`.

3. Point `@quasar/vite-plugin` at the theme's SASS variables in
   `vite.config.ts` (absolute path — the plugin injects the file into
   every Quasar style module):

   ```ts
   import { fileURLToPath, URL } from 'node:url'
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

4. Use the theme options where you install Quasar:

   ```ts
   import { Quasar } from 'quasar'
   import { encola } from '@/encola'

   app.use(Quasar, {
     ...encola({ primary: '#6366f1', surface: 'slate' }),
     // your own options here — plugins, config, ...
   })
   ```

   Importing from `@/encola` also pulls in Quasar's base styles, the Inter
   font and the theme's override CSS. Calling `encola()` patches the
   theme's component prop defaults (no-caps unelevated buttons, outlined
   dense fields, bordered flat cards) before the app mounts.

That's it. Your existing Quasar components pick up the new look. The one
convention to adopt: wrap fields in `EFormField` instead of passing `label`
(see [docs/conventions.md](docs/conventions.md)).

## What's included

- `src/encola/` — the theme: SASS variables, preset (prop defaults +
  generated themes), override CSS, lucide iconSet, `EFormField`, app-shell
  components (collapsible sidebar, theme customizer) and composables.
- Example pages — auth (login, register, forgot password, 2FA), dashboard,
  form layouts + wizard, data tables, users CRUD, settings, pricing, FAQ,
  404/500, and four UI showcase pages covering every component.

## Documentation

- [Installation](docs/installation.md)
- [Conventions](docs/conventions.md)
- [Customization](docs/customization.md)

## Positioning

Encola is an independent theme for Quasar. It is not affiliated with
Quasar, Google Material Design, Tailwind Labs or Nuxt.
