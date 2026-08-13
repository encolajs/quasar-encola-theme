<script setup lang="ts">
// Before/after: the same UI in stock-Material Quasar vs Encola.
// The left column redefines the --q-* vars for its subtree (Material
// palette) and the .e-before CSS below deliberately UNDOES the theme
// for that subtree — shadows, uppercase buttons, floating labels,
// Material geometry. That CSS is a simulation aid for this page only
// and is not part of the theme; don't copy it.
import { ref } from 'vue'
import EFormField from '@/encola/components/EFormField.vue'

const beforeTab = ref('account')
const afterTab = ref('account')
const beforeAgree = ref(true)
const afterAgree = ref(true)
const beforeNotify = ref(true)
const afterNotify = ref(true)

const beforeForm = ref({ name: '', email: '', password: '' })
const afterForm = ref({ name: '', email: '', password: '' })
</script>

<template>
  <div class="column q-gutter-y-lg">
    <div>
      <h1 class="text-h5 q-my-none">Before / after</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        The same markup twice: stock Quasar's Material look on the left,
        Encola on the right. Nothing is forked — the difference is pure
        configuration.
      </p>
    </div>

    <div class="row q-col-gutter-md">
      <!-- BEFORE: stock Material (simulated) -->
      <div class="col-12 col-lg-6">
        <div class="text-subtitle2 q-mb-sm" style="opacity: 0.6">
          Stock Quasar (Material)
        </div>
        <div class="e-before e-compare-pane q-pa-lg">
          <q-card style="max-width: 420px" class="q-mx-auto">
            <q-card-section>
              <div class="text-h6">Create an account</div>
              <div class="text-caption" style="opacity: 0.6">Start your 14-day free trial</div>
            </q-card-section>
            <q-card-section class="column q-gutter-y-sm q-pt-none">
              <q-input v-model="beforeForm.name" label="Full name" filled />
              <q-input v-model="beforeForm.email" label="Email" filled type="email" />
              <q-input v-model="beforeForm.password" label="Password" filled type="password" />
              <q-checkbox v-model="beforeAgree" label="I agree to the terms and conditions" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" />
              <q-btn color="primary" label="Sign up" />
            </q-card-actions>
          </q-card>

          <div class="column q-gutter-y-md q-mx-auto q-mt-lg" style="max-width: 420px">
            <q-tabs v-model="beforeTab" align="left">
              <q-tab name="account" label="Account" />
              <q-tab name="billing" label="Billing" />
              <q-tab name="team" label="Team" />
            </q-tabs>
            <div class="row wrap items-center q-gutter-sm">
              <q-chip class="e-before__chip-primary">Primary</q-chip>
              <q-chip>Default</q-chip>
              <q-toggle v-model="beforeNotify" label="Notifications" class="q-ml-sm" />
            </div>
            <q-banner class="e-before__alert">Your changes have been saved.</q-banner>
          </div>
        </div>
      </div>

      <!-- AFTER: Encola -->
      <div class="col-12 col-lg-6">
        <div class="text-subtitle2 q-mb-sm" style="opacity: 0.6">Encola</div>
        <div class="e-compare-pane q-pa-lg">
          <q-card style="max-width: 420px" class="q-mx-auto">
            <q-card-section>
              <div class="text-subtitle1">Create an account</div>
              <div class="text-caption" style="opacity: 0.7">Start your 14-day free trial</div>
            </q-card-section>
            <q-card-section class="column q-gutter-y-md q-pt-none">
              <EFormField label="Full name" required>
                <q-input v-model="afterForm.name" placeholder="Jane Cooper" />
              </EFormField>
              <EFormField label="Email" required>
                <q-input v-model="afterForm.email" placeholder="you@example.com" type="email" />
              </EFormField>
              <EFormField label="Password" required help="At least 8 characters.">
                <q-input v-model="afterForm.password" placeholder="••••••••" type="password" />
              </EFormField>
              <q-checkbox v-model="afterAgree" label="I agree to the terms and conditions" />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" />
              <q-btn color="primary" label="Sign up" />
            </q-card-actions>
          </q-card>

          <div class="column q-gutter-y-md q-mx-auto q-mt-lg" style="max-width: 420px">
            <q-tabs v-model="afterTab" align="left">
              <q-tab name="account" label="Account" />
              <q-tab name="billing" label="Billing" />
              <q-tab name="team" label="Team" />
            </q-tabs>
            <div class="row wrap items-center q-gutter-sm">
              <q-chip class="bg-primary text-on-primary">Primary</q-chip>
              <q-chip>Default</q-chip>
              <q-toggle v-model="afterNotify" label="Notifications" class="q-ml-sm" />
            </div>
            <q-banner class="e-alert e-alert--positive">Your changes have been saved.</q-banner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Comparison-page-only CSS. The .e-before block counter-acts the theme's
   overrides to simulate stock Material Quasar for the left column. It is
   NOT part of the theme — never copy it into an app. */
