import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return await $fetch('https://api.themoviedb.org/3/trending/movie/week?language=cs-CZ', {
    headers: {
      Authorization: `Bearer ${config.tmdbApiToken}`,
      accept: 'application/json'
    }
  })
})