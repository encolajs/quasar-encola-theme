import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/kitchen-sink' },
    {
      path: '/kitchen-sink',
      name: 'kitchen-sink',
      component: () => import('@/pages/KitchenSinkPage.vue'),
    },
  ],
})
