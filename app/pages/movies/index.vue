<script setup lang="ts">
import { useMoviesQuery } from '~/composables/useMoviesQuery'
import { useMoviesData } from '~/composables/useMoviesData'
import GenreSelect from '~/components/movies/GenreSelect.vue'
import SortBy from "~/components/movies/SortBy.vue";
import SearchBar from '~/components/movies/SearchBar.vue'
import MovieGrid from '~/components/movies/MovieGrid.vue'
import Pagination from '~/components/movies/Pagination.vue'

const {data: genresData} = await useFetch('/api/genres')

const {
  selectedGenreId,
  currentPage,
  searchQuery,
  currentSort,
  searchInput,
  setGenre,
  setSort,
  setPage,
  clearSearch,
} = useMoviesQuery({debounceMs: 500})

const {data, pending} = useMoviesData({
  searchQuery,
  currentPage,
  selectedGenreId,
  currentSort,
})
</script>

<template>
  <div class="px-8 pt-8">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <h1 class="text-3xl font-bold">
        {{ searchQuery ? `Hledám: ${searchQuery}` : 'Co bude dnes k večeři?' }}
      </h1>

      <SearchBar
          v-if="!selectedGenreId"
          :model-value="String(searchInput)"
          :show-clear="Boolean(searchQuery)"
          @update:model-value="(v) => (searchInput = v)"
          @clear="clearSearch"
      />
    </div>

    <div class="flex flex-wrap gap-4 mb-4">
      <div v-if="!searchQuery" class="flex flex-wrap">
        <GenreSelect
            :model-value="selectedGenreId"
            :genres="(genresData?.genres ?? []).map((g: any) => ({ id: String(g.id), name: g.name }))"
            @update:model-value="setGenre"
        />
      </div>

      <div v-if="!searchQuery" class="flex">
        <SortBy
            :model-value="currentSort"
            @update:model-value="setSort"
        />
      </div>
    </div>

    <div v-if="pending" class="text-center py-20">Hledám filmy...</div>
    <div v-else-if="!data || data.results.length === 0" class="text-center py-20 italic">
      Nic jsem nenašel!
    </div>
    <div v-else>
      <MovieGrid :movies="data.results"/>

      <Pagination
          :page="currentPage"
          :total-pages="data.total_pages"
          @update:page="setPage"
      />
    </div>
  </div>
</template>