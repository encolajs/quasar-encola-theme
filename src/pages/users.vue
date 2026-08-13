<script setup lang="ts">
import { computed, ref } from 'vue'
import { Pencil, Plus, Search, Trash2 } from '@lucide/vue'
import type { QTableColumn } from 'quasar'
import EFormField from '@/encola/components/EFormField.vue'

interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Member' | 'Viewer'
  active: boolean
}

const users = ref<User[]>([
  { id: 1, name: 'Lindsay Walton', email: 'lindsay@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Courtney Henry', email: 'courtney@example.com', role: 'Member', active: true },
  { id: 3, name: 'Tom Cook', email: 'tom@example.com', role: 'Member', active: false },
  { id: 4, name: 'Whitney Francis', email: 'whitney@example.com', role: 'Viewer', active: true },
  { id: 5, name: 'Leonard Krasner', email: 'leonard@example.com', role: 'Member', active: true },
  { id: 6, name: 'Floyd Miles', email: 'floyd@example.com', role: 'Viewer', active: false },
])

const search = ref('')
const dialog = ref(false)
const deleteDialog = ref(false)
const editing = ref<User | null>(null)
const target = ref<User | null>(null)

const form = ref<{ name: string; email: string; role: User['role']; active: boolean }>({
  name: '',
  email: '',
  role: 'Member',
  active: true,
})
const formErrors = ref<{ name?: string; email?: string }>({})

const columns: QTableColumn<User>[] = [
  { name: 'name', label: 'User', field: 'name', align: 'left', sortable: true },
  { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true },
  { name: 'active', label: 'Status', field: 'active', align: 'left', sortable: true },
  { name: 'actions', label: '', field: () => '', align: 'right' },
]

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase()

function openCreate() {
  editing.value = null
  form.value = { name: '', email: '', role: 'Member', active: true }
  formErrors.value = {}
  dialog.value = true
}

function openEdit(user: User) {
  editing.value = user
  form.value = { name: user.name, email: user.email, role: user.role, active: user.active }
  formErrors.value = {}
  dialog.value = true
}

function save() {
  formErrors.value = {}
  if (!form.value.name.trim()) formErrors.value.name = 'Name is required.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email))
    formErrors.value.email = 'Please enter a valid email address.'
  if (Object.keys(formErrors.value).length) return

  if (editing.value) {
    Object.assign(editing.value, form.value)
  } else {
    users.value.push({
      id: Math.max(...users.value.map((u) => u.id)) + 1,
      ...form.value,
    })
  }
  dialog.value = false
}

function confirmDelete(user: User) {
  target.value = user
  deleteDialog.value = true
}

function remove() {
  users.value = users.value.filter((u) => u.id !== target.value?.id)
  deleteDialog.value = false
}

const activeCount = computed(() => users.value.filter((u) => u.active).length)
</script>

<template>
  <div class="column q-gutter-y-lg">
    <div class="row items-center justify-between q-col-gutter-sm wrap">
      <div>
        <h1 class="text-h5 q-my-none">Users</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          {{ users.length }} members, {{ activeCount }} active.
        </p>
      </div>
      <q-btn color="primary" @click="openCreate">
        <Plus :size="16" class="q-mr-sm" />
        Add user
      </q-btn>
    </div>

    <q-card>
      <q-card-section>
        <q-input
          v-model="search"
          placeholder="Search users…"
          style="width: 280px; max-width: 100%"
          clearable
        >
          <template #prepend>
            <Search :size="16" />
          </template>
        </q-input>
      </q-card-section>

      <q-table :rows="users" :columns="columns" :filter="search" row-key="id">
        <template #body-cell-name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap q-gutter-x-sm q-py-xs">
              <q-avatar size="32px" class="bg-surface-accented">
                <span class="e-sidebar__initials">{{ initials(props.row.name) }}</span>
              </q-avatar>
              <div>
                <div class="text-subtitle2">{{ props.row.name }}</div>
                <div class="text-caption" style="opacity: 0.6">{{ props.row.email }}</div>
              </div>
            </div>
          </q-td>
        </template>
        <template #body-cell-role="props">
          <q-td :props="props">
            <q-chip
              class="q-ml-none"
              :class="props.row.role === 'Admin' ? 'bg-primary text-on-primary' : ''"
            >
              {{ props.row.role }}
            </q-chip>
          </q-td>
        </template>
        <template #body-cell-active="props">
          <q-td :props="props">
            <q-chip
              class="q-ml-none"
              :class="props.row.active ? 'bg-primary text-on-primary' : ''"
            >
              {{ props.row.active ? 'Active' : 'Inactive' }}
            </q-chip>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="row justify-end q-gutter-xs no-wrap">
              <q-btn flat round size="sm" aria-label="Edit user" @click="openEdit(props.row)">
                <Pencil :size="16" />
              </q-btn>
              <q-btn
                flat
                round
                size="sm"
                color="negative"
                aria-label="Delete user"
                @click="confirmDelete(props.row)"
              >
                <Trash2 :size="16" />
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- create / edit -->
    <q-dialog v-model="dialog">
      <q-card style="width: 440px; max-width: 90vw">
        <q-card-section>
          <div class="text-subtitle1">{{ editing ? 'Edit user' : 'Add user' }}</div>
          <div class="text-caption" style="opacity: 0.7">
            {{ editing ? 'Update the member details.' : 'Invite a new member to the team.' }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <form class="column q-gutter-y-md" @submit.prevent="save">
            <EFormField label="Full name" required :error="formErrors.name">
              <q-input v-model="form.name" placeholder="Jane Cooper" />
            </EFormField>
            <EFormField label="Email" required :error="formErrors.email">
              <q-input v-model="form.email" placeholder="jane@example.com" type="email" />
            </EFormField>
            <EFormField label="Role">
              <q-select v-model="form.role" :options="['Admin', 'Member', 'Viewer']" />
            </EFormField>
            <q-toggle v-model="form.active" label="Active" />
          </form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="dialog = false" />
          <q-btn
            color="primary"
            :label="editing ? 'Save changes' : 'Add user'"
            @click="save"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- delete confirm -->
    <q-dialog v-model="deleteDialog">
      <q-card style="width: 400px; max-width: 90vw">
        <q-card-section>
          <div class="text-subtitle1">Remove {{ target?.name }}?</div>
          <div class="text-caption" style="opacity: 0.7">This action cannot be undone.</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-body2">
          The user will lose access to all projects immediately.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="deleteDialog = false" />
          <q-btn color="negative" label="Remove user" @click="remove" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
