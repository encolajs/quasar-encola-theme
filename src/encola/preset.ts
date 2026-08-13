// =============================================================
// Layers 2–3 — the Encola blueprint: Quasar plugin options + component
// prop defaults + runtime themes, generated from a primary color and a
// Tailwind neutral scale.
//
// Quasar has no Vuetify-style `defaults` system, so default props are
// patched onto the component definitions once, before the app mounts
// (patchComponentDefaults below). Anything a page passes explicitly
// still wins — a patched default is just a prop default.
//
// Theme tokens ride Quasar's own brand mechanism: every key returned
// by buildThemes() becomes a --q-<name> CSS var (config.brand emits
// them on :root; the dark values are injected as a body.body--dark
// block). The customizer and this factory share buildThemes/applyTheme
// as their single code path.
// =============================================================
import type { QuasarPluginOptions } from 'quasar'
import {
  QBadge,
  QBtn,
  QBtnDropdown,
  QBtnToggle,
  QCard,
  QChip,
  QEditor,
  QField,
  QFile,
  QInput,
  QRouteTab,
  QSelect,
  QTab,
  QTable,
  QUploader,
} from 'quasar'
import { derivePrimary, palettes } from './palettes'
import type { PaletteName } from './palettes'
import { lucideIconSet } from './icons'

export interface EncolaColorOptions {
  /** brand color as a 6-digit hex; dark mode gets an auto-lightened variant */
  primary?: string
  /** Tailwind neutral scale for surfaces, borders and text */
  surface?: PaletteName
}

export type ThemeVars = Record<string, string>

export function buildThemes({
  primary = '#6366f1', // indigo-500
  surface = 'slate',
}: EncolaColorOptions = {}): { light: ThemeVars; dark: ThemeVars } {
  const p = palettes[surface]
  const d = derivePrimary(primary)

  const light: ThemeVars = {
    primary: d.light.primary,
    'primary-hover': d.light.hover,
    'on-primary': d.light.on,
    secondary: p[500],
    'on-secondary': '#ffffff',
    accent: d.light.primary,

    positive: '#22c55e', // green-500
    'on-positive': '#ffffff',
    info: '#3b82f6', // blue-500
    'on-info': '#ffffff',
    warning: '#f59e0b', // amber-500
    'on-warning': '#ffffff',
    negative: '#ef4444', // red-500
    'on-negative': '#ffffff',
    'negative-hover': '#dc2626',

    neutral: p[900], // "inverted" solid buttons
    'on-neutral': '#ffffff',
    'neutral-hover': p[800],

    surface: '#ffffff',
    'surface-muted': p[50],
    'surface-elevated': p[100],
    'surface-accented': p[200],
    'on-surface': p[700],
    'on-surface-variant': p[600],
    border: p[200],
    ring: p[300],

    // Quasar's dark-surface tokens; flat design keeps them equal
    dark: p[900],
    'dark-page': p[900],
  }

  const dark: ThemeVars = {
    primary: d.dark.primary,
    'primary-hover': d.dark.hover,
    'on-primary': d.dark.on,
    secondary: p[400],
    'on-secondary': p[900],
    accent: d.dark.primary,

    positive: '#4ade80', // green-400
    'on-positive': '#052e16',
    info: '#60a5fa', // blue-400
    'on-info': '#172554',
    warning: '#fbbf24', // amber-400
    'on-warning': '#451a03',
    negative: '#f87171', // red-400
    'on-negative': '#450a0a',
    'negative-hover': '#ef4444',

    neutral: '#ffffff',
    'on-neutral': p[900],
    'neutral-hover': p[200],

    surface: p[900],
    'surface-muted': p[800],
    'surface-elevated': p[800],
    'surface-accented': p[700],
    'on-surface': p[200],
    'on-surface-variant': p[300],
    border: p[800],
    ring: p[700],

    dark: p[900],
    'dark-page': p[900],
  }

  return { light, dark }
}

// ---- runtime application -------------------------------------------
// Both themes live in ONE injected style tag: light values on :root,
// dark values in a body.body--dark rule that wins by normal cascade.
// Quasar's own config.brand is deliberately NOT used — its Body plugin
// applies brand colors as inline styles on <body> (via setCssVar),
// which no stylesheet rule can override, killing the dark swap.

const THEME_STYLE_ID = 'encola-theme-vars'

function cssBlock(vars: ThemeVars): string {
  return Object.keys(vars)
    .map((key) => `--q-${key}: ${vars[key]};`)
    .join(' ')
}

