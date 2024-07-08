// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindTypography from '@tailwindcss/typography'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system',
    classSuffix: ''
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  },
})
