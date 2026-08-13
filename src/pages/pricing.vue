<script setup lang="ts">
import { ref } from 'vue'
import { Check } from '@lucide/vue'

const yearly = ref(true)

const plans = [
  {
    name: 'Startup',
    monthly: 19,
    yearly: 15,
    description: 'For small teams getting started.',
    features: ['Up to 10 seats', '5 GB storage', 'Community support', 'Basic analytics'],
    highlighted: false,
  },
  {
    name: 'Business',
    monthly: 49,
    yearly: 39,
    description: 'For growing teams that need more.',
    features: [
      'Up to 50 seats',
      '100 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom roles',
      'Audit log',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthly: 99,
    yearly: 79,
    description: 'For organizations with advanced needs.',
    features: [
      'Unlimited seats',
      'Unlimited storage',
      'Dedicated support',
      'SAML SSO',
      'Custom contracts',
      'SLA 99.99%',
    ],
    highlighted: false,
  },
]
</script>

<template>
  <div class="column q-gutter-y-xl">
    <div class="text-center q-mx-auto" style="max-width: 560px">
      <h1 class="text-h5 q-my-none">Simple, transparent pricing</h1>
      <p class="text-body2 q-mt-sm q-mb-none" style="opacity: 0.7">
        Start free, upgrade when you grow. All plans include a 14-day trial —
        no credit card required.
      </p>
      <div class="row items-center justify-center q-gutter-x-sm q-mt-md">
        <span class="text-body2" :style="{ opacity: yearly ? 0.5 : 1 }">Monthly</span>
        <q-toggle v-model="yearly" dense aria-label="Bill yearly" />
        <span class="text-body2" :style="{ opacity: yearly ? 1 : 0.5 }">
          Yearly <q-chip class="bg-primary text-on-primary q-ml-xs" size="sm">-20%</q-chip>
        </span>
      </div>
    </div>

    <div class="row justify-center q-col-gutter-md">
      <div
        v-for="plan in plans"
        :key="plan.name"
        class="col-12 col-md-4"
        style="max-width: 360px"
      >
        <q-card
          class="full-height column"
          :class="{ 'bg-surface-muted': plan.highlighted }"
        >
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-subtitle1">{{ plan.name }}</div>
              <q-chip v-if="plan.highlighted" class="bg-primary text-on-primary">
                Most popular
              </q-chip>
            </div>
            <div class="text-caption" style="opacity: 0.7">{{ plan.description }}</div>
          </q-card-section>
          <q-card-section class="col column q-pt-none">
            <div class="row items-baseline q-gutter-x-xs">
              <span class="text-h4">${{ yearly ? plan.yearly : plan.monthly }}</span>
              <span class="text-caption" style="opacity: 0.6">/ user / month</span>
            </div>
            <p v-if="yearly" class="text-caption q-mt-xs q-mb-none" style="opacity: 0.6">
              Billed annually
            </p>
            <q-separator class="q-my-md" />
            <ul class="column q-gutter-y-sm q-pa-none q-ma-none" style="list-style: none">
              <li v-for="feature in plan.features" :key="feature" class="row items-center q-gutter-x-sm no-wrap">
                <Check :size="16" class="text-primary" />
                <span class="text-body2">{{ feature }}</span>
              </li>
            </ul>
            <div class="q-mt-auto q-pt-lg">
              <q-btn
                v-if="plan.highlighted"
                color="primary"
                class="full-width"
                label="Get started"
              />
              <q-btn v-else outline class="full-width" label="Get started" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <p class="text-center text-caption q-mb-none" style="opacity: 0.6">
      Need something custom? <a href="#" class="text-primary">Contact sales</a>.
    </p>
  </div>
</template>
