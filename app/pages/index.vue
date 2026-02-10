<script setup lang="ts">
import { useFetch} from "#app";
import formatReleaseDate from '~/utils/formatReleaseDate'
import formatVotes from '~/utils/formatVotes'
import truncateOverview from '~/utils/truncateOverview'
import type { Movie } from "~/types.ts";

type TrendingResponse = {
  results: Movie[];
};

const {data, pending, error} = await useFetch<TrendingResponse>('/api/trending');
const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Nejlepší žraso tento týden</h1>

    <div v-if="pending">Načítám...</div>

    <div v-else-if="error">Chyba: {{ error.message }}</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-sm">
      <div v-for="movie in data?.results" :key="movie.id" class="movie-card">
        <NuxtLink :to="`/movies/${movie.id}`">
          <img
              :src="getImageUrl(movie.poster_path)"
              :alt="movie.title"
              class="movie-poster"
          />
          <ClientOnly>
            <div v-tooltip="{
                  content: truncateOverview(movie.overview) || 'Popis bude brzy doplněn',
                  placement: 'top',
                  popperClass: 'movie-poster-tooltip',
                }"
                 class="movie-description">
              <h3 class="text-sm md:text-base font-semibold">{{ movie.title }}</h3>
              <p class="text-xs md:text-sm text-gray-400">Vypuštěno: {{ formatReleaseDate(movie.release_date) }}</p>
              <p class="text-xs md:text-sm text-gray-500 pt-1 flex items-center leading-none">
                <Icon name="material-symbols:kid-star-sharp" class="block w-4 h-4 mr-1.5 text-yellow-400"/>
                <span class="block pt-px">{{ formatVotes(movie.vote_average, movie.vote_count) }}</span>
              </p>
            </div>
          </ClientOnly>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>