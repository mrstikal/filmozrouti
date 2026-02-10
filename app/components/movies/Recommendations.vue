<script setup lang="ts">
import type { Movie } from '~/types'
import formatVotes from '~/utils/formatVotes'

defineProps<{
  recommended: Movie[]
}>()

</script>

<template>
  <div class="p-8 pt-6 mt-4 bg-gray-950">
    <h1 class="text-3xl font-bold mb-6 text-center">Mohlo by ti taky chutnat</h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-6 text-sm">
      <NuxtLink
          v-for="movie in recommended"
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
        <div class="movie-description-recommendation">
          <h3 class="text-sm text-center">{{ movie.title }}</h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>