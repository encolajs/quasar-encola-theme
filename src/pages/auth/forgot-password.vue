<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const email = ref('')
const sent = ref(false)
const error = ref<string>()

function submit() {
  error.value = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)
    ? undefined
    : 'Please enter a valid email address.'
  sent.value = !error.value
}
</script>

<template>
  <q-card class="q-ma-md" style="width: 400px">
    <q-card-section class="q-pa-xl">
      <div class="text-center q-mb-lg">
        <div class="text-subtitle1">
          <span class="text-primary">●</span> Encola
        </div>
        <h1 class="text-h6 q-mt-md q-mb-none">Reset your password</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      <q-banner v-if="sent" class="e-alert e-alert--positive q-mb-md">
        If that address exists, a reset link is on its way.
      </q-banner>

      <form class="column q-gutter-y-md" @submit.prevent="submit">
        <EFormField label="Email" required :error="error">
          <q-input v-model="email" placeholder="you@example.com" type="email" autocomplete="email" />
        </EFormField>

        <q-btn color="primary" type="submit" class="full-width" label="Send reset link" />

        <q-btn flat class="full-width" to="/auth/login">
          <ArrowLeft :size="16" class="q-mr-sm" />
          Back to sign in
        </q-btn>
      </form>
    </q-card-section>
  </q-card>
</template>
