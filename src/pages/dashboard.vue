<script setup lang="ts">
import { computed } from 'vue'
import { CreditCard, DollarSign, Download, Plus, Users } from '@lucide/vue'
import type { FunctionalComponent } from 'vue'

interface Stat {
  title: string
  value: string
  change: string
  up: boolean
  icon: FunctionalComponent
}

const stats: Stat[] = [
  { title: 'Total revenue', value: '$45,231', change: '+20.1% from last month', up: true, icon: DollarSign },
  { title: 'Subscriptions', value: '2,350', change: '+180 this week', up: true, icon: Users },
  { title: 'Sales', value: '12,234', change: '+19% from last month', up: true, icon: CreditCard },
  { title: 'Churn', value: '1.2%', change: '-0.3% from last month', up: false, icon: Users },
]

const revenue = [42, 58, 51, 63, 71, 66, 80, 74, 89, 84, 95, 102]

// inline SVG sparkline (Quasar has no VSparkline equivalent)
const sparkline = computed(() => {
  const w = 600
  const h = 120
  const pad = 8
  const min = Math.min(...revenue)
  const max = Math.max(...revenue)
  const step = (w - pad * 2) / (revenue.length - 1)
  return revenue
    .map((v, i) => {
      const x = pad + i * step
      const y = pad + (h - pad * 2) * (1 - (v - min) / (max - min))
      return `${x},${y}`
    })
    .join(' ')
})

const activity = [
  { user: 'Olivia Martin', action: 'Upgraded to Business', amount: '+$1,999', time: '2 min ago' },
  { user: 'Jackson Lee', action: 'New subscription', amount: '+$39', time: '14 min ago' },
  { user: 'Isabella Nguyen', action: 'New subscription', amount: '+$299', time: '1 h ago' },
  { user: 'William Kim', action: 'Refund issued', amount: '-$99', time: '3 h ago' },
  { user: 'Sofia Davis', action: 'New subscription', amount: '+$39', time: '5 h ago' },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
</script>

<template>
  <div class="column q-gutter-y-lg">
    <div class="row items-center justify-between q-col-gutter-sm wrap">
      <div>
        <h1 class="text-h5 q-my-none">Dashboard</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          Overview of your business for the last 30 days.
        </p>
      </div>
      <div class="row q-gutter-sm">
        <q-btn outline>
          <Download :size="16" class="q-mr-sm" />
          Export
        </q-btn>
        <q-btn color="primary">
          <Plus :size="16" class="q-mr-sm" />
          New invoice
        </q-btn>
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div v-for="stat in stats" :key="stat.title" class="col-12 col-sm-6 col-lg-3">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <span class="text-body2" style="opacity: 0.7">{{ stat.title }}</span>
              <component :is="stat.icon" :size="16" style="opacity: 0.5" />
            </div>
            <div class="text-h6 q-mt-sm">{{ stat.value }}</div>
            <div
              class="text-caption q-mt-xs"
              :class="stat.up ? 'text-primary' : 'text-negative'"
            >
              {{ stat.change }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-lg-7">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">Revenue</div>
            <div class="text-caption" style="opacity: 0.7">
              Monthly recurring revenue, last 12 months
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <svg
              viewBox="0 0 600 120"
              preserveAspectRatio="none"
              style="width: 100%; height: 120px; display: block"
              aria-hidden="true"
            >
              <polyline
                :points="sparkline"
                fill="none"
                stroke="var(--q-primary)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-lg-5">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-subtitle1">Recent activity</div>
            <div class="text-caption" style="opacity: 0.7">You made 265 sales this month</div>
          </q-card-section>
          <q-list class="q-pb-sm">
            <q-item v-for="item in activity" :key="item.user + item.time">
              <q-item-section avatar>
                <q-avatar size="28px" class="bg-surface-accented">
                  <span class="e-sidebar__initials">{{ initials(item.user) }}</span>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.user }}</q-item-label>
                <q-item-label caption>{{ item.action }} · {{ item.time }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <span
                  class="text-body2"
                  :class="item.amount.startsWith('+') ? 'text-primary' : 'text-negative'"
                >
                  {{ item.amount }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <q-card>
      <q-card-section>
        <div class="text-subtitle1">Quick actions</div>
      </q-card-section>
      <q-card-section class="q-pt-none row wrap q-gutter-sm">
        <q-btn flat color="primary" class="e-btn-soft">
          <Plus :size="16" class="q-mr-sm" />
          Add customer
        </q-btn>
        <q-btn flat color="primary" class="e-btn-soft">
          <CreditCard :size="16" class="q-mr-sm" />
          Create invoice
        </q-btn>
        <q-btn flat color="primary" class="e-btn-soft">
          <Download :size="16" class="q-mr-sm" />
          Download report
        </q-btn>
        <q-btn flat color="primary" class="e-btn-soft">
          <Users :size="16" class="q-mr-sm" />
          Invite team member
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>
