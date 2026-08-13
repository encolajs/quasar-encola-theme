<script setup lang="ts">
// Multi-step wizard: flat step indicator + QTabPanels, no Material stepper.
import { computed, reactive, ref } from 'vue'
import { Check } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const steps = [
  { title: 'Account', subtitle: 'Your credentials' },
  { title: 'Company', subtitle: 'Organization details' },
  { title: 'Plan', subtitle: 'Pick what fits' },
  { title: 'Done', subtitle: 'Review & finish' },
]

const step = ref(0)
const plan = ref('startup')
const done = ref(false)

// demo models: Quasar field types require a modelValue
const f = reactive<Record<string, string | null>>({})

const plans = [
  { value: 'startup', title: 'Startup', desc: '$19/month — up to 10 seats' },
  { value: 'business', title: 'Business', desc: '$49/month — up to 50 seats' },
  { value: 'enterprise', title: 'Enterprise', desc: 'Custom pricing — unlimited' },
]

const isLast = computed(() => step.value === steps.length - 1)

function next() {
  if (isLast.value) done.value = true
  else step.value++
}
</script>

<template>
  <div class="column q-gutter-y-lg e-page-narrow--sm">
    <div>
      <h1 class="text-h5 q-my-none">Form wizard</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        A flat multi-step form: step indicator + QTabPanels.
      </p>
    </div>

    <q-card>
      <q-card-section>
        <!-- step indicator -->
        <div class="row items-center no-wrap q-mb-lg">
          <template v-for="(s, i) in steps" :key="s.title">
            <div class="row items-center no-wrap q-gutter-x-sm">
              <q-avatar
                size="28px"
                :class="i <= step ? 'bg-primary text-on-primary' : 'bg-surface-accented'"
              >
                <Check v-if="i < step" :size="14" />
                <span v-else class="text-caption">{{ i + 1 }}</span>
              </q-avatar>
              <div class="gt-xs">
                <div class="text-subtitle2">{{ s.title }}</div>
                <div class="text-caption" style="opacity: 0.6">{{ s.subtitle }}</div>
              </div>
            </div>
            <q-separator v-if="i < steps.length - 1" class="col q-mx-md" />
          </template>
        </div>

        <q-tab-panels v-model="step" animated>
          <q-tab-panel :name="0" class="q-pa-none">
            <div class="column q-gutter-y-md">
              <EFormField label="Email" required>
                <q-input v-model="f.d1" placeholder="you@example.com" type="email" />
              </EFormField>
              <EFormField label="Password" required help="At least 8 characters.">
                <q-input v-model="f.d2" placeholder="••••••••" type="password" />
              </EFormField>
            </div>
          </q-tab-panel>

          <q-tab-panel :name="1" class="q-pa-none">
            <div class="column q-gutter-y-md">
              <EFormField label="Company name" required>
                <q-input v-model="f.d3" placeholder="Acme Inc." />
              </EFormField>
              <EFormField label="Company size">
                <q-select v-model="f.d4" :options="['1–10', '11–50', '51–200', '200+']">
                  <template #selected>
                    <span v-if="!f.d4" class="e-select-placeholder">Select a range</span>
                    <template v-else>{{ f.d4 }}</template>
                  </template>
                </q-select>
              </EFormField>
              <EFormField label="Website">
                <q-input v-model="f.d5" placeholder="https://acme.com" type="url" />
              </EFormField>
            </div>
          </q-tab-panel>

          <q-tab-panel :name="2" class="q-pa-none">
            <div class="column q-gutter-y-sm">
              <q-card
                v-for="p in plans"
                :key="p.value"
                flat
                bordered
                class="cursor-pointer"
                :class="{ 'bg-surface-muted': plan === p.value }"
                @click="plan = p.value"
              >
                <q-card-section class="row items-center q-gutter-x-sm q-py-sm">
                  <q-radio v-model="plan" :val="p.value" dense />
                  <div>
                    <div class="text-subtitle2">{{ p.title }}</div>
                    <div class="text-caption" style="opacity: 0.7">{{ p.desc }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel :name="3" class="q-pa-none">
            <q-banner v-if="done" class="e-alert e-alert--positive">
              <strong>All set!</strong> Your workspace is ready. (demo only)
            </q-banner>
            <p v-else class="text-body2 q-mb-none">
              Everything looks good. Click <strong>Finish</strong> to create your
              workspace on the <strong>{{ plan }}</strong> plan.
            </p>
          </q-tab-panel>
        </q-tab-panels>

        <div class="row justify-between q-mt-lg">
          <q-btn flat :disable="step === 0" label="Back" @click="step--" />
          <q-btn color="primary" :label="isLast ? 'Finish' : 'Continue'" @click="next" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
