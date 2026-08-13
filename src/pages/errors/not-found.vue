<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'
</script>

<template>
  <div class="text-center q-pa-lg">
    <p class="text-subtitle2 text-primary q-mb-none">404</p>
    <h1 class="text-h4 q-mt-sm q-mb-none">Page not found</h1>
    <p class="text-body2 q-mt-md q-mx-auto q-mb-none" style="opacity: 0.7; max-width: 400px">
      Sorry, we couldn't find the page you're looking for. It may have been
      moved or deleted.
    </p>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <q-btn color="primary" to="/" label="Go back home" />
      <q-btn flat @click="$router.back()">
        <ArrowLeft :size="16" class="q-mr-sm" />
        Go back
      </q-btn>
    </div>
  </div>
</template>
