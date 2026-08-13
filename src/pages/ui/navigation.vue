<script setup lang="ts">
import { ref } from 'vue'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  ChevronRight,
  Copy,
  Home,
  Pencil,
  Search,
  Settings,
  Share2,
  Trash2,
  User,
} from '@lucide/vue'

const tab = ref('overview')
const iconTab = ref('inbox')
const align = ref('left')
const period = ref('week')
const filters = ref(['active'])
const page = ref(3)
const toolbarSearch = ref('')

const filterOptions = ['Active', 'Archived', 'Draft', 'Shared with me']

function toggleFilter(value: string) {
  const key = value.toLowerCase()
  const next = new Set(filters.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  filters.value = [...next]
}
</script>

<template>
  <div class="column q-gutter-y-xl">
    <div>
      <h1 class="text-h5 q-my-none">Navigation</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        Tabs, toolbars, breadcrumbs, menus and friends.
      </p>
    </div>

    <!-- Tabs -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Tabs</h2>
      <q-tabs v-model="tab" align="left">
        <q-tab name="overview" label="Overview" />
        <q-tab name="activity" label="Activity" />
        <q-tab name="settings" label="Settings" />
      </q-tabs>
      <p class="text-body2 q-mt-md" style="opacity: 0.7">
        The underline bar is part of the component — no divider needed.
      </p>

      <q-tabs v-model="iconTab" align="left" class="q-mt-lg">
        <q-tab name="inbox">
          <div class="row items-center no-wrap">
            <Bell :size="16" class="q-mr-sm" />
            Inbox
            <q-badge color="primary" class="q-ml-sm">3</q-badge>
          </div>
        </q-tab>
        <q-tab name="profile">
          <div class="row items-center no-wrap">
            <User :size="16" class="q-mr-sm" />
            Profile
          </div>
        </q-tab>
        <q-tab name="settings">
          <div class="row items-center no-wrap">
            <Settings :size="16" class="q-mr-sm" />
            Settings
          </div>
        </q-tab>
      </q-tabs>
    </section>

    <!-- Toolbar -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Toolbar</h2>
      <q-card>
        <q-toolbar>
          <q-toolbar-title class="text-subtitle2">Team members</q-toolbar-title>
          <q-input
            v-model="toolbarSearch"
            placeholder="Search…"
            style="width: 220px"
            class="q-mr-sm"
          >
            <template #prepend>
              <Search :size="16" />
            </template>
          </q-input>
          <q-btn color="primary" label="Invite" />
        </q-toolbar>
        <q-separator />
        <q-card-section class="text-body2" style="opacity: 0.7">
          Toolbars sit flush on cards and page headers — flat, hairline
          separated, no elevation.
        </q-card-section>
      </q-card>
    </section>

    <!-- Breadcrumbs -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Breadcrumbs</h2>
      <q-breadcrumbs>
        <template #separator>
          <ChevronRight :size="14" style="opacity: 0.5" />
        </template>
        <q-breadcrumbs-el label="Home" href="#" />
        <q-breadcrumbs-el label="Projects" href="#" />
        <q-breadcrumbs-el label="Encola theme" />
      </q-breadcrumbs>
      <q-breadcrumbs class="q-mt-sm" separator="/">
        <q-breadcrumbs-el href="#">
          <Home :size="14" class="q-mr-xs" />
          Home
        </q-breadcrumbs-el>
        <q-breadcrumbs-el label="Projects" href="#" />
        <q-breadcrumbs-el label="Encola theme" />
      </q-breadcrumbs>
    </section>

    <!-- Menus -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Menus</h2>
      <div class="row wrap q-gutter-sm">
        <q-btn-dropdown outline label="Actions">
          <q-list style="min-width: 180px">
            <q-item v-close-popup clickable>
              <q-item-section avatar><Pencil :size="16" /></q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section avatar><Copy :size="16" /></q-item-section>
              <q-item-section>Duplicate</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section avatar><Share2 :size="16" /></q-item-section>
              <q-item-section>Share</q-item-section>
            </q-item>
            <q-separator class="q-my-xs" />
            <q-item v-close-popup clickable class="text-negative">
              <q-item-section avatar><Trash2 :size="16" /></q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown outline label="With submenu">
          <q-list style="min-width: 180px">
            <q-item v-close-popup clickable>
              <q-item-section>Rename</q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section>Move to…</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Export as</q-item-section>
              <q-item-section side>
                <ChevronRight :size="14" />
              </q-item-section>
              <q-menu anchor="top end" self="top start">
                <q-list style="min-width: 140px">
                  <q-item v-close-popup clickable>
                    <q-item-section>PDF</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable>
                    <q-item-section>CSV</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable>
                    <q-item-section>Markdown</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </section>

    <!-- Button toggles -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Button toggles</h2>
      <div class="row wrap items-center q-gutter-lg">
        <q-btn-toggle
          v-model="align"
          outline
          toggle-color="primary"
          :options="[
            { value: 'left', slot: 'left', 'aria-label': 'Align left' },
            { value: 'center', slot: 'center', 'aria-label': 'Align center' },
            { value: 'right', slot: 'right', 'aria-label': 'Align right' },
          ]"
        >
          <template #left><AlignLeft :size="16" /></template>
          <template #center><AlignCenter :size="16" /></template>
          <template #right><AlignRight :size="16" /></template>
        </q-btn-toggle>

        <q-btn-toggle
          v-model="period"
          outline
          toggle-color="primary"
          :options="[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ]"
        />
      </div>
    </section>

    <!-- Filter chips -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Filter chips</h2>
      <div class="row q-gutter-sm">
        <q-chip
          v-for="option in filterOptions"
          :key="option"
          clickable
          :class="filters.includes(option.toLowerCase()) ? 'bg-primary text-on-primary' : ''"
          @click="toggleFilter(option)"
        >
          {{ option }}
        </q-chip>
      </div>
    </section>

    <!-- Pagination -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Pagination</h2>
      <q-pagination v-model="page" :max="12" :max-pages="7" boundary-numbers direction-links />
    </section>
  </div>
</template>
