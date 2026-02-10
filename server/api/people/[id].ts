import { createError, defineEventHandler, getRouterParam } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  try {
    return await $fetch(
      `https://api.themoviedb.org/3/person/${id}?language=cs-CZ&append_to_response=combined_credits`,
      {
        headers: {
          Authorization: `Bearer ${config.tmdbApiToken}`,
          accept: 'application/json',
        },
      },
    )
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Osoba nenalezena',
    })
  }
})