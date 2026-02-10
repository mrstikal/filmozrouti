import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { q, page } = getQuery(event)

  return await $fetch(`https://api.themoviedb.org/3/search/person`, {
    query: {
      language: 'cs-CZ',
      page: page || 1,
      query: q || '',
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${config.tmdbApiToken}`,
      accept: 'application/json',
    },
  })
})