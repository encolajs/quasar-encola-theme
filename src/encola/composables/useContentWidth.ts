// Shared content-width state for the app shell: 'compact' caps the main
// content (and lets pages narrow themselves further via e-page-narrow);
// 'wide' lifts every cap. The CSS lives in overrides.css under
// `.e-content--*`; the layout binds the class from here.
import { computed, ref } from 'vue'

export type ContentWidth = 'compact' | 'wide'

const contentWidth = ref<ContentWidth>('compact')

export function useContentWidth() {
  const contentClass = computed(() => `e-content--${contentWidth.value}`)
  return { contentWidth, contentClass }
}
