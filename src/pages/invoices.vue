<script setup lang="ts">
import { computed, ref } from 'vue'
import { Download, EllipsisVertical, Plus, Search } from '@lucide/vue'
import type { QTableColumn } from 'quasar'

type Status = 'paid' | 'pending' | 'overdue' | 'draft'

interface Invoice {
  id: string
  customer: string
  email: string
  amount: number
  status: Status
  date: string
}

const search = ref('')
const statusFilter = ref<{ label: string; value: Status | null }>({
  label: 'All statuses',
  value: null,
})

const statusOptions = [
  { label: 'All statuses', value: null },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Draft', value: 'draft' },
]

const columns: QTableColumn<Invoice>[] = [
  { name: 'id', label: 'Invoice', field: 'id', align: 'left', sortable: true },
  { name: 'customer', label: 'Customer', field: 'customer', align: 'left', sortable: true },
  { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
  { name: 'date', label: 'Date', field: 'date', align: 'left', sortable: true },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'right', sortable: true },
  { name: 'actions', label: '', field: () => '', align: 'right' },
]

const invoices: Invoice[] = [
  { id: 'INV-1042', customer: 'Olivia Martin', email: 'olivia@acme.com', amount: 1999, status: 'paid', date: '2026-07-28' },
  { id: 'INV-1041', customer: 'Jackson Lee', email: 'jackson@wave.io', amount: 39, status: 'paid', date: '2026-07-27' },
  { id: 'INV-1040', customer: 'Isabella Nguyen', email: 'isabella@nova.dev', amount: 299, status: 'pending', date: '2026-07-25' },
  { id: 'INV-1039', customer: 'William Kim', email: 'will@arc.com', amount: 99, status: 'overdue', date: '2026-07-20' },
  { id: 'INV-1038', customer: 'Sofia Davis', email: 'sofia@pulse.app', amount: 39, status: 'paid', date: '2026-07-18' },
  { id: 'INV-1037', customer: 'Ethan Brown', email: 'ethan@forge.co', amount: 499, status: 'draft', date: '2026-07-16' },
  { id: 'INV-1036', customer: 'Mia Wilson', email: 'mia@orbit.gg', amount: 149, status: 'pending', date: '2026-07-12' },
  { id: 'INV-1035', customer: 'Lucas Moore', email: 'lucas@spark.dev', amount: 89, status: 'paid', date: '2026-07-10' },
  { id: 'INV-1034', customer: 'Amelia Taylor', email: 'amelia@drift.so', amount: 259, status: 'overdue', date: '2026-07-05' },
  { id: 'INV-1033', customer: 'Noah Anderson', email: 'noah@bolt.sh', amount: 79, status: 'paid', date: '2026-07-02' },
  { id: 'INV-1032', customer: 'Emma Thomas', email: 'emma@lume.app', amount: 189, status: 'paid', date: '2026-06-28' },
  { id: 'INV-1031', customer: 'Liam Jackson', email: 'liam@zeno.dev', amount: 349, status: 'pending', date: '2026-06-24' },
]

// chip fill + paired text color per status (draft stays neutral)
const statusClass: Record<Status, string> = {
  paid: 'bg-primary text-on-primary',
  pending: 'bg-warning text-on-warning',
  overdue: 'bg-negative text-on-negative',
  draft: '',
}

const filtered = computed(() =>
  statusFilter.value.value
    ? invoices.filter((i) => i.status === statusFilter.value.value)
    : invoices,
)

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const rowActions = ['View', 'Download PDF', 'Send reminder']
</script>

<template>
  <div class="column q-gutter-y-lg">
    <div class="row items-center justify-between q-col-gutter-sm wrap">
      <div>
        <h1 class="text-h5 q-my-none">Invoices</h1>
        <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
          A list of all invoices including customer, status and amount.
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

    <q-card>
      <q-card-section class="row wrap items-center q-gutter-sm">
        <q-input
          v-model="search"
          placeholder="Search invoices…"
          style="width: 280px"
          clearable
        >
          <template #prepend>
            <Search :size="16" />
          </template>
        </q-input>
        <q-select
          v-model="statusFilter"
          :options="statusOptions"
          style="width: 180px"
        />
      </q-card-section>

      <q-table
        :rows="filtered"
        :columns="columns"
        :filter="search"
        :pagination="{ rowsPerPage: 10 }"
        row-key="id"
      >
        <template #body-cell-id="props">
          <q-td :props="props">
            <span class="text-subtitle2">{{ props.row.id }}</span>
          </q-td>
        </template>
        <template #body-cell-customer="props">
          <q-td :props="props">
            <div>{{ props.row.customer }}</div>
            <div class="text-caption" style="opacity: 0.6">{{ props.row.email }}</div>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-chip :class="statusClass[props.row.status as Status]" class="text-capitalize q-ml-none">
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>
        <template #body-cell-amount="props">
          <q-td :props="props">
            {{ currency.format(props.row.amount) }}
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round size="sm" aria-label="Row actions">
              <EllipsisVertical :size="16" />
              <q-menu anchor="bottom right" self="top right">
                <q-list style="min-width: 160px">
                  <q-item
                    v-for="action in rowActions"
                    :key="action"
                    v-close-popup
                    clickable
                  >
                    <q-item-section>{{ action }}</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable class="text-negative">
                    <q-item-section>Void invoice</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
        <template #no-data>
          <div class="text-center q-py-xl full-width">
            <div class="text-subtitle1">No invoices found</div>
            <p class="text-body2 q-mt-xs q-mb-none" style="opacity: 0.7">
              Try adjusting your search or filters.
            </p>
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
</template>
