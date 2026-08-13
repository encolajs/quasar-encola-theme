<script setup lang="ts">
// Right-hand drawer with live theme controls. Every change previews
// instantly; the instructions below show how to make it permanent.
import { computed } from 'vue'
import { RotateCcw, X } from '@lucide/vue'
import EFormField from './EFormField.vue'
import { useCustomizer } from '../composables/useCustomizer'
import { palettes } from '../palettes'
import type { PaletteName } from '../palettes'

const { open, primary, primaryValid, surface, radius, contentWidth, reset } =
  useCustomizer()

const paletteNames = Object.keys(palettes) as PaletteName[]

const rem = (px: number) => `${px / 16}rem`.replace('.0rem', 'rem')

const colorsSnippet = computed(() => {
  const primaryLine = primaryValid.value ? `\n    primary: '${primary.value}',` : ''
  return `// wherever you install Quasar (this starter: src/main.ts)
import { Quasar } from 'quasar'
import { encola } from '@/encola'

app.use(Quasar, {
  ...encola({${primaryLine}
    surface: '${surface.value}',
  }),
  // your own options here — plugins, config, ...
})`
})

const radiusSnippet = computed(() => {
  const px = Number(radius.value) || 0
  return `// src/encola/quasar-variables.scss (px-locked, keep px)
$generic-border-radius: ${px}px;
$button-border-radius: ${rem(px)};

/* src/encola/overrides.css — rem re-emits + floating surfaces */
/* controls: */ border-radius: ${rem(px)};
/* cards, menus, dialogs: */ border-radius: ${rem(px * 2)};`
})
</script>

<template>
  <q-drawer
    v-model="open"
    side="right"
    overlay
    behavior="mobile"
    :width="360"
    bordered
    class="e-customizer"
  >
    <div class="e-customizer__header">
      <span class="e-customizer__title">Customize theme</span>
      <div class="row q-gutter-xs">
        <q-btn flat round size="sm" aria-label="Reset to defaults" @click="reset">
          <RotateCcw :size="16" />
        </q-btn>
        <q-btn flat round size="sm" aria-label="Close" @click="open = false">
          <X :size="16" />
        </q-btn>
      </div>
    </div>
    <q-separator />

    <!-- no-wrap: Quasar's .column wraps by default, and a wrapped
         column sizes its line to the widest content — the code blocks
         would widen the drawer instead of scrolling -->
    <div class="q-pa-md column no-wrap q-gutter-y-md">
      <EFormField
        label="Primary color"
        :error="primaryValid ? undefined : 'Enter a 6-digit hex value, e.g. #6366f1.'"
      >
        <q-input v-model="primary" placeholder="#6366f1" maxlength="7">
          <template #prepend>
            <span
              class="e-customizer__swatch"
              :style="{ background: primaryValid ? primary : 'transparent' }"
            />
          </template>
        </q-input>
      </EFormField>

      <EFormField label="Surface color" help="Tailwind neutral scales.">
        <q-select v-model="surface" :options="paletteNames">
          <template #option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section avatar>
                <span
                  class="e-customizer__swatch"
                  :style="{ background: palettes[opt as PaletteName][500] }"
                />
              </q-item-section>
              <q-item-section>{{ opt }}</q-item-section>
            </q-item>
          </template>
        </q-select>
      </EFormField>

      <EFormField label="Border radius" help="Buttons and inputs; cards scale 2x.">
        <q-input v-model.number="radius" type="number" min="0" max="24" suffix="px" />
      </EFormField>

      <EFormField label="Content width">
        <q-option-group
          v-model="contentWidth"
          type="radio"
          :options="[
            { label: 'Compact', value: 'compact' },
            { label: 'Wide', value: 'wide' },
          ]"
        />
      </EFormField>

      <q-separator />

      <div>
        <div class="e-customizer__title q-mb-sm">Make it permanent</div>
        <p class="text-caption q-mb-md" style="opacity: 0.7">
          The preview only patches the running theme. Apply the values below
          in the theme source files, then restart the dev server.
        </p>

        <div class="column no-wrap q-gutter-y-md">
          <div>
            <div class="e-customizer__step q-mb-xs">1. Colors — the blueprint</div>
            <pre class="e-customizer__code">{{ colorsSnippet }}</pre>
          </div>
          <div>
            <div class="e-customizer__step q-mb-xs">2. Border radius</div>
            <pre class="e-customizer__code">{{ radiusSnippet }}</pre>
          </div>
        </div>
      </div>
    </div>
  </q-drawer>
</template>
