<script setup lang="ts">
import { RefreshCw } from '@lucide/vue'
</script>

<template>
  <div class="text-center q-pa-lg">
    <p class="text-subtitle2 text-negative q-mb-none">500</p>
    <h1 class="text-h4 q-mt-sm q-mb-none">Something went wrong</h1>
    <p class="text-body2 q-mt-md q-mx-auto q-mb-none" style="opacity: 0.7; max-width: 400px">
      An unexpected error occurred on our side. We've been notified and are
      looking into it.
    </p>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <q-btn color="primary" @click="$router.go(0)">
        <RefreshCw :size="16" class="q-mr-sm" />
        Try again
      </q-btn>
      <q-btn flat to="/" label="Go back home" />
    </div>
  </div>
</template>
