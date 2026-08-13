import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  // follows Vite's base (deployed under /quasar-theme/)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      component: () => import('@/pages/dashboard.vue'),
      meta: { layout: 'default', title: 'Dashboard' },
    },
    {
      path: '/kitchen-sink',
      component: () => import('@/pages/kitchen-sink.vue'),
      meta: { layout: 'default', title: 'Kitchen sink' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} — Encola` : 'Encola'
})
