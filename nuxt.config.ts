import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/device'],
  vite: {
    plugins: [
      tailwindcss(),
      
    ],
  },
  plugins: [
    '~/plugins/lucide.client.ts',
  ],
  runtimeConfig: {
    TMDB_API_KEY: process.env.NUXT_TMDB_API_KEY, // hanya di server
    public: {
      // kamu bisa tambahkan public base url jika ingin pakai di fetch client
      tmdbBaseUrl: 'https://api.themoviedb.org/3'
    }
  }
})