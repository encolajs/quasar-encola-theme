// Single import for consumers.
//
// The theme is a set of Quasar plugin options — pass them to app.use:
//
//   import { Quasar } from 'quasar'
//   import { encola } from '@/encola'
//
//   app.use(Quasar, encola({ primary: '#e11d48', surface: 'zinc' }))
//
// Calling encola() also patches the Encola component prop defaults
// (no-caps unelevated buttons, outlined dense fields, bordered flat
// cards) — Quasar has no defaults API, so this happens once, before
// the app mounts. Props passed by pages still win.
import 'quasar/src/css/index.sass'
import '@fontsource-variable/inter'
import './overrides.css'

import type { QuasarPluginOptions } from 'quasar'
import { encolaOptions } from './preset'
import type { EncolaColorOptions } from './preset'

export { applyTheme, buildThemes } from './preset'
export type { EncolaColorOptions, ThemeVars } from './preset'
export { palettes, derivePrimary } from './palettes'
export type { PaletteName } from './palettes'
export { lucideIconSet } from './icons'
export { default as EFormField } from './components/EFormField.vue'

/** The Encola theme as Quasar plugin options. */
export function encola(
  colors: EncolaColorOptions = {},
): Partial<QuasarPluginOptions> {
  return encolaOptions(colors)
}
