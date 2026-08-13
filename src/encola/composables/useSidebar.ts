// Shared sidebar state: collapsed rail (mini mode) on desktop
// (persisted), temporary drawer on mobile. Module-level refs so the
// header toggle and the sidebar component stay in sync.
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const STORAGE_KEY = 'encola-sidebar-collapsed'

const collapsed = ref(
  typeof localStorage !== 'undefined' &&
    localStorage.getItem(STORAGE_KEY) === 'true',
)
const mobileOpen = ref(false)

export function useSidebar() {
  const $q = useQuasar()
  const isMobile = computed(() => $q.screen.lt.md)
  const rail = computed(() => !isMobile.value && collapsed.value)

  function toggle() {
    if (isMobile.value) {
      mobileOpen.value = !mobileOpen.value
    } else {
      collapsed.value = !collapsed.value
      localStorage.setItem(STORAGE_KEY, String(collapsed.value))
    }
  }

  return { collapsed, mobileOpen, isMobile, rail, toggle }
}
