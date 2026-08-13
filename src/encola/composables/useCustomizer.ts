// Theme customizer state + live preview. Colors go through the same
// applyTheme()/buildThemes() code path the encola() factory uses (so
// the preview and the "make permanent" blueprint can never drift);
// the radius, compiled statically from quasar-variables.scss, previews
// via a small injected <style> tag covering the visible surfaces.
import { computed, effectScope, ref, watch } from 'vue'
import type { EffectScope } from 'vue'
import { applyTheme } from '../preset'
import { useContentWidth } from './useContentWidth'
import type { PaletteName } from '../palettes'

const HEX_RE = /^#[0-9a-f]{6}$/i

const DEFAULTS = {
  primary: '#6366f1',
  surface: 'slate' as PaletteName,
  radius: 4,
  contentWidth: 'compact' as const,
}

const open = ref(false)
const primary = ref(DEFAULTS.primary)
const surface = ref<PaletteName>(DEFAULTS.surface)
const radius = ref(DEFAULTS.radius)

// Watchers live in a detached effect scope so they survive the
// unmount/HMR of whichever component happened to call useCustomizer()
// first.
let scope: EffectScope | null = null

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    scope?.stop()
    scope = null
  })
}

export function useCustomizer() {
  const { contentWidth } = useContentWidth()

  const primaryValid = computed(() => HEX_RE.test(primary.value))

  if (!scope) {
    scope = effectScope(true)

    function applyColors() {
      applyTheme({
        primary: HEX_RE.test(primary.value) ? primary.value : undefined,
        surface: surface.value,
      })
    }

    // Radius is compiled statically from quasar-variables.scss, so the
    // live preview injects a style tag (appended last -> wins) covering
    // the visible surfaces. The permanent change is the variables file.
    function applyRadius(px: number) {
      let el = document.getElementById('e-customizer-radius') as HTMLStyleElement | null
      if (!el) {
        el = document.createElement('style')
        el.id = 'e-customizer-radius'
        document.head.appendChild(el)
      }
      // checkboxes track the control radius but stay subtle (cap 4px)
      el.textContent = `
.q-btn--rectangle, .q-btn--round, .q-field--outlined .q-field__control, .q-chip, .q-menu .q-item, .q-tooltip, .q-notification { border-radius: ${px}px; }
.q-card, .q-menu, .q-dialog__inner > div, .q-banner, .q-table__container { border-radius: ${px * 2}px; }
.q-checkbox__bg { border-radius: ${Math.min(px, 4)}px; }
`
    }

    scope.run(() => {
      watch([primary, surface], applyColors)
      watch(radius, (px) => applyRadius(Number(px) || 0))
    })
  }

  function reset() {
    primary.value = DEFAULTS.primary
    surface.value = DEFAULTS.surface
    radius.value = DEFAULTS.radius
    contentWidth.value = DEFAULTS.contentWidth
    applyTheme()
    document.getElementById('e-customizer-radius')?.remove()
  }

  return { open, primary, primaryValid, surface, radius, contentWidth, reset }
}
