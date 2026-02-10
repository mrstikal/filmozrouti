<script setup lang="ts">
defineProps<{
  people: Array<{
    id: number
    name: string
    profile_path: string | null
    known_for_department?: string
  }>
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    <NuxtLink
        v-for="p in people"
        :key="p.id"
        :to="`/people/${p.id}`"
        class="movie-card"
    >
      <div class="aspect-2/3 rounded-lg bg-gray-800 mb-2">
        <img
            v-if="p.profile_path"
            :alt="p.name"
            :title="p.name"
            :src="`https://image.tmdb.org/t/p/w500${p.profile_path}`"
            class="w-full h-full object-cover rounded-lg"
        />
        <div
            v-else
            class="flex items-center justify-center h-full text-gray-400 bg-gray-600 rounded-lg"
        >
          Bez fotky
        </div>
      </div>

      <div class="movie-description">
        <h3 class="text-sm md:text-base font-semibold">{{ p.name }}</h3>
        <p class="text-xs md:text-sm text-gray-400">
          {{ p.known_for_department || '—' }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>