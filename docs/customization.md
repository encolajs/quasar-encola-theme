# Customization

The theme customizer (sliders icon in the top bar) previews every option
below live and prints paste-ready snippets.

## Colors — the theme factory

Both themes are generated from two inputs:

```ts
app.use(Quasar, {
  ...encola({
    primary: '#e11d48',  // any 6-digit hex
    surface: 'zinc',     // slate | gray | zinc | neutral | stone | olive | mist
  }),
})
```

- **primary** — the hex is used as-is in light mode; dark mode gets an
  auto-lightened variant, hover shades are derived (darken 15% light /
  lighten 10% dark), and `on-primary` flips to dark text for very light
  brand colors.
- **surface** — one of the 7 Tailwind neutral scales (values in
  `src/encola/palettes.ts`). It drives backgrounds, the muted/elevated/
  accented surface steps, borders, rings, body text, `secondary` and the
  inverted `neutral` button color, in both themes.

Every token is a `--q-*` CSS variable (light on `:root`, dark in a
`body.body--dark` rule, both in one injected style tag). Re-theme a
running app with the same code path the customizer uses:

```ts
import { applyTheme } from '@/encola'
applyTheme({ primary: '#e11d48', surface: 'zinc' })
```

Anything finer-grained: call `buildThemes()` yourself, adjust the result,
and inject it — or simply override individual `--q-*` variables in your
own CSS after the theme loads.

### Semantic colors

`positive`, `info`, `warning`, `negative` are fixed (green/blue/amber/red
500 in light, 400 in dark with deep `on-*` text pairings) and independent
of the primary. Override their `--q-*` variables if needed.

## Border radius

Radius is compiled SASS — edit `src/encola/quasar-variables.scss`:

```scss
$generic-border-radius: 4px;      // px-locked: QChip does SASS math on it
$button-border-radius: 0.25rem;
```

The rem re-emits and the floating-surface radius (cards, menus, dialogs
at 2x) live in `overrides.css`; checkboxes track the control radius but
cap at 4px. The customizer prints all the lines to change for any value.

## Typography

- Font: `$typography-font-family` in `quasar-variables.scss`. The Inter
  variable font is bundled via `@fontsource-variable/inter`.
- Scale: the `$h1`…`$caption` maps in `quasar-variables.scss`
  (letter-spacing zeroed everywhere, semibold headings).
- Default text size is 0.875rem (14px) via `$body-font-size`.

## Content width

```ts
import { useContentWidth } from '@/encola/composables/useContentWidth'

const { contentWidth } = useContentWidth() // 'compact' | 'wide'
```

The default layout binds the resulting class; `compact` caps content at
1200px (pages can narrow further with `e-page-narrow` / `e-page-narrow--sm`),
`wide` lifts every cap.

## Component defaults

Quasar has no defaults API, so the theme patches prop definitions once,
pre-mount (see `patchComponentDefaults` in `src/encola/preset.ts`). To
change a default, edit it there; to override per-use, just pass the prop —
template props always win over a patched default.

## Dark mode

Both themes ship generated and in sync. Toggle with Quasar's standard API
(`$q.dark.toggle()`); the starter's layout persists the choice to
localStorage.
