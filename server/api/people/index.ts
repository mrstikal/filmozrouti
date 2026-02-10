import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { page } = getQuery(event)

  return await $fetch(`https://api.themoviedb.org/3/person/popular`, {
    query: {
      language: 'cs-CZ',
      page: page || 1,
    },
    headers: {
      Authorization: `Bearer ${config.tmdbApiToken}`,
      accept: 'application/json',
    },
  })
})