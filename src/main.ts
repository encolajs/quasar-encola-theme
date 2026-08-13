import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import { router } from './router'
import { encola } from './encola'

createApp(App)
  .use(router)
  .use(Quasar, encola())
  .mount('#app')
