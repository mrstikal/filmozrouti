<script setup lang="ts">
import formatReleaseDate from "~/utils/formatReleaseDate";
import formatVotes from '~/utils/formatVotes'
import truncateOverview from '~/utils/truncateOverview'

defineProps<{
  movies: Array<{
    id: number
    title: string
    poster_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    overview: string
  }>
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    <NuxtLink
        v-for="movie in movies"
        :key="movie.id"
        :to="`/movies/${movie.id}`"
        class="movie-card"
    >
      <div class="aspect-2/3 rounded-lg bg-gray-800 mb-2">
        <img
            v-if="movie.poster_path"
            :alt="movie.title"
            :title="movie.title"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="w-full h-full object-cover rounded-lg"
        />
        <div v-else class="flex items-center justify-center h-full text-gray-400 bg-gray-600 rounded-lg">
          Bez plakátu
        </div>
      </div>
      <ClientOnly>
        <div v-tooltip="{
                  content: truncateOverview(movie.overview) || 'Popis bude brzy doplněn',
                  placement: 'top',
                  popperClass: 'movie-poster-tooltip',
                }"
             class="movie-description">
          <h3 class="text-sm md:text-base font-semibold">{{ movie.title }}</h3>
          <p class="text-xs md:text-sm text-gray-400">{{ formatReleaseDate(movie.release_date) }}</p>
          <p class="text-xs md:text-sm text-gray-500 pt-1 flex items-center leading-none">
            <Icon name="material-symbols:kid-star-sharp" class="block w-4 h-4 mr-1.5 text-yellow-400"/>
            <span class="block pt-px">{{ formatVotes(movie.vote_average, movie.vote_count) }}</span>
          </p>
        </div>
      </ClientOnly>
    </NuxtLink>
  </div>
</template>