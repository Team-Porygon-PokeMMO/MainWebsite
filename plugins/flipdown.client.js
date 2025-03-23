import { defineNuxtPlugin } from '#app'
import Countdown from 'vue3-flip-countdown'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Countdown)
})
