<script setup lang="ts">
// Form layout recipes: stacked, two-column, and inline label styles.
import { reactive, ref } from 'vue'
import { X } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const saved = ref(false)

const visibility = ref('public')
const newsletter = ref(false)
const notifications = ref({ comments: true, mentions: false, digest: true })

// demo models: Quasar field types require a modelValue
const f = reactive<Record<string, string | null>>({})

const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Romania', 'Japan']
const timezones = ['UTC', 'Europe/Bucharest', 'Europe/London', 'America/New_York', 'Asia/Tokyo']

const timezoneFilter = ref(timezones)
function filterTimezones(val: string, update: (fn: () => void) => void) {
  update(() => {
    const needle = val.toLowerCase()
    timezoneFilter.value = timezones.filter((t) => t.toLowerCase().includes(needle))
  })
}
</script>

<template>
  <div class="column q-gutter-y-lg e-page-narrow">
    <div>
      <h1 class="text-h5 q-my-none">Form layouts</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        Copy-paste-ready form recipes: every field uses EFormField + placeholder,
        never a floating label.
      </p>
    </div>

    <q-banner v-if="saved" class="e-alert e-alert--positive">
      <div class="row items-center justify-between">
        <span>Changes saved. (demo only)</span>
        <q-btn flat round size="sm" aria-label="Dismiss" @click="saved = false">
          <X :size="14" />
        </q-btn>
      </div>
    </q-banner>

    <!-- Stacked -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1">Stacked layout</div>
        <div class="text-caption" style="opacity: 0.7">One column, labels above fields</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <form class="column q-gutter-y-md" @submit.prevent="saved = true">
          <EFormField label="Project name" required>
            <q-input v-model="f.d1" placeholder="my-awesome-project" />
          </EFormField>
          <EFormField label="Description" help="A few sentences about what this project does.">
            <q-input v-model="f.d2" type="textarea" rows="3" placeholder="Describe the project…" />
          </EFormField>
          <EFormField label="Visibility">
            <q-option-group
              v-model="visibility"
              type="radio"
              :options="[
                { label: 'Public — anyone can see this project', value: 'public' },
                { label: 'Private — only team members', value: 'private' },
              ]"
            />
          </EFormField>
          <div class="row q-gutter-sm justify-end">
            <q-btn flat label="Cancel" />
            <q-btn color="primary" type="submit" label="Create project" />
          </div>
        </form>
      </q-card-section>
    </q-card>

    <!-- Two-column -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1">Two-column layout</div>
        <div class="text-caption" style="opacity: 0.7">Related fields side by side</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <form class="column q-gutter-y-md" @submit.prevent="saved = true">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-6">
              <EFormField label="First name" required>
                <q-input v-model="f.d3" placeholder="Jane" autocomplete="given-name" />
              </EFormField>
            </div>
            <div class="col-12 col-md-6">
              <EFormField label="Last name" required>
                <q-input v-model="f.d4" placeholder="Cooper" autocomplete="family-name" />
              </EFormField>
            </div>
            <div class="col-12 col-md-6">
              <EFormField label="Country">
                <q-select v-model="f.d5" :options="countries">
                  <template #selected>
                    <span v-if="!f.d5" class="e-select-placeholder">Select a country</span>
                    <template v-else>{{ f.d5 }}</template>
                  </template>
                </q-select>
              </EFormField>
            </div>
            <div class="col-12 col-md-6">
              <EFormField label="Timezone">
                <q-select v-model="f.d6"
                  :options="timezoneFilter"
                  use-input
                  input-debounce="0"
                  placeholder="Search timezones…"
                  @filter="filterTimezones"
                />
              </EFormField>
            </div>
            <div class="col-12 col-md-8">
              <EFormField label="Street address">
                <q-input v-model="f.d7" placeholder="Str. Exemplu 12" autocomplete="street-address" />
              </EFormField>
            </div>
            <div class="col-12 col-md-4">
              <EFormField label="Postal code">
                <q-input v-model="f.d8" placeholder="010101" autocomplete="postal-code" />
              </EFormField>
            </div>
          </div>
          <div class="row q-gutter-sm justify-end">
            <q-btn flat label="Cancel" />
            <q-btn color="primary" type="submit" label="Save address" />
          </div>
        </form>
      </q-card-section>
    </q-card>

    <!-- Horizontal: label beside the field -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1">Horizontal layout</div>
        <div class="text-caption" style="opacity: 0.7">Labels in a fixed column on the left</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <form class="column q-gutter-y-md" @submit.prevent="saved = true">
          <EFormField horizontal label="Full name" required>
            <q-input v-model="f.d9" placeholder="Jane Cooper" autocomplete="name" />
          </EFormField>
          <EFormField horizontal label="Email" required help="We'll only use this for receipts.">
            <q-input v-model="f.d10" placeholder="you@example.com" type="email" autocomplete="email" />
          </EFormField>
          <EFormField
            horizontal
            label="Country"
            label-width="10rem"
            help="Custom label width via `label-width=&quot;10rem&quot;`"
          >
            <q-select v-model="f.d11" :options="countries">
                  <template #selected>
                    <span v-if="!f.d11" class="e-select-placeholder">Select a country</span>
                    <template v-else>{{ f.d11 }}</template>
                  </template>
                </q-select>
          </EFormField>
          <EFormField horizontal>
            <q-checkbox v-model="newsletter" label="Subscribe to the newsletter" />
          </EFormField>
          <div class="row q-gutter-sm justify-end">
            <q-btn color="primary" type="submit" label="Save contact" />
          </div>
        </form>
      </q-card-section>
    </q-card>

    <!-- Horizontal sections -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1">Sectioned layout</div>
        <div class="text-caption" style="opacity: 0.7">
          Section label on the left, fields on the right
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <form class="column q-gutter-y-lg" @submit.prevent="saved = true">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <div class="text-subtitle2">Notifications</div>
              <p class="text-caption q-mt-xs q-mb-none" style="opacity: 0.7">
                Choose how you want to hear from us.
              </p>
            </div>
            <div class="col-12 col-md-8 column">
              <q-checkbox v-model="notifications.comments" label="Comments on your posts" />
              <q-checkbox v-model="notifications.mentions" label="Mentions" />
              <q-checkbox v-model="notifications.digest" label="Weekly digest" />
            </div>
          </div>
          <q-separator />
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <div class="text-subtitle2">Danger zone</div>
              <p class="text-caption q-mt-xs q-mb-none" style="opacity: 0.7">
                Irreversible actions.
              </p>
            </div>
            <div class="col-12 col-md-8 row q-gutter-sm items-start">
              <q-btn outline color="negative" label="Deactivate account" />
              <q-btn color="negative" label="Delete account" />
            </div>
          </div>
          <div class="row q-gutter-sm justify-end">
            <q-btn color="primary" type="submit" label="Save preferences" />
          </div>
        </form>
      </q-card-section>
    </q-card>

    <!-- Material floating labels: supported, but off-theme -->
    <q-card>
      <q-card-section>
        <div class="text-subtitle1">Material behaviour</div>
        <div class="text-caption" style="opacity: 0.7">
          Outlined fields with the floating label prop — the closest variant
          to the theme for users who want Material UX
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <form class="column q-gutter-y-sm" @submit.prevent="saved = true">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-6">
              <q-input v-model="f.d12" label="First name" autocomplete="given-name" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="f.d13" label="Last name" autocomplete="family-name" />
            </div>
            <div class="col-12">
              <q-input v-model="f.d14" label="Email" type="email" autocomplete="email" />
            </div>
            <div class="col-12">
              <q-select v-model="f.d15" label="Country" :options="countries" />
            </div>
            <div class="col-12">
              <q-input v-model="f.d16" label="Message" type="textarea" rows="3" />
            </div>
          </div>
          <div class="row q-gutter-sm justify-end">
            <q-btn color="primary" type="submit" label="Send" />
          </div>
        </form>
      </q-card-section>
    </q-card>
  </div>
</template>
