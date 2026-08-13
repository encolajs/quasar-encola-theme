# Store listing — product description

Encola turns Quasar v2 into a flat, Tailwind-style UI — no Material Design, no forks.

Quasar is the most complete Vue component library, but everything you build with it looks like Google made it. Encola fixes that. It restyles all of Quasar through configuration alone — SASS variables, component prop defaults, and one override stylesheet — so you keep the entire Quasar API, upgrade Quasar normally, and lose the Material look for good: hairline borders instead of shadows, compact 32px controls, static field labels, slate neutrals, zero ripple.

The look

- Flat and compact: 1px rings and surface steps convey depth — no box-shadows, no elevation, no ripple
- Static labels above fields (with help and error text), not floating Material labels
- Compact 32px buttons and inputs, 14px type with zero letter-spacing, subtle color-shift hovers, clean focus-visible rings
- First-class dark mode — every component verified in both themes, with readable dark-mode color pairings generated automatically
- Lucide icons everywhere — even Quasar's internal icons (dropdown arrows, clearables, table sorting, pagination) ship as tree-shakeable SVGs, no icon font, no @quasar/extras

Effortless to adopt

- The whole theme lives in one drop-in folder — copy it into an existing app, point the Quasar Vite plugin at it, done
- Ships as plain Quasar plugin options: spread them into your own `app.use(Quasar, …)` call and add anything on top — your options always win
- 100% standard Quasar — no wrapper components to learn, no forked packages, your existing screens just pick up the new look
- Pick your brand color (any hex) and one of 7 Tailwind neutral scales (slate, gray, zinc, neutral, stone, olive, mist); light and dark themes are generated for you
- Built-in theme customizer panel previews colors, radius and layout live, and prints paste-ready code

What's included

- The complete theme source (TypeScript, documented)
- Copy-paste-ready example pages: authentication (login, register, forgot password, 2FA), dashboard, form layouts + multi-step wizard, data tables, users CRUD, account settings, pricing, FAQ, 404/500
- Four UI showcase pages covering every Quasar input, navigation, overlay and feedback component
- A before/after page showing the same markup in stock Material Quasar and in Encola
- A collapsible app-shell sidebar (rail mode, mobile drawer, grouped navigation)
- Docs: installation (fresh or existing app), conventions, customization
- Lifetime updates included

Licensing

- $49 — one non-SaaS end product (yours or a client's)
- $399 — SaaS license

Requires Vue 3, Quasar v2 and Vite. Encola is an independent product, not affiliated with Quasar, Google, Tailwind Labs or Nuxt.

Check demo at https://encolajs.com/quasar-theme/
