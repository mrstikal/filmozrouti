import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { q, page } = getQuery(event)

  if (!q) return { results: [], total_pages: 0 }

  return await $fetch(`https://api.themoviedb.org/3/search/movie`, {
    query: {
      language: 'cs-CZ',
      query: q,
      page: page || 1,
      include_adult: false
    },
    headers: {
      Authorization: `Bearer ${config.tmdbApiToken}`,
      accept: 'application/json'
    }
  })
})