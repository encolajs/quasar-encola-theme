<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/default.vue'
import BlankLayout from './layouts/blank.vue'

const layouts = {
  default: DefaultLayout,
  blank: BlankLayout,
}

const route = useRoute()
const layout = computed(
  () => layouts[(route.meta.layout as keyof typeof layouts) ?? 'default'],
)
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
