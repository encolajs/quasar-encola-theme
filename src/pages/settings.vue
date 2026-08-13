<script setup lang="ts">
import { ref } from 'vue'
import EFormField from '@/encola/components/EFormField.vue'

const tab = ref('profile')
const saved = ref(false)

const profile = ref({
  name: 'Jane Doe',
  email: 'jane.doe@domain.com',
  username: 'janedoe',
  bio: '',
})

const password = ref({ current: '', next: '', confirm: '' })

const notifications = ref({
  comments: true,
  mentions: true,
  followers: false,
  digest: true,
  marketing: false,
})

function save() {
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>

<template>
  <div class="column q-gutter-y-lg e-page-narrow">
    <div>
      <h1 class="text-h5 q-my-none">Settings</h1>
      <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
        Manage your account settings and preferences.
      </p>
    </div>

    <q-banner v-if="saved" class="e-alert e-alert--positive">
      Settings saved. (demo only)
    </q-banner>

    <q-tabs v-model="tab" align="left">
      <q-tab name="profile" label="Profile" />
      <q-tab name="password" label="Password" />
      <q-tab name="notifications" label="Notifications" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <!-- Profile -->
      <q-tab-panel name="profile" class="q-pa-none">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">Profile</div>
            <div class="text-caption" style="opacity: 0.7">
              This information is displayed publicly.
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <form class="column q-gutter-y-md" @submit.prevent="save">
              <div class="row items-center q-gutter-x-md">
                <q-avatar size="56px" class="bg-surface-accented">
                  <span class="text-subtitle2">JD</span>
                </q-avatar>
                <div class="row q-gutter-sm">
                  <q-btn outline size="sm" label="Change avatar" />
                  <q-btn flat size="sm" color="negative" label="Remove" />
                </div>
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-md-6">
                  <EFormField label="Full name" required>
                    <q-input v-model="profile.name" placeholder="Jane Cooper" />
                  </EFormField>
                </div>
                <div class="col-12 col-md-6">
                  <EFormField label="Username" help="encola.dev/@username">
                    <q-input v-model="profile.username" placeholder="jane" />
                  </EFormField>
                </div>
                <div class="col-12">
                  <EFormField label="Email" required>
                    <q-input v-model="profile.email" placeholder="you@example.com" type="email" />
                  </EFormField>
                </div>
                <div class="col-12">
                  <EFormField label="Bio" help="A short description for your profile.">
                    <q-input
                      v-model="profile.bio"
                      type="textarea"
                      rows="3"
                      placeholder="Tell us about yourself"
                    />
                  </EFormField>
                </div>
              </div>
              <div class="row justify-end">
                <q-btn color="primary" type="submit" label="Save changes" />
              </div>
            </form>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Password -->
      <q-tab-panel name="password" class="q-pa-none">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">Change password</div>
            <div class="text-caption" style="opacity: 0.7">
              Use a long, random password you don't reuse.
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <form class="column q-gutter-y-md" style="max-width: 420px" @submit.prevent="save">
              <EFormField label="Current password" required>
                <q-input
                  v-model="password.current"
                  placeholder="••••••••"
                  type="password"
                  autocomplete="current-password"
                />
              </EFormField>
              <EFormField label="New password" required help="At least 8 characters.">
                <q-input
                  v-model="password.next"
                  placeholder="••••••••"
                  type="password"
                  autocomplete="new-password"
                />
              </EFormField>
              <EFormField label="Confirm new password" required>
                <q-input
                  v-model="password.confirm"
                  placeholder="••••••••"
                  type="password"
                  autocomplete="new-password"
                />
              </EFormField>
              <div class="row justify-end">
                <q-btn color="primary" type="submit" label="Update password" />
              </div>
            </form>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <!-- Notifications -->
      <q-tab-panel name="notifications" class="q-pa-none">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">Notifications</div>
            <div class="text-caption" style="opacity: 0.7">
              Choose what you want to hear about.
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <form class="column" @submit.prevent="save">
              <q-toggle v-model="notifications.comments" label="Comments on your posts" />
              <q-toggle v-model="notifications.mentions" label="Mentions" />
              <q-toggle v-model="notifications.followers" label="New followers" />
              <q-separator class="q-my-md" />
              <q-toggle v-model="notifications.digest" label="Weekly digest email" />
              <q-toggle v-model="notifications.marketing" label="Product news and offers" />
              <div class="row justify-end q-mt-md">
                <q-btn color="primary" type="submit" label="Save preferences" />
              </div>
            </form>
          </q-card-section>
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
