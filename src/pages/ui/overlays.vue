<script setup lang="ts">
import { ref } from 'vue'
import { Link, Mail, MessageSquare, Send, X } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const confirmDialog = ref(false)
const formDialog = ref(false)
const drawer = ref(false)
const sheet = ref(false)

const projectName = ref('')
const visibility = ref<string | null>(null)
const filterStatus = ref<string | null>(null)
const filterOwner = ref<string | null>(null)
const starred = ref(false)

const shareActions = [
  { label: 'Copy link', icon: Link },
  { label: 'Email', icon: Mail },
  { label: 'Message', icon: MessageSquare },
  { label: 'Post', icon: Send },
]
</script>

<template>
  <div class="column q-gutter-y-xl">
    <div>
      <h1 class="text-h5 q-my-none">Overlays</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        Dialogs, drawers, popovers, bottom sheets and tooltips — flat
        surfaces with hairline borders, no elevation.
      </p>
    </div>

    <!-- Dialogs -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Dialogs</h2>
      <div class="row wrap q-gutter-sm">
        <q-btn color="primary" label="Confirm dialog" @click="confirmDialog = true" />
        <q-btn outline label="Form dialog" @click="formDialog = true" />
      </div>

      <q-dialog v-model="confirmDialog">
        <q-card style="width: 420px; max-width: 90vw">
          <q-card-section>
            <div class="text-subtitle1">Archive this project?</div>
            <div class="text-caption" style="opacity: 0.7">
              You can restore it later from the archive.
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none text-body2">
            Archived projects are hidden from the dashboard but keep all
            their data and members.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup flat label="Cancel" />
            <q-btn v-close-popup color="primary" label="Archive" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="formDialog">
        <q-card style="width: 440px; max-width: 90vw">
          <q-card-section>
            <div class="text-subtitle1">New project</div>
            <div class="text-caption" style="opacity: 0.7">
              Projects group related work together.
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="column q-gutter-y-md">
              <EFormField label="Name" required>
                <q-input v-model="projectName" placeholder="my-awesome-project" />
              </EFormField>
              <EFormField label="Visibility">
                <q-select v-model="visibility" :options="['Private', 'Team', 'Public']">
                  <template #selected>
                    <span v-if="!visibility" class="e-select-placeholder">Select visibility</span>
                    <template v-else>{{ visibility }}</template>
                  </template>
                </q-select>
              </EFormField>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup flat label="Cancel" />
            <q-btn v-close-popup color="primary" label="Create" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </section>

    <!-- Drawer -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Drawer</h2>
      <q-btn outline label="Open right drawer" @click="drawer = true" />
      <q-dialog v-model="drawer" position="right" full-height>
        <q-card style="width: 320px" class="column full-height no-border-radius">
          <div class="e-customizer__header">
            <span class="e-customizer__title">Filter results</span>
            <q-btn v-close-popup flat round size="sm" aria-label="Close">
              <X :size="16" />
            </q-btn>
          </div>
          <q-separator />
          <div class="q-pa-md column q-gutter-y-md">
            <EFormField label="Status">
              <q-select v-model="filterStatus" :options="['Any', 'Active', 'Archived']">
                <template #selected>
                  <span v-if="!filterStatus" class="e-select-placeholder">Any</span>
                  <template v-else>{{ filterStatus }}</template>
                </template>
              </q-select>
            </EFormField>
            <EFormField label="Owner">
              <q-select v-model="filterOwner" :options="['Anyone', 'Me', 'My team']">
                <template #selected>
                  <span v-if="!filterOwner" class="e-select-placeholder">Anyone</span>
                  <template v-else>{{ filterOwner }}</template>
                </template>
              </q-select>
            </EFormField>
            <q-checkbox v-model="starred" label="Only starred" />
            <q-btn v-close-popup color="primary" class="full-width" label="Apply filters" />
          </div>
        </q-card>
      </q-dialog>
    </section>

    <!-- Bottom sheet -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Bottom sheet</h2>
      <q-btn outline label="Share via…" @click="sheet = true" />
      <q-dialog v-model="sheet" position="bottom">
        <q-card style="width: 100%">
          <q-list class="q-py-sm">
            <q-item-label header>Share this page</q-item-label>
            <q-item
              v-for="action in shareActions"
              :key="action.label"
              v-close-popup
              clickable
            >
              <q-item-section avatar>
                <component :is="action.icon" :size="16" />
              </q-item-section>
              <q-item-section>{{ action.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
    </section>

    <!-- Popover -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Popover</h2>
      <p class="text-body2 q-mb-md" style="opacity: 0.7">
        A menu with arbitrary content that stays open while interacting.
      </p>
      <q-btn outline>
        <q-avatar size="20px" class="bg-surface-accented q-mr-sm">
          <span class="e-sidebar__initials">JD</span>
        </q-avatar>
        Jane Doe
        <q-menu anchor="bottom left" self="top left">
          <q-card flat style="min-width: 260px">
            <q-card-section class="row items-center no-wrap q-gutter-x-sm">
              <q-avatar size="36px" class="bg-surface-accented">
                <span class="e-sidebar__initials">JD</span>
              </q-avatar>
              <div>
                <div class="text-subtitle2">Jane Doe</div>
                <div class="text-caption" style="opacity: 0.7">jane.doe@domain.com</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="column q-gutter-y-sm">
              <div class="row justify-between text-caption">
                <span style="opacity: 0.7">Role</span><span>Admin</span>
              </div>
              <div class="row justify-between text-caption">
                <span style="opacity: 0.7">Last active</span><span>2 h ago</span>
              </div>
            </q-card-section>
            <q-card-actions>
              <q-btn flat size="sm" class="full-width" label="View full profile" />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
    </section>

    <!-- Tooltips -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Tooltips</h2>
      <div class="row wrap q-gutter-sm">
        <q-btn outline label="Top">
          <q-tooltip anchor="top middle" self="bottom middle">Tooltip on top</q-tooltip>
        </q-btn>
        <q-btn outline label="Bottom">
          <q-tooltip anchor="bottom middle" self="top middle">Tooltip on bottom</q-tooltip>
        </q-btn>
        <q-btn outline label="Start">
          <q-tooltip anchor="center left" self="center right">Tooltip at start</q-tooltip>
        </q-btn>
        <q-btn outline label="End">
          <q-tooltip anchor="center right" self="center left">Tooltip at end</q-tooltip>
        </q-btn>
      </div>
    </section>
  </div>
</template>
