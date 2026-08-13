<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import {
  Bell,
  CircleCheckBig,
  CircleX,
  FolderOpen,
  Info,
  Mail,
  ShoppingCart,
  TriangleAlert,
  X,
} from '@lucide/vue'

const $q = useQuasar()
const progress = ref(0.65)
const warningVisible = ref(true)

function showToast() {
  $q.notify({ message: 'Changes saved to draft.', actions: [{ label: 'Dismiss', color: 'primary' }] })
}

function showSuccess() {
  $q.notify({
    message: 'Project published successfully.',
    color: 'positive',
    textColor: 'on-positive',
  })
}
</script>

<template>
  <div class="column q-gutter-y-xl">
    <div>
      <h1 class="text-h5 q-my-none">Feedback</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        Alerts, badges, progress, skeletons, toasts and empty states.
      </p>
    </div>

    <!-- Alerts -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Alerts</h2>
      <div class="column q-gutter-y-md">
        <q-banner class="e-alert e-alert--positive">
          <template #avatar>
            <CircleCheckBig :size="18" />
          </template>
          <strong>Payment successful</strong><br />
          Your invoice has been paid. A receipt was sent to your email.
        </q-banner>
        <q-banner v-if="warningVisible" class="e-alert e-alert--warning">
          <template #avatar>
            <TriangleAlert :size="18" />
          </template>
          <strong>Storage almost full</strong><br />
          You are using 92% of your storage quota.
          <template #action>
            <q-btn flat round size="sm" aria-label="Dismiss" @click="warningVisible = false">
              <X :size="14" />
            </q-btn>
          </template>
        </q-banner>
        <q-banner class="e-alert e-alert--negative">
          <template #avatar>
            <CircleX :size="18" />
          </template>
          <strong>Deployment failed</strong><br />
          The build exited with a non-zero status code.
          <template #action>
            <q-btn color="negative" size="sm" label="Retry" />
          </template>
        </q-banner>
        <q-banner class="e-alert e-alert--info" style="border-left: 3px solid var(--q-info)">
          <template #avatar>
            <Info :size="18" />
          </template>
          <strong>Callout with a border</strong><br />
          An accent edge gives alerts a Nuxt-UI-style callout look.
        </q-banner>
      </div>
    </section>

    <!-- Badges -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Badges</h2>
      <div class="row wrap items-center q-gutter-lg">
        <div class="relative-position">
          <Bell :size="22" />
          <q-badge floating color="primary">3</q-badge>
        </div>
        <div class="relative-position">
          <Mail :size="22" />
          <q-badge floating color="negative">99+</q-badge>
        </div>
        <div class="relative-position">
          <ShoppingCart :size="22" />
          <q-badge floating rounded color="positive" />
        </div>
        <div class="row items-center">
          <span class="text-body2">Inline badge</span>
          <q-badge color="primary" class="q-ml-sm">2</q-badge>
        </div>
        <q-btn outline>
          Notifications
          <q-badge color="negative" class="q-ml-sm">9</q-badge>
        </q-btn>
      </div>
    </section>

    <!-- Progress linear -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Progress — linear</h2>
      <div class="column q-gutter-y-md" style="max-width: 480px">
        <q-linear-progress :value="progress" color="primary" rounded />
        <q-linear-progress indeterminate color="primary" rounded />
        <q-linear-progress :value="0.4" :buffer="0.7" color="info" rounded />
        <q-linear-progress :value="progress" color="positive" rounded size="16px">
          <div class="absolute-full flex flex-center">
            <span class="text-caption text-on-positive">{{ Math.ceil(progress * 100) }}%</span>
          </div>
        </q-linear-progress>
      </div>
    </section>

    <!-- Progress circular -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Progress — circular</h2>
      <div class="row wrap items-center q-gutter-lg">
        <q-spinner color="primary" size="32px" />
        <q-circular-progress
          :value="progress * 100"
          show-value
          size="40px"
          :thickness="0.15"
          color="primary"
        >
          <span class="text-caption">{{ progress * 100 }}</span>
        </q-circular-progress>
        <q-circular-progress :value="30" size="32px" :thickness="0.15" color="warning" />
        <q-spinner color="secondary" size="20px" :thickness="2" />
      </div>
    </section>

    <!-- Skeletons -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Skeleton loaders</h2>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-4">
          <q-card>
            <q-card-section v-for="i in 2" :key="i" class="row items-center no-wrap q-gutter-x-sm">
              <q-skeleton type="QAvatar" size="32px" />
              <div class="col">
                <q-skeleton type="text" width="60%" />
                <q-skeleton type="text" width="90%" />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card>
            <q-skeleton height="120px" square />
            <q-card-section>
              <q-skeleton type="text" width="40%" class="text-subtitle1" />
              <q-skeleton type="text" />
              <q-skeleton type="text" width="80%" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card>
            <q-card-section v-for="i in 3" :key="i" class="row q-gutter-x-md items-center">
              <q-skeleton type="text" width="20%" />
              <q-skeleton type="text" class="col" />
              <q-skeleton type="text" width="15%" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Toasts -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Toasts</h2>
      <div class="row wrap q-gutter-sm">
        <q-btn outline label="Show toast" @click="showToast" />
        <q-btn color="primary" label="Show success" @click="showSuccess" />
      </div>
    </section>

    <!-- Empty state -->
    <section>
      <h2 class="text-subtitle1 q-mt-none q-mb-md">Empty state</h2>
      <q-card>
        <q-card-section class="text-center q-py-xl">
          <FolderOpen :size="32" style="opacity: 0.4" />
          <div class="text-subtitle1 q-mt-md">No projects yet</div>
          <p class="text-body2 q-mt-xs q-mx-auto" style="opacity: 0.7; max-width: 360px">
            Create your first project to see it here. Projects group related
            work together.
          </p>
          <q-btn color="primary" class="q-mt-md" label="New project" />
        </q-card-section>
      </q-card>
    </section>
  </div>
</template>
