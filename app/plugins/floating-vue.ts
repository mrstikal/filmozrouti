// @ts-ignore
import { defineNuxtPlugin } from '#app'
import FloatingVue from 'floating-vue'
import { Tooltip } from 'floating-vue'

const config = {
  shift: true,
  boundary: 'viewport',
  overflowPadding: 30,
}

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.use(FloatingVue, config)

  nuxtApp.vueApp.component('VTooltip', Tooltip)
})