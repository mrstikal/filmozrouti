<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import type { PersonDetails } from '~/types'
import formatReleaseDate from '~/utils/formatReleaseDate'

const route = useRoute()
const personId = route.params.id

const { data: person, pending, error } = await useFetch<PersonDetails>(`/api/people/${personId}`)

const profileUrl = computed(() => {
  const path = person.value?.profile_path
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null
})

const knownForCast = computed(() => {
  const cast = person.value?.combined_credits?.cast ?? []
  const scored = [...cast].sort((a, b) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
  return scored.slice(0, 12)
})

const moviesAsCast = computed(() => knownForCast.value.filter((x) => x.media_type === 'movie'))
const tvAsCast = computed(() => knownForCast.value.filter((x) => x.media_type === 'tv'))

const getTitle = (item: any) => item.title || item.name || '—'
const getDate = (item: any) => item.release_date || item.first_air_date || ''
const getLink = (item: any) => (item.media_type === 'movie' ? `/movies/${item.id}` : `/tv/${item.id}`)
</script>

<template>
  <div class="px-8 pt-8">
    <div v-if="pending">Načítám herce...</div>
    <div v-else-if="error">Ups! Herce se nepodařilo najít.</div>

    <div v-else-if="person" class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8 items-start">
        <div class="md:col-span-1">
          <div class="aspect-2/3 rounded-lg bg-gray-800 overflow-hidden">
            <img
                v-if="profileUrl"
                :src="profileUrl"
                :alt="person.name"
                class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-700">
              Bez fotky
            </div>
          </div>
        </div>

        <div class="md:col-span-2">
          <h1 class="text-4xl font-bold">{{ person.name }}</h1>
          <p class="text-sm text-gray-400 mt-2">
            {{ person.known_for_department || '—' }}
            <span v-if="person.birthday"> • narozen(a): {{ formatReleaseDate(person.birthday) }}</span>
            <span v-if="person.place_of_birth"> • {{ person.place_of_birth }}</span>
          </p>

          <div class="mt-6">
            <h2 class="text-xl font-semibold mb-2">Bio</h2>
            <p class="text-gray-200 leading-relaxed whitespace-pre-line">
              {{ person.biography || 'Bio není k dispozici.' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <h2 class="text-2xl font-semibold mb-4">Známý/á z</h2>

        <div v-if="knownForCast.length === 0" class="text-gray-400 italic">-</div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 text-sm">
          <NuxtLink
              v-for="item in knownForCast"
              :key="`${item.media_type}-${item.id}`"
              :to="getLink(item)"
              class="movie-card"
          >
            <div class="aspect-2/3 rounded-lg bg-gray-800 mb-2">
              <img
                  v-if="item.poster_path"
                  :alt="getTitle(item)"
                  :title="getTitle(item)"
                  :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
                  class="w-full h-full object-cover rounded-lg"
              />
              <div v-else class="flex items-center justify-center h-full text-gray-400 bg-gray-600 rounded-lg">
                Bez plakátu
              </div>
            </div>

            <div class="movie-description-recommendation">
              <h3 class="text-sm text-center">{{ getTitle(item) }}</h3>
              <p class="text-xs text-center text-gray-500">
                {{ getDate(item) ? formatReleaseDate(getDate(item)) : '—' }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-10 grid md:grid-cols-2 gap-10 pb-6">
          <div>
            <h3 class="text-xl font-semibold mb-3">Filmy</h3>

            <div v-if="moviesAsCast.length === 0" class="text-gray-400 italic">—</div>
            <ul v-else class="space-y-2 text-sm">
              <li v-for="m in moviesAsCast.slice(0, 12)" :key="`m-${m.id}`">
                <NuxtLink :to="`/movies/${m.id}`" class="underline text-gray-200 hover:text-lime-400">
                  {{ getTitle(m) }}
                </NuxtLink>
                <span class="text-gray-500"> — {{ m.character || '—' }}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Seriály</h3>

            <div v-if="tvAsCast.length === 0" class="text-gray-400 italic">—</div>
            <ul v-else class="space-y-2 text-sm">
              <li v-for="t in tvAsCast.slice(0, 12)" :key="`t-${t.id}`">
                <NuxtLink :to="`/tv/${t.id}`" class="underline text-gray-200 hover:text-lime-400">
                  {{ getTitle(t) }}
                </NuxtLink>
                <span class="text-gray-500"> — {{ t.character || '—' }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>