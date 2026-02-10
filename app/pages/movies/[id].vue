<script setup lang="ts">
import { computed, ref } from 'vue'
import Recommendations from "~/components/movies/Recommendations.vue";
import type { MovieDetails } from '~/types'
import { useRoute, useFetch } from '#app'
import formatGenres from '~/utils/formatGenres'
import formatVotes from "~/utils/formatVotes.ts";
import formatReleaseDate from '~/utils/formatReleaseDate'

const route = useRoute()
const movieId = route.params.id

const {data: movie, pending, error} = await useFetch<MovieDetails>(`/api/movie/${movieId}`)

const getFullImageUrl = (path: string) => path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/1280x720'

const formatActors = () => {
  const cast = movie.value?.credits?.cast ?? []
  return cast.map((actor) => actor.name).slice(0, 12).join(', ')
}

const recommendations = computed(() => movie.value?.recommendations?.results?.slice(0, 10) ?? [])

const joinNames = (items?: Array<{ name: string }>) =>
    (items ?? []).map((x) => x.name).filter(Boolean).slice(0, 6).join(', ') || '—'

const joinCountryCodes = (items?: Array<{ iso_3166_1: string }>) =>
    (items ?? []).map((x) => x.iso_3166_1).filter(Boolean).join(', ') || '—'

const formatMoney = (value?: number) => {
  if (!value || value <= 0) return '—'
  return new Intl.NumberFormat('cs-CZ', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value)
}

</script>

<template>
  <div>
    <div v-if="pending">Načítám detail filmu...</div>
    <div v-else-if="error">Ups! Film se nepodařilo najít.</div>

    <div v-else-if="movie" class="relative">
      <div class="h-100 w-full relative">
        <img
            :src="getFullImageUrl(movie.backdrop_path)"
            :alt="movie.title"
            class="w-full h-full object-cover brightness-55 contrast-120"
        />
        <div class="absolute bottom-10 left-0 p-8 text-white">
          <h1 class="text-4xl font-bold">{{ movie.title }}</h1>
          <p class="text-lg opacity-80">{{ movie.tagline }}</p>
        </div>
      </div>

      <div class="max-w-4xl mx-auto p-8 grid md:grid-cols-3 gap-8">
        <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="rounded-xl shadow-2xl -mt-20 relative z-10"
        />
        <div class="md:col-span-2">
          <p class="text-sm font-medium text-lime-400 mb-4">{{ formatGenres(movie) }}</p>
          <p class="text-sm text-gray-300 pb-5 font-light"><span class="font-medium">Hrají:</span> {{ formatActors() }}
          </p>
          <div class="h-px w-10 bg-gray-700"></div>
          <p class="text-gray-200 text-lg font-light pt-4 pb-6">{{ movie.overview }}</p>

          <div class="mt-6 flex flex-wrap items-center gap-4">
            <div class="bg-gray-700 px-3 py-2 rounded font-bold">
              <p class="text-xs md:text-sm text-gray-400 flex items-center leading-none">
                <Icon name="material-symbols:kid-star-sharp" class="block w-4 h-4 mr-1.5 text-yellow-400"/>
                <span class="block pt-px">{{ formatVotes(movie.vote_average, movie.vote_count) }}</span>
              </p>
            </div>

            <div class="text-gray-500">
              {{ formatReleaseDate(movie.release_date) }} • {{ movie.runtime }} min
            </div>

            <div class="mt-8 rounded-lg bg-gray-900/60 border border-gray-800 p-4">
              <h2 class="text-lg font-semibold text-gray-100 mb-3">Technické info</h2>

              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt class="text-gray-500">Originální název</dt>
                  <dd class="text-gray-200">{{ movie.original_title || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Jazyk (originál)</dt>
                  <dd class="text-gray-200">{{ movie.original_language || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Status</dt>
                  <dd class="text-gray-200">{{ movie.status || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Země produkce</dt>
                  <dd class="text-gray-200">{{ joinCountryCodes(movie.production_countries) }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Produkce</dt>
                  <dd class="text-gray-200">{{ joinNames(movie.production_companies) }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Rozpočet / Tržby</dt>
                  <dd class="text-gray-200">
                    {{ formatMoney(movie.budget) }} / {{ formatMoney(movie.revenue) }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div v-if="recommendations.length > 0">
        <Recommendations :recommended="recommendations"/>
      </div>
        </div>
  </div>
</template>