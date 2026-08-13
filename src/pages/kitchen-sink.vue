<script setup lang="ts">
// Kitchen sink — the QA surface for the theme. Every themed component,
// checked in light AND dark after any theme change.
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { Calendar, Info, Plus, Search, Trash2 } from '@lucide/vue'
import { EFormField } from '@/encola'

const $q = useQuasar()

// QA hook: /kitchen-sink?dark starts the page in dark mode
if (new URLSearchParams(window.location.search).has('dark')) {
  $q.dark.set(true)
}

const text = ref('')
const email = ref('')
const password = ref('')
const select = ref(null)
const multiSelect = ref([])
const options = ['Engineering', 'Design', 'Marketing', 'Sales', 'Support']
const checkbox = ref(true)
const checkbox2 = ref(false)
const radio = ref('opt1')
const toggle = ref(true)
const toggle2 = ref(false)
const slider = ref(40)
const range = ref({ min: 20, max: 60 })
const rating = ref(3)
const tab = ref('account')
const date = ref('2026/08/13')
const dialogOpen = ref(false)
const notes = ref('')

const tableRows = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineering', status: 'Active' },
  { id: 2, name: 'Grace Hopper', role: 'Engineering', status: 'Active' },
  { id: 3, name: 'Margaret Hamilton', role: 'Design', status: 'Away' },
]
const tableColumns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' as const, sortable: true },
  { name: 'role', label: 'Role', field: 'role', align: 'left' as const, sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left' as const },
]

function notify() {
  $q.notify({
    message: 'Saved successfully',
    color: 'positive',
    textColor: 'on-positive',
  })
}
</script>

