import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    tmdbApiToken: process.env.TMDB_API_TOKEN,

    public: {
      apiBaseUrl: 'https://api.themoviedb.org/3'
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: {enabled: false},

  css: [
    '~/assets/css/tailwind.css',
  ],

  vite: {
    plugins: [
      tailwindcss() as any,
    ]
  },

  plugins: [
    {src: '~/plugins/floating-vue.ts', mode: 'client'}
  ],

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    ['@nuxt/fonts', {
      families: [
        { name: 'Roboto', weights: [300, 400, 500, 700], provider: 'google' }
      ]
    }],
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/ui',
  ]
})