function injectThemeVars(light: ThemeVars, dark: ThemeVars) {
  if (typeof document === 'undefined') return
  let el = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null
  if (el === null) {
    el = document.createElement('style')
    el.id = THEME_STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent =
    `:root { ${cssBlock(light)} }\n` +
    `body.body--dark { ${cssBlock(dark)} }`
}

/**
 * Re-theme a running app (used by the theme customizer). Shares
 * buildThemes with the encola() factory so the preview and the
 * "make permanent" blueprint can never drift apart.
 */
export function applyTheme(colors: EncolaColorOptions = {}) {
  const { light, dark } = buildThemes(colors)
  injectThemeVars(light, dark)
}

// ---- component prop defaults ---------------------------------------

type PropType = BooleanConstructor | StringConstructor
type PatchableComponent = { props: Record<string, unknown> }

// Replaces a prop declaration with an equivalent one carrying a default.
// Works for both shorthand (`noCaps: Boolean`) and object declarations;
// must run before the app mounts (Vue normalizes props on first render).
function defaultProp(
  component: unknown,
  prop: string,
  type: PropType,
  value: boolean | string,
) {
  const target = component as PatchableComponent
  const current = target.props[prop]
  target.props[prop] =
    typeof current === 'object' && current !== null
      ? { ...current, default: value }
      : { type, default: value }
}

// Colors that have a paired on-<color> readable-text token in the theme
const onColors = new Set([
  'primary',
  'secondary',
  'positive',
  'negative',
  'info',
  'warning',
  'neutral',
])

// Boolean-ish check for raw (unnormalized) prop values: a bare attribute
// arrives as '' which is falsy in JS but true to Vue
const rawTrue = (value: unknown) => value === '' || value === true

// Solid colored components read their text color from the paired on-*
// token instead of Quasar's hardcoded white — that's what keeps dark
// mode's 400-shade fills readable (deep text, like the Vuetify sibling).
// Vue calls a function default with the raw props, so the default can
// depend on `color` and skip flat/outline designs (their text IS the color).
function onColorTextDefault(raw: Record<string, unknown>): string | undefined {
  if (rawTrue(raw.flat) || rawTrue(raw.outline)) return undefined
  return typeof raw.color === 'string' && onColors.has(raw.color)
    ? `on-${raw.color}`
    : undefined
}

let defaultsPatched = false

function patchComponentDefaults() {
  if (defaultsPatched) return
  defaultsPatched = true

  // Buttons: solid flat look, never uppercase. Pages pass `outline`,
  // `flat` etc. per use; those design flags win over `unelevated`.
  defaultProp(QBtn, 'noCaps', Boolean, true)
  defaultProp(QBtn, 'unelevated', Boolean, true)
  // QBtnDropdown declares its own copy of the button props, and Vue
  // resolves declared Boolean props to false (not undefined), which it
  // then forwards to its inner QBtn — so it needs the same patches
  defaultProp(QBtnDropdown, 'noCaps', Boolean, true)
  defaultProp(QBtnDropdown, 'unelevated', Boolean, true)
  defaultProp(QTab, 'noCaps', Boolean, true)
  defaultProp(QRouteTab, 'noCaps', Boolean, true)
  defaultProp(QBtnToggle, 'noCaps', Boolean, true)
  defaultProp(QBtnToggle, 'unelevated', Boolean, true)

  // readable text on solid fills, driven by the on-* tokens
  for (const solid of [QBtn, QBtnDropdown, QBadge, QChip]) {
    ;(solid as unknown as PatchableComponent).props.textColor = {
      type: String,
      default: onColorTextDefault,
    }
  }

  // Fields: outlined + dense is the 32px Encola field. The floating
  // `label` prop stays supported but off-theme — use EFormField.
  for (const field of [QInput, QSelect, QFile, QField]) {
    defaultProp(field, 'outlined', Boolean, true)
    defaultProp(field, 'dense', Boolean, true)
  }

  // Cards and surface components: hairline border instead of shadow
  defaultProp(QCard, 'flat', Boolean, true)
  defaultProp(QCard, 'bordered', Boolean, true)
  defaultProp(QTable, 'flat', Boolean, true)
  defaultProp(QUploader, 'flat', Boolean, true)
  defaultProp(QUploader, 'bordered', Boolean, true)
  defaultProp(QEditor, 'flat', Boolean, true)
}

// ---- the blueprint --------------------------------------------------

export function encolaOptions(
  colors: EncolaColorOptions = {},
): Partial<QuasarPluginOptions> {
  patchComponentDefaults()
  applyTheme(colors)

  return {
    iconSet: lucideIconSet,
    config: {
      // hover/focus color shifts instead of Material ink ripples
      ripple: false,
      dark: false,
      // Notify hardcodes textColor 'white' (an !important color class);
      // default it to the theme's text token instead. Colored toasts
      // pass their on-* pairing: { color: 'positive', textColor: 'on-positive' }
      notify: { textColor: 'on-surface' },
    },
  }
}
