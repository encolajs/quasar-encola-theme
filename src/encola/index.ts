// Single import for consumers.
//
// The theme is a set of Quasar plugin options — pass them to app.use:
//
//   import { Quasar } from 'quasar'
//   import { encola } from '@/encola'
//
//   app.use(Quasar, encola({ primary: '#e11d48', surface: 'zinc' }))
//
import 'quasar/src/css/index.sass'
import '@fontsource-variable/inter'

import type { QuasarPluginOptions } from 'quasar'

/** The Encola theme as Quasar plugin options. */
export function encola(): Partial<QuasarPluginOptions> {
  return {
    config: {
      ripple: false,
    },
  }
}
