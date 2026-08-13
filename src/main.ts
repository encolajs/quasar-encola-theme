import { createApp } from 'vue'
import { Dialog, Notify, Quasar } from 'quasar'
import App from './App.vue'
import { router } from './router'
import { encola } from './encola'

createApp(App)
  .use(router)
  // Quasar plugins (Notify, Dialog, ...) are app-level opt-ins;
  // the theme options and your own choices merge freely here
  .use(Quasar, { ...encola(), plugins: { Dialog, Notify } })
  .mount('#app')
