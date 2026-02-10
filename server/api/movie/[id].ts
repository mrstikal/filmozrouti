import { defineEventHandler, getRouterParam, createError } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  try {
    const data = await $fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=cs-CZ&append_to_response=credits,recommendations,similar,videos`,
      {
        headers: {
          Authorization: `Bearer ${config.tmdbApiToken}`,
          accept: 'application/json',
        },
      },
    )
    return data
  } catch (e) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Film nenalezen',
    })
  }
})