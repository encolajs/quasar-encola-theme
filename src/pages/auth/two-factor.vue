<script setup lang="ts">
// Quasar has no OTP input — six single-digit boxes with auto-advance
// cover the pattern with plain QInputs.
import { computed, ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'

const digits = ref<string[]>(['', '', '', '', '', ''])
const boxes = ref<{ focus: () => void; select: () => void }[]>([])
const verified = ref(false)
const complete = computed(() => digits.value.every((d) => /^\d$/.test(d)))

function onInput(index: number, value: string | number | null) {
  const char = String(value ?? '').replace(/\D/g, '').slice(-1)
  digits.value[index] = char
  if (char && index < 5) boxes.value[index + 1]?.focus()
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    boxes.value[index - 1]?.focus()
  }
}

function onPaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text').replace(/\D/g, '') ?? ''
  if (!text) return
  event.preventDefault()
  text.slice(0, 6).split('').forEach((char, i) => (digits.value[i] = char))
  boxes.value[Math.min(text.length, 5)]?.focus()
}

function submit() {
  verified.value = complete.value
}
</script>

<template>
  <q-card class="q-ma-md" style="width: 400px">
    <q-card-section class="q-pa-xl">
      <div class="text-center q-mb-lg">
        <div class="text-subtitle1">
          <span class="text-primary">●</span> Encola
        </div>
        <h1 class="text-h6 q-mt-md q-mb-none">Two-factor authentication</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      <q-banner v-if="verified" class="e-alert e-alert--positive q-mb-md">
        Code verified! (demo only)
      </q-banner>

      <form class="column q-gutter-y-md" @submit.prevent="submit">
        <div class="row justify-center q-gutter-x-sm" @paste="onPaste">
          <q-input
            v-for="(digit, i) in digits"
            :key="i"
            :ref="(el) => (boxes[i] = el as never)"
            :model-value="digit"
            maxlength="1"
            inputmode="numeric"
            input-class="text-center"
            style="width: 2.5rem"
            :aria-label="`Digit ${i + 1}`"
            @update:model-value="(v) => onInput(i, v)"
            @keydown="(e: KeyboardEvent) => onKeydown(i, e)"
          />
        </div>

        <q-btn
          color="primary"
          type="submit"
          class="full-width"
          label="Verify"
          :disable="!complete"
        />

        <p class="text-body2 text-center q-mb-none" style="opacity: 0.7">
          Didn't get a code?
          <a href="#" class="text-primary" @click.prevent>Resend</a>
        </p>

        <q-btn flat class="full-width" to="/auth/login">
          <ArrowLeft :size="16" class="q-mr-sm" />
          Back to sign in
        </q-btn>
      </form>
    </q-card-section>
  </q-card>
</template>
