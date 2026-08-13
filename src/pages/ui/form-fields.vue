<script setup lang="ts">
// Every Quasar input component, themed. Static labels via EFormField.
import { ref } from 'vue'
import { Calendar, Mail, Search } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const basic = ref('')
const email = ref('')
const searchText = ref('')
const password = ref('secret123')
const amount = ref('')
const number = ref(2)
const username = ref('jane')
const notes = ref('')
const select = ref<string | null>(null)
const multiSelect = ref<string[]>(['Design'])
const autocomplete = ref<string | null>(null)
const tags = ref<string[]>(['quasar', 'theme'])
const date = ref('')
const color = ref('#6366f1')
const files = ref(null)
const checkbox = ref(true)
const indeterminate = ref<boolean | null>(null)
const radio = ref('email')
const switchOn = ref(true)
const slider = ref(40)
const range = ref({ min: 20, max: 60 })
const rating = ref(4)

const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support']

const departmentFilter = ref(departments)
function filterDepartments(val: string, update: (fn: () => void) => void) {
  update(() => {
    const needle = val.toLowerCase()
    departmentFilter.value = departments.filter((d) => d.toLowerCase().includes(needle))
  })
}
</script>

<template>
  <div class="column q-gutter-y-xl">
    <div>
      <h1 class="text-h5 q-my-none">Form fields</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        Every input component Quasar ships, restyled. Labels are static via
        EFormField; fields take placeholders.
      </p>
    </div>

    <!-- Text inputs -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Text inputs</h2>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <EFormField label="Basic">
            <q-input v-model="basic" placeholder="Jane Cooper" />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="With icon">
            <q-input v-model="email" placeholder="you@example.com" type="email">
              <template #prepend>
                <Mail :size="16" />
              </template>
            </q-input>
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Clearable">
            <q-input v-model="searchText" placeholder="Search…" clearable>
              <template #prepend>
                <Search :size="16" />
              </template>
            </q-input>
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Password">
            <q-input v-model="password" type="password" autocomplete="new-password" />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="With suffix">
            <q-input v-model="amount" placeholder="0.00" suffix="EUR" />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Disabled">
            <q-input model-value="Not editable" disable />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Error state" error="This username is already taken.">
            <q-input v-model="username" />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Number input" help="Native number input with min/max.">
            <q-input v-model.number="number" type="number" :min="0" :max="10" />
          </EFormField>
        </div>
        <div class="col-12">
          <EFormField label="Textarea" help="Fixed rows; drag the handle to resize.">
            <q-input v-model="notes" type="textarea" rows="3" placeholder="Tell us about the project…" />
          </EFormField>
        </div>
      </div>
    </section>

    <!-- Selects -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Selects &amp; autocomplete</h2>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <EFormField label="Select">
            <q-select v-model="select" :options="departments">
              <template #selected>
                <span v-if="!select" class="e-select-placeholder">Select a department</span>
                <template v-else>{{ select }}</template>
              </template>
            </q-select>
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Multiple with chips">
            <q-select
              v-model="multiSelect"
              :options="departments"
              multiple
              use-chips
            />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Autocomplete" help="Type to filter the list.">
            <q-select
              v-model="autocomplete"
              :options="departmentFilter"
              use-input
              input-debounce="0"
              placeholder="Search departments…"
              @filter="filterDepartments"
            />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Free tags" help="Accepts values outside the list.">
            <q-select
              v-model="tags"
              :options="['quasar', 'vue', 'theme']"
              multiple
              use-input
              use-chips
              new-value-mode="add-unique"
              placeholder="Add a tag…"
            />
          </EFormField>
        </div>
      </div>
    </section>

    <!-- Date, color, files -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Date, color &amp; files</h2>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-6">
          <EFormField label="Date">
            <q-input v-model="date" placeholder="Pick a date">
              <template #append>
                <span class="cursor-pointer row items-center">
                  <Calendar :size="16" />
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" minimal />
                  </q-popup-proxy>
                </span>
              </template>
            </q-input>
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Color">
            <q-input v-model="color">
              <template #append>
                <span class="cursor-pointer row items-center">
                  <span class="e-customizer__swatch" :style="{ background: color }" />
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="color" no-header-tabs />
                  </q-popup-proxy>
                </span>
              </template>
            </q-input>
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="File input">
            <q-file v-model="files" placeholder="Choose files" multiple use-chips counter />
          </EFormField>
        </div>
        <div class="col-12">
          <EFormField label="File upload (drop zone)">
            <q-uploader label="Drag and drop a file here" class="full-width" hide-upload-btn />
          </EFormField>
        </div>
      </div>
    </section>

    <!-- Toggles -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Checkboxes, radios &amp; toggles</h2>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-4 column">
          <q-checkbox v-model="checkbox" label="Checked" />
          <q-checkbox v-model="indeterminate" toggle-indeterminate label="Indeterminate" />
          <q-checkbox :model-value="false" label="Disabled" disable />
        </div>
        <div class="col-12 col-md-4">
          <EFormField label="Notify me via">
            <q-option-group
              v-model="radio"
              type="radio"
              :options="[
                { label: 'Email', value: 'email' },
                { label: 'SMS', value: 'sms' },
                { label: 'Push notification', value: 'push' },
              ]"
            />
          </EFormField>
        </div>
        <div class="col-12 col-md-4 column">
          <q-toggle v-model="switchOn" label="Public profile" />
          <q-toggle :model-value="false" label="Disabled" disable />
        </div>
      </div>
    </section>

    <!-- Sliders & rating -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Sliders &amp; rating</h2>
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <EFormField label="Slider">
            <q-slider v-model="slider" label />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Range slider">
            <q-range v-model="range" label />
          </EFormField>
        </div>
        <div class="col-12 col-md-6">
          <EFormField label="Rating">
            <q-rating v-model="rating" size="1.25rem" color="warning" />
          </EFormField>
        </div>
      </div>
    </section>
  </div>
</template>
