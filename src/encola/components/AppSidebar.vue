<script setup lang="ts">
// App sidebar: logo, environment picker (sticky top), scrollable main
// menu, help + user menu (sticky bottom). Collapses to an icon rail
// (Quasar mini mode) on desktop via useSidebar and becomes a temporary
// drawer on mobile.
import { ref } from 'vue'
import type { FunctionalComponent } from 'vue'
import { useRoute } from 'vue-router'
import {
  BellRing,
  Check,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CircleHelp,
  CircleUser,
  Compass,
  CreditCard,
  FileText,
  FolderKanban,
  GitCompare,
  KeyRound,
  Layers,
  LayoutDashboard,
  ListTodo,
  LogIn,
  LogOut,
  NotebookPen,
  Palette,
  ReceiptText,
  Server,
  Settings,
  Shapes,
  SquareStack,
  TextCursorInput,
  Users,
} from '@lucide/vue'
import { useSidebar } from '../composables/useSidebar'

const { isMobile, mobileOpen, rail } = useSidebar()
const route = useRoute()

const environments = [
  'Test environment',
  'Staging environment',
  'Production environment',
]
const environment = ref(environments[0])

interface NavItem {
  title: string
  icon: FunctionalComponent
  to: string
}

interface NavSection {
  title: string
  icon: FunctionalComponent
  to?: string // leaf link
  items?: NavItem[] // group with children
  collapsed?: boolean // children hidden by default
}

