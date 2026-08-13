# Conventions

Encola restyles Quasar through configuration, so a few Material behaviors
survive as *conventions* rather than hard removals. Follow these and
nothing Material leaks through.

## Fields: static labels via EFormField

Quasar's `label` prop renders a **floating label** — it's structural
Material and cannot be styled into a static label. Wrap fields instead:

```vue
<EFormField label="Email" required help="We'll never share it." :error="errors.email">
  <q-input v-model="email" placeholder="you@example.com" />
</EFormField>
```

- `label`, `help`, `error` (string or array — first entry shown),
  `required` (asterisk), `for` (optional; otherwise clicking the label
  focuses the first control in the slot).
- An error tints the field's ring red automatically.
- Horizontal layout: `<EFormField horizontal label-width="10rem" …>` puts
  the label in a fixed-width left column (default 25%); label-less rows
  stay aligned in the field column. `--e-form-field-label-width` can also
  be set once on a form container.

**The `label` prop still works** if you want Material behavior: labeled
fields automatically keep Quasar's taller float geometry. It's supported,
but off-theme — prefer `EFormField`.

### Select placeholders

QSelect ignores `placeholder` unless `use-input` is set. For plain
selects, render one through the `#selected` slot:

```vue
<q-select v-model="team" :options="options">
  <template #selected>
    <span v-if="!team" class="e-select-placeholder">Pick a team</span>
    <template v-else>{{ team }}</template>
  </template>
</q-select>
```

## Buttons

Plain `QBtn` with props — no custom components to learn:

| Look | Usage |
| --- | --- |
| solid | `<q-btn color="primary">` (unelevated is defaulted globally) |
| soft | `<q-btn flat color="primary" class="e-btn-soft">` |
| outline | `<q-btn outline>` |
| ghost | `<q-btn flat>` |
| danger | `<q-btn color="negative">` |

Solid buttons pair their text with the theme's `on-<color>` tokens
automatically (readable dark text on the 400-shade fills in dark mode).
Never re-enable elevation — there is no elevated look in this theme.

## Never re-enable Material

- No shadow utility classes (`shadow-1` …) — depth comes from 1px
  hairlines and surface background steps (`surface-muted` /
  `surface-elevated` / `surface-accented`).
- No `ripple` — the preset disables it globally via `config.ripple`.
- No `!important` in any CSS. Quasar does **not** use `@layer`:
  `overrides.css` wins by being imported after Quasar's CSS at
  equal-or-greater specificity. If an override doesn't stick, mirror
  Quasar's own selector (including its `body.desktop` prefixes) instead
  of reaching for `!important`.

## Dimensions are rem

All theme CSS/SCSS uses rem (16px root). Quasar SASS variables that go
through px arithmetic stay px in `quasar-variables.scss` with a
"px-locked" comment, and their runtime effect is re-emitted in rem in
`overrides.css` (control heights, radii, toggle geometry, list item
heights).

## Icons

The theme ships a lucide iconSet as raw QIcon SVG strings — no icon font,
no `@quasar/extras`. Quasar's internal icons (dropdown arrows, clearable
crosses, table sort arrows, pagination chevrons, …) are all lucide
automatically. For your own icons, use `@lucide/vue` components directly:

```vue
<script setup>
import { Search } from '@lucide/vue'
</script>

<template>
  <q-btn color="primary">
    <Search :size="16" class="q-mr-sm" />
    Search
  </q-btn>
</template>
```

## Verification workflow

After any theme-layer change, open the kitchen-sink page in light **and**
dark (`/kitchen-sink?dark` starts dark) and tab through forms with the
keyboard — focus states are where Material leaks through most. Before
release:

```bash
grep -rn 'ripple\|shadow-' src/pages/   # should be empty
grep -rn '!important' src/encola/       # only comments
grep -rn 'label="' src/pages/ | grep -E 'q-input|q-select'
                                        # only the Material demos
```
