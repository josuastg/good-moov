import * as LucideIcons from 'lucide-vue-next'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Daftarkan semua ikon secara global
  Object.entries(LucideIcons).forEach(([name, component]) => {
    nuxtApp.vueApp.component(name, component)
  })
})