const navSections: NavSection[] = [
  { title: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  {
    title: 'Management',
    icon: FolderKanban,
    items: [
      { title: 'Users', icon: Users, to: '/users' },
      { title: 'Invoices', icon: ReceiptText, to: '/invoices' },
    ],
  },
  {
    title: 'Forms',
    icon: NotebookPen,
    items: [
      { title: 'Form layouts', icon: FileText, to: '/forms' },
      { title: 'Form wizard', icon: ListTodo, to: '/form-wizard' },
    ],
  },
  {
    title: 'UI',
    icon: Shapes,
    items: [
      { title: 'Form fields', icon: TextCursorInput, to: '/ui/form-fields' },
      { title: 'Navigation', icon: Compass, to: '/ui/navigation' },
      { title: 'Overlays', icon: SquareStack, to: '/ui/overlays' },
      { title: 'Feedback', icon: BellRing, to: '/ui/feedback' },
    ],
  },
  {
    title: 'Pages',
    icon: Layers,
    collapsed: true,
    items: [
      { title: 'Settings', icon: Settings, to: '/settings' },
      { title: 'Pricing', icon: CreditCard, to: '/pricing' },
      { title: 'FAQ', icon: CircleHelp, to: '/faq' },
      { title: 'Sign in', icon: LogIn, to: '/auth/login' },
      { title: 'Two-factor', icon: KeyRound, to: '/auth/two-factor' },
    ],
  },
  { title: 'Kitchen sink', icon: Palette, to: '/kitchen-sink' },
  { title: 'Before / after', icon: GitCompare, to: '/comparison' },
]

// groups open by default unless marked collapsed; explicit state so the
// flag always wins on first render and survives rail toggles
const openSections = ref(
  new Set(navSections.filter((s) => s.items && !s.collapsed).map((s) => s.title)),
)

function toggleSection(title: string) {
  const next = new Set(openSections.value)
  if (next.has(title)) next.delete(title)
  else next.add(title)
  openSections.value = next
}

function isSectionActive(section: NavSection) {
  return section.items?.some((item) => route.path.startsWith(item.to)) ?? false
}

const user = { name: 'Jane Doe', email: 'jane.doe@domain.com', initials: 'JD' }

const userMenu = [
  { title: 'Profile', icon: CircleUser },
  { title: 'Settings', icon: Settings },
  { title: 'Billing', icon: CreditCard },
]
</script>

<template>
  <q-drawer
    class="e-sidebar"
    :model-value="isMobile ? mobileOpen : true"
    :behavior="isMobile ? 'mobile' : 'desktop'"
    :mini="rail"
    :width="260"
    :mini-width="56"
    bordered
    @update:model-value="(v: boolean) => (mobileOpen = v)"
  >
    <!-- logo: full wordmark expanded, mark only when collapsed -->
    <router-link to="/" class="e-sidebar__logo" aria-label="Encola home">
      <svg class="e-sidebar__mark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="var(--q-primary)" />
        <text
          x="12"
          y="16.5"
          text-anchor="middle"
          font-size="13"
          font-weight="700"
          fill="var(--q-on-primary)"
        >
          E
        </text>
      </svg>
      <span v-if="!rail" class="e-sidebar__wordmark">Encola</span>
    </router-link>

    <!-- above main menu: environment picker -->
    <div class="e-sidebar__top">
      <q-item
        clickable
        class="e-sidebar__control"
        :class="{ 'e-sidebar__control--rail': rail }"
        aria-label="Environment"
      >
        <q-item-section avatar>
          <Server :size="18" />
        </q-item-section>
        <q-item-section>{{ environment }}</q-item-section>
        <q-item-section side>
          <ChevronsUpDown :size="14" style="opacity: 0.5" />
        </q-item-section>
        <q-tooltip v-if="rail" anchor="center right" self="center left">
          {{ environment }}
        </q-tooltip>
        <q-menu :anchor="rail ? 'top right' : 'bottom left'" :self="rail ? 'top left' : 'top left'">
          <q-list style="min-width: 220px">
            <q-item
              v-for="env in environments"
              :key="env"
              v-close-popup
              clickable
              @click="environment = env"
            >
              <q-item-section>{{ env }}</q-item-section>
              <q-item-section side>
                <Check v-if="environment === env" :size="14" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
    </div>

    <!-- main menu: the only scrollable region -->
    <div class="e-sidebar__menu">
      <q-list>
        <template v-for="section in navSections" :key="section.title">
          <!-- leaf link -->
          <q-item v-if="section.to" :to="section.to" clickable>
            <q-item-section avatar>
              <component :is="section.icon" :size="18" />
            </q-item-section>
            <q-item-section>{{ section.title }}</q-item-section>
            <q-tooltip v-if="rail" anchor="center right" self="center left">
              {{ section.title }}
            </q-tooltip>
          </q-item>

          <!-- expanded: collapsible group -->
          <template v-else-if="!rail">
            <q-item
              clickable
              :aria-expanded="openSections.has(section.title)"
              @click="toggleSection(section.title)"
            >
              <q-item-section avatar>
                <component :is="section.icon" :size="18" />
              </q-item-section>
              <q-item-section>{{ section.title }}</q-item-section>
              <q-item-section side>
                <component
                  :is="openSections.has(section.title) ? ChevronUp : ChevronDown"
                  :size="16"
                  style="opacity: 0.6"
                />
              </q-item-section>
            </q-item>
            <div v-show="openSections.has(section.title)" class="e-sidebar__group">
              <q-item v-for="item in section.items" :key="item.to" :to="item.to" clickable>
                <q-item-section avatar>
                  <component :is="item.icon" :size="18" />
                </q-item-section>
                <q-item-section>{{ item.title }}</q-item-section>
              </q-item>
            </div>
          </template>

          <!-- rail: section icon opens children as a flyout menu -->
          <q-item v-else clickable :active="isSectionActive(section)">
            <q-item-section avatar>
              <component :is="section.icon" :size="18" />
            </q-item-section>
            <q-item-section>{{ section.title }}</q-item-section>
            <q-tooltip anchor="center right" self="center left">
              {{ section.title }}
            </q-tooltip>
            <q-menu anchor="top right" self="top left">
              <q-list style="min-width: 200px">
                <q-item-label header>{{ section.title }}</q-item-label>
                <q-item
                  v-for="item in section.items"
                  :key="item.to"
                  v-close-popup
                  :to="item.to"
                  clickable
                >
                  <q-item-section avatar>
                    <component :is="item.icon" :size="16" />
                  </q-item-section>
                  <q-item-section>{{ item.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </template>
      </q-list>
    </div>

    <!-- below main menu: help + user menu -->
    <div class="e-sidebar__bottom">
      <q-list>
        <q-item clickable href="#">
          <q-item-section avatar>
            <CircleHelp :size="18" />
          </q-item-section>
          <q-item-section>Help &amp; support</q-item-section>
          <q-tooltip v-if="rail" anchor="center right" self="center left">
            Help &amp; support
          </q-tooltip>
        </q-item>

        <q-item clickable class="e-sidebar__control" aria-label="User menu">
          <q-item-section avatar>
            <q-avatar size="24px" class="bg-surface-accented">
              <span class="e-sidebar__initials">{{ user.initials }}</span>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
            <q-item-label caption>{{ user.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <ChevronsUpDown :size="14" style="opacity: 0.5" />
          </q-item-section>
          <q-tooltip v-if="rail" anchor="center right" self="center left">
            {{ user.name }}
          </q-tooltip>
          <q-menu anchor="top right" self="bottom left">
            <q-list style="min-width: 200px">
              <q-item
                v-for="entry in userMenu"
                :key="entry.title"
                v-close-popup
                clickable
              >
                <q-item-section avatar>
                  <component :is="entry.icon" :size="16" />
                </q-item-section>
                <q-item-section>{{ entry.title }}</q-item-section>
              </q-item>
              <q-separator class="q-my-xs" />
              <q-item v-close-popup clickable class="text-negative">
                <q-item-section avatar>
                  <LogOut :size="16" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>
