import { defineEventHandler, getQuery } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { page, genreId, sort } = getQuery(event)

  return await $fetch(`https://api.themoviedb.org/3/discover/tv`, {
    query: {
      language: 'cs-CZ',
      page: page || 1,
      sort_by: sort || 'popularity.desc',
      with_genres: genreId,
    },
    headers: {
      Authorization: `Bearer ${config.tmdbApiToken}`,
      accept: 'application/json',
    },
  })
})