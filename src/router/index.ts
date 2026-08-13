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
    {
      path: '/users',
      component: () => import('@/pages/users.vue'),
      meta: { layout: 'default', title: 'Users' },
    },
    {
      path: '/invoices',
      component: () => import('@/pages/invoices.vue'),
      meta: { layout: 'default', title: 'Invoices' },
    },
    {
      path: '/forms',
      component: () => import('@/pages/forms.vue'),
      meta: { layout: 'default', title: 'Form layouts' },
    },
    {
      path: '/form-wizard',
      component: () => import('@/pages/form-wizard.vue'),
      meta: { layout: 'default', title: 'Form wizard' },
    },
    {
      path: '/comparison',
      component: () => import('@/pages/comparison.vue'),
      meta: { layout: 'default', title: 'Before / after' },
    },
    {
      path: '/ui/form-fields',
      component: () => import('@/pages/ui/form-fields.vue'),
      meta: { layout: 'default', title: 'Form fields' },
    },
    {
      path: '/ui/navigation',
      component: () => import('@/pages/ui/navigation.vue'),
      meta: { layout: 'default', title: 'Navigation' },
    },
    {
      path: '/ui/overlays',
      component: () => import('@/pages/ui/overlays.vue'),
      meta: { layout: 'default', title: 'Overlays' },
    },
    {
      path: '/ui/feedback',
      component: () => import('@/pages/ui/feedback.vue'),
      meta: { layout: 'default', title: 'Feedback' },
    },
    {
      path: '/settings',
      component: () => import('@/pages/settings.vue'),
      meta: { layout: 'default', title: 'Settings' },
    },
    {
      path: '/pricing',
      component: () => import('@/pages/pricing.vue'),
      meta: { layout: 'default', title: 'Pricing' },
    },
    {
      path: '/faq',
      component: () => import('@/pages/faq.vue'),
      meta: { layout: 'default', title: 'FAQ' },
    },
    {
      path: '/auth/login',
      component: () => import('@/pages/auth/login.vue'),
      meta: { layout: 'blank', title: 'Sign in' },
    },
    {
      path: '/auth/register',
      component: () => import('@/pages/auth/register.vue'),
      meta: { layout: 'blank', title: 'Create an account' },
    },
    {
      path: '/auth/forgot-password',
      component: () => import('@/pages/auth/forgot-password.vue'),
      meta: { layout: 'blank', title: 'Reset password' },
    },
    {
      path: '/auth/two-factor',
      component: () => import('@/pages/auth/two-factor.vue'),
      meta: { layout: 'blank', title: 'Two-factor authentication' },
    },
    {
      path: '/errors/500',
      component: () => import('@/pages/errors/server-error.vue'),
      meta: { layout: 'blank', title: 'Server error' },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/pages/errors/not-found.vue'),
      meta: { layout: 'blank', title: 'Page not found' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} — Encola` : 'Encola'
})
