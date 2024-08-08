// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindTypography from '@tailwindcss/typography'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: 'dark'

  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography]
    }
  },
  app: {
    head: {
      title: 'Team Porygon Site'
    }
  },
})
