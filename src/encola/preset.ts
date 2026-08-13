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
  QBtn,
  QCard,
  QEditor,
  QField,
  QFile,
  QInput,
  QRouteTab,
  QSelect,
  QTab,
  QTable,
  QUploader,
  setCssVar,
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
// Light values live on :root (config.brand at install, setCssVar after);
// dark values live in an injected body.body--dark rule, which wins over
// the :root/inline values by normal cascade when Dark mode is active.

const DARK_STYLE_ID = 'encola-dark-vars'

function injectDarkVars(dark: ThemeVars) {
  if (typeof document === 'undefined') return
  let el = document.getElementById(DARK_STYLE_ID) as HTMLStyleElement | null
  if (el === null) {
    el = document.createElement('style')
    el.id = DARK_STYLE_ID
    document.head.appendChild(el)
  }
  const vars = Object.keys(dark)
    .map((key) => `--q-${key}: ${dark[key]};`)
    .join(' ')
  el.textContent = `body.body--dark { ${vars} }`
}

/**
 * Re-theme a running app (used by the theme customizer). Shares
 * buildThemes with the encola() factory so the preview and the
 * "make permanent" blueprint can never drift apart.
 */
export function applyTheme(colors: EncolaColorOptions = {}) {
  const { light, dark } = buildThemes(colors)
  for (const key of Object.keys(light)) {
    setCssVar(key, light[key])
  }
  injectDarkVars(dark)
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

let defaultsPatched = false

function patchComponentDefaults() {
  if (defaultsPatched) return
  defaultsPatched = true

  // Buttons: solid flat look, never uppercase. Pages pass `outline`,
  // `flat` etc. per use; those design flags win over `unelevated`.
  defaultProp(QBtn, 'noCaps', Boolean, true)
  defaultProp(QBtn, 'unelevated', Boolean, true)
  defaultProp(QTab, 'noCaps', Boolean, true)
  defaultProp(QRouteTab, 'noCaps', Boolean, true)

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

  const { light, dark } = buildThemes(colors)
  injectDarkVars(dark)

  return {
    iconSet: lucideIconSet,
    config: {
      // hover/focus color shifts instead of Material ink ripples
      ripple: false,
      dark: false,
      brand: light,
    },
  }
}
