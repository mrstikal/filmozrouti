import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { type } = getQuery(event)

  const genreType = type === 'tv' ? 'tv' : 'movie'

  const data: any = await $fetch(`https://api.themoviedb.org/3/genre/${genreType}/list`, {
    query: {
      language: 'cs-CZ',
    },
    headers: {
      Authorization: `Bearer ${config.tmdbApiToken}`,
      accept: 'application/json',
    },
  })

  return data
})