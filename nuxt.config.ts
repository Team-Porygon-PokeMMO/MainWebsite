// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'],
  ui: {
    safelistColors: ['orange'],
    global: true,
  },
  colorMode: {
    preference: 'system',
    classSuffix: ''
  }
})
