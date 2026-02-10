<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TvDetails } from '~/types'
import { useRoute, useFetch } from '#app'
import formatGenres from '~/utils/formatGenres'
import formatVotes from '~/utils/formatVotes'
import formatReleaseDate from '~/utils/formatReleaseDate'
import TvRecommendations from '~/components/tv/TvRecommendations.vue'

const route = useRoute()
const tvId = route.params.id

const {data: show, pending, error} = await useFetch<TvDetails>(`/api/tv/${tvId}`)

const getFullImageUrl = (path: string | null) =>
    path ? `https://image.tmdb.org/t/p/w1280${path}` : 'https://via.placeholder.com/1280x720'

const formatActors = () => {
  const cast = show.value?.credits?.cast ?? []
  return cast.map((actor) => actor.name).slice(0, 12).join(', ')
}

const recommendations = computed(() => show.value?.recommendations?.results?.slice(0, 10) ?? [])
const runtime = show.value?.episode_run_time?.[0]


const joinNames = (items?: Array<{ name: string }>) =>
    (items ?? []).map((x) => x.name).filter(Boolean).slice(0, 6).join(', ') || '—'

const nextEpisodeText = computed(() => {
  const ep = show.value?.next_episode_to_air
  if (!ep) return '—'

  const parts = [
    ep.air_date ? formatReleaseDate(ep.air_date) : null,
    typeof ep.season_number === 'number' && typeof ep.episode_number === 'number'
        ? `S${ep.season_number}E${ep.episode_number}`
        : null,
    ep.name || null,
  ].filter(Boolean)

  return parts.join(' • ') || '—'
})
</script>

<template>
  <div>
    <div v-if="pending">Načítám detail seriálu...</div>
    <div v-else-if="error">Ups! Seriál se nepodařilo najít.</div>

    <div v-else-if="show" class="relative">
      <div class="h-100 w-full relative">
        <img
            :src="getFullImageUrl(show.backdrop_path)"
            :alt="show.name"
            class="w-full h-full object-cover brightness-55 contrast-120"
        />
        <div class="absolute bottom-10 left-0 p-8 text-white">
          <h1 class="text-4xl font-bold">{{ show.name }}</h1>
          <p class="text-lg opacity-80">{{ show.tagline }}</p>
        </div>
      </div>

      <div class="max-w-4xl mx-auto p-8 grid md:grid-cols-3 gap-8">
        <img
            v-if="show.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
            :alt="show.name"
            class="rounded-xl shadow-2xl -mt-20 relative z-10"
        />
        <div
            v-else
            class="rounded-xl bg-gray-800 -mt-20 relative z-10 aspect-2/3 flex items-center justify-center text-gray-400"
        >
          Bez plakátu
        </div>

        <div class="md:col-span-2">
          <p class="text-sm font-medium text-lime-400 mb-4">{{ formatGenres(show) }}</p>
          <p class="text-sm text-gray-300 pb-5 font-light">
            <span class="font-medium">Hrají:</span> {{ formatActors() }}
          </p>
          <div class="h-px w-10 bg-gray-700"></div>
          <p class="text-gray-200 text-lg font-light pt-4 pb-6">{{ show.overview }}</p>

          <div class="mt-6 flex flex-wrap items-center gap-4">
            <div class="bg-gray-700 px-3 py-2 rounded font-bold">
              <p class="text-xs md:text-sm text-gray-400 flex items-center leading-none">
                <Icon
                    name="material-symbols:kid-star-sharp"
                    class="block w-4 h-4 mr-1.5 text-yellow-400"
                />
                <span class="block pt-px">{{ formatVotes(show.vote_average, show.vote_count) }}</span>
              </p>
            </div>

            <div class="text-gray-500">
              {{ formatReleaseDate(show.first_air_date) }}
              <span v-if="runtime"> • {{ runtime }} min</span>
            </div>

            <div class="mt-8 rounded-lg bg-gray-900/60 border border-gray-800 p-4">
              <h2 class="text-lg font-semibold text-gray-100 mb-3">Technické info</h2>

              <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt class="text-gray-500">Originální název</dt>
                  <dd class="text-gray-200">{{ show.original_name || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Jazyk (originál)</dt>
                  <dd class="text-gray-200">{{ show.original_language || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Status</dt>
                  <dd class="text-gray-200">{{ show.status || '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Síť</dt>
                  <dd class="text-gray-200">{{ joinNames(show.networks) }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Sezóny / Epizody</dt>
                  <dd class="text-gray-200">
                    {{ show.number_of_seasons ?? '—' }} / {{ show.number_of_episodes ?? '—' }}
                  </dd>
                </div>
                <div>
                  <dt class="text-gray-500">Další epizoda</dt>
                  <dd class="text-gray-200">{{ nextEpisodeText }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Poslední vysílání</dt>
                  <dd class="text-gray-200">{{ show.last_air_date ? formatReleaseDate(show.last_air_date) : '—' }}</dd>
                </div>
                <div>
                  <dt class="text-gray-500">Ve výrobě</dt>
                  <dd class="text-gray-200">
                    {{ typeof show.in_production === 'boolean' ? (show.in_production ? 'Ano' : 'Ne') : '—' }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div v-if="recommendations.length > 0">
        <TvRecommendations :recommended="recommendations"/>
      </div>

    </div>

  </div>
</template>