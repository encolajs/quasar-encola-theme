<script setup lang="ts">
import { ref } from 'vue'
import EFormField from '@/encola/components/EFormField.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)
const submitted = ref(false)
const errors = ref<{ name?: string; email?: string; password?: string; terms?: string }>({})

function submit() {
  errors.value = {}
  if (!name.value.trim()) errors.value.name = 'Please enter your name.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
    errors.value.email = 'Please enter a valid email address.'
  if (password.value.length < 8)
    errors.value.password = 'Password must be at least 8 characters.'
  if (!terms.value) errors.value.terms = 'You must accept the terms to continue.'
  submitted.value = Object.keys(errors.value).length === 0
}
</script>

<template>
  <q-card class="q-ma-md" style="width: 400px">
    <q-card-section class="q-pa-xl">
      <div class="text-center q-mb-lg">
        <div class="text-subtitle1">
          <span class="text-primary">●</span> Encola
        </div>
        <h1 class="text-h6 q-mt-md q-mb-none">Create an account</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          Already have an account?
          <RouterLink to="/auth/login" class="text-primary">Sign in</RouterLink>
        </p>
      </div>

      <q-banner v-if="submitted" class="e-alert e-alert--positive q-mb-md">
        Account created! (demo only)
      </q-banner>

      <form class="column q-gutter-y-md" @submit.prevent="submit">
        <EFormField label="Full name" required :error="errors.name">
          <q-input v-model="name" placeholder="Jane Cooper" autocomplete="name" />
        </EFormField>

        <EFormField label="Email" required :error="errors.email">
          <q-input v-model="email" placeholder="you@example.com" type="email" autocomplete="email" />
        </EFormField>

        <EFormField
          label="Password"
          required
          :error="errors.password"
          help="At least 8 characters."
        >
          <q-input
            v-model="password"
            placeholder="••••••••"
            type="password"
            autocomplete="new-password"
          />
        </EFormField>

        <EFormField :error="errors.terms">
          <q-checkbox v-model="terms" dense>
            <span class="text-body2">
              I agree to the
              <a href="#" class="text-primary" @click.stop>terms and conditions</a>
            </span>
          </q-checkbox>
        </EFormField>

        <q-btn color="primary" type="submit" class="full-width" label="Create account" />
      </form>
    </q-card-section>
  </q-card>
</template>
