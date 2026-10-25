<script setup lang="ts">
// App shell: full-height sidebar + topbar, Nuxt-UI-style dashboard chrome.
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import {
  Menu as MenuIcon,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SlidersHorizontal,
  Sun,
} from '@lucide/vue'
import AppSidebar from '@/encola/components/AppSidebar.vue'
import ThemeCustomizer from '@/encola/components/ThemeCustomizer.vue'
import { useSidebar } from '@/encola/composables/useSidebar'
import { useCustomizer } from '@/encola/composables/useCustomizer'
import { useContentWidth } from '@/encola/composables/useContentWidth'

const $q = useQuasar()
const { isMobile, collapsed, toggle } = useSidebar()
const customizer = useCustomizer()
const { contentClass } = useContentWidth()

const THEME_STORAGE_KEY = 'encola-theme'

function toggleTheme() {
  $q.dark.toggle()
  localStorage.setItem(THEME_STORAGE_KEY, $q.dark.isActive ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') $q.dark.set(saved === 'dark')
})
</script>

<template>
  <q-layout view="lHh LpR lFf">
    <AppSidebar />

    <q-header bordered class="e-topbar">
      <q-toolbar class="e-topbar__bar">
        <q-btn
          flat
          round
          size="sm"
          :aria-label="isMobile ? 'Open menu' : collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="toggle"
        >
          <component
            :is="isMobile ? MenuIcon : collapsed ? PanelLeftOpen : PanelLeftClose"
            :size="18"
          />
        </q-btn>
        <q-space />
        <q-btn flat round size="sm" aria-label="Toggle theme" @click="toggleTheme">
          <component :is="$q.dark.isActive ? Sun : Moon" :size="18" />
        </q-btn>
        <q-btn
          flat
          round
          size="sm"
          aria-label="Customize theme"
          @click="customizer.open.value = true"
        >
          <SlidersHorizontal :size="18" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <ThemeCustomizer />

    <q-page-container>
      <q-page padding>
        <div class="e-content" :class="contentClass">
          <slot />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
