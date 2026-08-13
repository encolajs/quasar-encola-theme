<script setup lang="ts">
import { Mail, MessageCircle } from '@lucide/vue'

const faqs = [
  {
    q: 'What exactly do I get when I buy the theme?',
    a: 'A complete Vite + Vue 3 + Quasar starter project: the theme core (SASS variables, preset, override CSS), wrapper components, and every example page you see in this demo — ready to copy into your product.',
  },
  {
    q: 'Do I need to fork or patch Quasar?',
    a: 'No. Everything is configuration: SASS variables, component prop defaults set once at startup, a runtime theme and one small override CSS file. You upgrade Quasar normally.',
  },
  {
    q: 'Can I change the primary color?',
    a: 'Yes — pass it to the theme factory (encola({ primary, surface }) in src/main.ts) and both light and dark themes update. The customizer in the header previews any combination live.',
  },
  {
    q: 'Does it work with my existing Quasar app?',
    a: 'Yes. Install the theme layers and your existing components pick up the new look. The only convention to adopt: static labels above fields instead of the label prop.',
  },
  {
    q: 'Is dark mode included?',
    a: 'Dark mode is first-class. Every component and example page is verified in both themes, and the toggle persists across reloads.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'If the theme does not work as advertised and we cannot fix your issue, we refund within 14 days of purchase.',
  },
]
</script>

<template>
  <div class="column q-gutter-y-xl q-mx-auto e-page-narrow--sm">
    <div class="text-center">
      <h1 class="text-h5 q-my-none">Frequently asked questions</h1>
      <p class="text-body2 q-mt-sm q-mb-none" style="opacity: 0.7">
        Everything you need to know about the theme. Can't find an answer?
        Reach out below.
      </p>
    </div>

    <q-list bordered class="rounded-borders bg-surface">
      <template v-for="(faq, i) in faqs" :key="faq.q">
        <q-separator v-if="i > 0" />
        <q-expansion-item :label="faq.q">
          <q-card-section class="text-body2 q-pt-none" style="opacity: 0.85">
            {{ faq.a }}
          </q-card-section>
        </q-expansion-item>
      </template>
    </q-list>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6">
        <q-card class="full-height">
          <q-card-section class="text-center q-py-xl">
            <MessageCircle :size="24" class="text-primary" />
            <div class="text-subtitle1 q-mt-md">Chat with us</div>
            <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
              Mon–Fri, 9:00–17:00 EET
            </p>
            <q-btn flat color="primary" class="e-btn-soft q-mt-md" label="Start a chat" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6">
        <q-card class="full-height">
          <q-card-section class="text-center q-py-xl">
            <Mail :size="24" class="text-primary" />
            <div class="text-subtitle1 q-mt-md">Email support</div>
            <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
              We reply within one business day
            </p>
            <q-btn flat color="primary" class="e-btn-soft q-mt-md" label="Send an email" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