<template>
  <div>
    <h1 class="text-h4 q-mt-none q-mb-lg">Kitchen sink</h1>

    <!-- ======== typography ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary">Typography</div>
        <div class="text-h3">Heading three</div>
        <div class="text-h5">Heading five</div>
        <div class="text-subtitle1">Subtitle one</div>
        <p class="text-body2 q-mb-none">
          Body text at 14px with normal letter-spacing. Inter carries the whole
          interface; headings are semibold, never light-weight display type.
        </p>
        <p class="text-caption q-mb-none">Caption text — 12px.</p>
      </q-card-section>
    </q-card>

    <!-- ======== buttons ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary q-mb-sm">Buttons</div>
        <div class="row items-center q-gutter-sm q-mb-md">
          <q-btn color="primary" label="Solid" />
          <q-btn color="neutral" label="Neutral" />
          <q-btn outline color="primary" label="Outline" />
          <q-btn outline label="Outline neutral" />
          <q-btn flat color="primary" label="Ghost" />
          <q-btn color="negative" label="Danger" />
          <q-btn color="primary" label="Disabled" disable />
          <q-btn color="primary" label="Loading" loading />
        </div>
        <div class="row items-center q-gutter-sm">
          <q-btn color="primary">
            <Plus :size="16" class="q-mr-xs" />
            With icon
          </q-btn>
          <q-btn color="primary" round>
            <Plus :size="16" />
          </q-btn>
          <q-btn outline round>
            <Search :size="16" />
          </q-btn>
          <q-btn flat round color="negative">
            <Trash2 :size="16" />
          </q-btn>
          <q-btn-group unelevated>
            <q-btn color="primary" label="One" />
            <q-btn color="primary" label="Two" />
            <q-btn color="primary" label="Three" />
          </q-btn-group>
          <q-btn-dropdown color="primary" label="Dropdown">
            <q-list>
              <q-item v-close-popup clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable class="text-negative">
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn color="primary" label="Notify" @click="notify" />
          <q-btn outline label="Dialog" @click="dialogOpen = true" />
        </div>
      </q-card-section>
    </q-card>

    <!-- ======== form fields ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary q-mb-sm">Form fields</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <EFormField label="Name" required help="As it appears on your ID.">
              <q-input v-model="text" placeholder="Jane Doe" />
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Email" error="Please use your work email.">
              <q-input v-model="email" type="email" placeholder="jane@acme.com" />
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Password">
              <q-input v-model="password" type="password" placeholder="••••••••" />
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Team">
              <q-select v-model="select" :options="options" placeholder="Pick a team" />
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Teams (multiple)">
              <q-select
                v-model="multiSelect"
                :options="options"
                multiple
                use-chips
                placeholder="Pick teams"
              />
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Search">
              <q-input v-model="text" placeholder="Search…" clearable>
                <template #prepend>
                  <Search :size="16" />
                </template>
              </q-input>
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Date">
              <q-input v-model="date" placeholder="YYYY/MM/DD">
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
            <EFormField label="Notes" help="Markdown supported.">
              <q-input v-model="notes" type="textarea" rows="3" placeholder="Add a note…" />
            </EFormField>
          </div>
          <div class="col-12 col-md-6">
            <EFormField label="Floating label (off-theme, still works)">
              <q-input v-model="text" label="Material label" />
            </EFormField>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ======== selection controls ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary q-mb-sm">Selection controls</div>
        <div class="row q-gutter-lg items-start">
          <div class="column q-gutter-xs">
            <q-checkbox v-model="checkbox" label="Checked" />
            <q-checkbox v-model="checkbox2" label="Unchecked" />
            <q-checkbox :model-value="null" label="Indeterminate" />
            <q-checkbox v-model="checkbox" label="Disabled" disable />
          </div>
          <div class="column q-gutter-xs">
            <q-radio v-model="radio" val="opt1" label="Option one" />
            <q-radio v-model="radio" val="opt2" label="Option two" />
            <q-radio v-model="radio" val="opt3" label="Disabled" disable />
          </div>
          <div class="column q-gutter-xs">
            <q-toggle v-model="toggle" label="Notifications" />
            <q-toggle v-model="toggle2" label="Marketing emails" />
            <q-toggle v-model="toggle" label="Disabled" disable />
          </div>
          <div class="column q-gutter-md" style="min-width: 220px">
            <q-slider v-model="slider" :min="0" :max="100" label />
            <q-range v-model="range" :min="0" :max="100" />
            <q-rating v-model="rating" :max="5" size="1.25rem" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ======== tabs / chips / badges ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary q-mb-sm">Tabs, chips &amp; badges</div>
        <q-tabs v-model="tab" align="left" class="q-mb-md">
          <q-tab name="account" label="Account" />
          <q-tab name="security" label="Security" />
          <q-tab name="billing" label="Billing" />
        </q-tabs>
        <div class="row items-center q-gutter-sm">
          <q-chip>Default</q-chip>
          <q-chip removable>Removable</q-chip>
          <q-chip clickable>Clickable</q-chip>
          <q-badge color="primary">Badge</q-badge>
          <q-badge color="positive">Active</q-badge>
          <q-badge color="warning">Pending</q-badge>
          <q-badge color="negative">Failed</q-badge>
        </div>
      </q-card-section>
    </q-card>

    <!-- ======== feedback ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary q-mb-sm">Feedback</div>
        <q-banner class="q-mb-md" style="border: 1px solid var(--q-border)">
          <template #avatar>
            <Info :size="20" class="text-primary" />
          </template>
          A quiet banner with a hairline border — no elevation anywhere.
          <template #action>
            <q-btn flat color="primary" label="Review" />
          </template>
        </q-banner>
        <div class="q-mb-md">
          <q-linear-progress :value="0.4" color="primary" rounded class="q-mb-sm" />
          <q-linear-progress :value="0.7" color="positive" rounded />
        </div>
        <div class="row q-gutter-md items-center">
          <q-circular-progress :value="65" size="40px" :thickness="0.15" color="primary" show-value />
          <q-spinner color="primary" size="24px" />
          <q-skeleton type="rect" width="120px" height="32px" />
          <q-skeleton type="circle" size="32px" />
        </div>
      </q-card-section>
    </q-card>

    <!-- ======== table ======== -->
    <q-card class="q-mb-lg">
      <q-card-section class="q-pb-none">
        <div class="text-overline text-primary">Table</div>
      </q-card-section>
      <q-table
        :rows="tableRows"
        :columns="tableColumns"
        row-key="id"
        hide-pagination
        :rows-per-page-options="[0]"
      />
    </q-card>

    <!-- ======== expansion / list ======== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-overline text-primary q-mb-sm">Expansion &amp; list</div>
        <q-list bordered class="rounded-borders">
          <q-expansion-item label="What is Encola?" default-opened>
            <q-card-section class="text-body2">
              A flat, Tailwind-style theme for Quasar — hairline borders,
              slate neutrals, compact controls, no Material Design.
            </q-card-section>
          </q-expansion-item>
          <q-separator />
          <q-expansion-item label="Does it fork Quasar?">
            <q-card-section class="text-body2">
              No — everything is configuration: SASS variables, prop
              defaults, and override CSS.
            </q-card-section>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogOpen">
      <q-card style="min-width: 360px">
        <q-card-section>
          <div class="text-h6">Delete project?</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-body2">
          This action cannot be undone. The project and all of its data
          will be permanently removed.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Cancel" />
          <q-btn v-close-popup color="negative" label="Delete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
