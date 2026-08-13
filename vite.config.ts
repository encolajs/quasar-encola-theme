import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    // dev-only: floating Vue DevTools panel in the browser (no extension needed)
    vueDevTools(),
    vue({ template: { transformAssetUrls } }),
    quasar({
      // absolute path: the plugin @import-s this file into every Quasar
      // style module, where a project-relative path would not resolve
      sassVariables: fileURLToPath(
        new URL('./src/encola/quasar-variables.scss', import.meta.url),
      ),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
