<script setup lang="ts">
import { ref } from 'vue'
import { Mail } from '@lucide/vue'
import EFormField from '@/encola/components/EFormField.vue'

const email = ref('')
const password = ref('')
const remember = ref(false)
const submitted = ref(false)
const errors = ref<{ email?: string; password?: string }>({})

function submit() {
  errors.value = {}
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
    errors.value.email = 'Please enter a valid email address.'
  if (password.value.length < 8)
    errors.value.password = 'Password must be at least 8 characters.'
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
        <h1 class="text-h6 q-mt-md q-mb-none">Welcome back</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          Don't have an account?
          <RouterLink to="/auth/register" class="text-primary">Sign up</RouterLink>
        </p>
      </div>

      <q-banner v-if="submitted" class="e-alert e-alert--positive q-mb-md">
        Signed in! (demo only)
      </q-banner>

      <form class="column q-gutter-y-md" @submit.prevent="submit">
        <EFormField label="Email" required :error="errors.email">
          <q-input v-model="email" placeholder="you@example.com" type="email" autocomplete="email">
            <template #prepend>
              <Mail :size="16" />
            </template>
          </q-input>
        </EFormField>

        <EFormField label="Password" required :error="errors.password">
          <q-input
            v-model="password"
            placeholder="••••••••"
            type="password"
            autocomplete="current-password"
          />
        </EFormField>

        <div class="row items-center justify-between">
          <q-checkbox v-model="remember" dense label="Remember me" />
          <RouterLink to="/auth/forgot-password" class="text-body2 text-primary">
            Forgot password?
          </RouterLink>
        </div>

        <q-btn color="primary" type="submit" class="full-width" label="Sign in" />
      </form>
    </q-card-section>
  </q-card>
</template>
