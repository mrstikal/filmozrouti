// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/storybook',
    '@nuxtjs/stylelint-module',
    'nuxt-icons'
  ]
})