.e-compare-pane {
  border: 1px solid var(--q-border);
  border-radius: 0.5rem;
}

/* Material palette for the subtree */
.e-before {
  --q-primary: #1976d2;
  --q-positive: #21ba45;
  font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.e-before .q-btn {
  text-transform: uppercase;
  letter-spacing: 0.0892857143em;
  border-radius: 3px;
  min-height: 2.572em;
  padding: 4px 16px;
}

.e-before .q-btn--unelevated {
  box-shadow:
    0 1px 5px rgba(0, 0, 0, 0.2),
    0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.e-before .q-card {
  border: none;
  border-radius: 4px;
  box-shadow:
    0 1px 5px rgba(0, 0, 0, 0.2),
    0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

/* Material's 56px filled fields with floating labels */
.e-before .q-field--filled.q-field--dense .q-field__control,
.e-before .q-field--filled.q-field--dense .q-field__marginal {
  height: 56px;
  border-radius: 4px 4px 0 0;
  background: rgba(0, 0, 0, 0.05);
}

.e-before .q-field--filled .q-field__control:before {
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  border-left: none;
  border-right: none;
  border-top: none;
}

.e-before .q-field--filled.q-field--dense.q-field--labeled .q-field__native {
  padding-top: 20px;
}

.e-before .q-field--dense .q-field__label {
  top: 18px;
  font-size: 16px;
}

.e-before .q-field--dense.q-field--float .q-field__label {
  transform: translateY(-40%) scale(0.75);
}

/* Material selection controls: 40px touch targets, halo restored */
.e-before .q-checkbox__inner {
  font-size: 40px;
  color: rgba(0, 0, 0, 0.54);
}

.e-before .q-checkbox__bg {
  border-width: 2px;
  border-radius: 2px;
}

body.desktop .e-before .q-checkbox:not(.disabled) .q-checkbox__inner:before {
  display: block;
}

/* Material toggle: skinny track, floating thumb with shadow */
.e-before .q-toggle .q-toggle__inner {
  font-size: 40px;
  width: 1.4em;
  min-width: 1.4em;
  height: 1em;
  padding: 0.325em 0.3em;
}

.e-before .q-toggle .q-toggle__track {
  height: 0.35em;
  border-radius: 0.175em;
  opacity: 0.38;
  background: currentColor;
}

.e-before .q-toggle .q-toggle__inner--truthy .q-toggle__track {
  opacity: 0.54;
  background: currentColor;
}

.e-before .q-toggle .q-toggle__thumb {
  top: 0.25em;
  left: 0.25em;
  width: 0.5em;
  height: 0.5em;
}

.e-before .q-toggle .q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.65em;
}

.e-before .q-toggle .q-toggle__thumb:after {
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.e-before .q-toggle .q-toggle__inner--truthy .q-toggle__thumb:after {
  background: currentColor;
}

/* Material tabs: uppercase, no hairline underline */
.e-before .q-tabs {
  border-bottom: none;
}

.e-before .q-tab {
  text-transform: uppercase;
  letter-spacing: 0.0892857143em;
  min-height: 48px;
}

/* Material chips: pills */
.e-before .q-chip {
  border-radius: 16px;
  height: 2em;
  font-size: 14px;
  font-weight: 400;
  padding: 0.5em 0.9em;
}

.e-before__chip-primary {
  background: var(--q-primary);
  color: #fff;
}

/* Material banner: solid fill, square-ish */
.e-before__alert {
  background: var(--q-positive);
  color: #fff;
  border-radius: 4px;
}
</style>
