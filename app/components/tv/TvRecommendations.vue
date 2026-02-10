<script setup lang="ts">
defineProps<{
  recommended: Array<{
    id: number
    name: string
    poster_path: string | null
  }>
}>()
</script>

<template>
  <div class="p-8 pt-6 mt-4 bg-gray-950">
    <h1 class="text-3xl font-bold mb-6 text-center">Mohlo by ti taky chutnat</h1>

    <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-6 text-sm"
    >
      <NuxtLink
          v-for="show in recommended"
          :key="show.id"
          :to="`/tv/${show.id}`"
          class="movie-card"
      >
        <div class="aspect-2/3 rounded-lg bg-gray-800 mb-2">
          <img
              v-if="show.poster_path"
              :alt="show.name"
              :title="show.name"
              :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
              class="w-full h-full object-cover rounded-lg"
          />
          <div
              v-else
              class="flex items-center justify-center h-full text-gray-400 bg-gray-600 rounded-lg"
          >
            Bez plakátu
          </div>
        </div>
        <div class="movie-description-recommendation">
          <h3 class="text-sm text-center">{{ show.name }}</h3>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>