<script setup lang="ts">
import SearchBar from '~/components/movies/SearchBar.vue'
import Pagination from '~/components/movies/Pagination.vue'
import PeopleGrid from '~/components/people/PeopleGrid.vue'
import { usePeopleQuery } from '~/composables/usePeopleQuery'
import { usePeopleData } from '~/composables/usePeopleData'

const { currentPage, searchInput, searchQuery, setPage, clearSearch } = usePeopleQuery({ debounceMs: 500 })

const { data, pending } = usePeopleData({
  searchQuery,
  currentPage,
})
</script>

<template>
  <div class="px-8 pt-8">
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <h1 class="text-3xl font-bold">
        {{ searchQuery ? `Hledám herce: ${searchQuery}` : 'Herci' }}
      </h1>

      <SearchBar
          :model-value="String(searchInput)"
          :show-clear="Boolean(searchQuery)"
          @update:model-value="(v) => (searchInput = v)"
          @clear="clearSearch"
      />
    </div>

    <div v-if="pending" class="text-center py-20">Hledám herce...</div>
    <div v-else-if="!data || data.results.length === 0" class="text-center py-20 italic">
      Nic jsem nenašel!
    </div>
    <div v-else>
      <PeopleGrid :people="data.results" />

      <Pagination
          :page="currentPage"
          :total-pages="data.total_pages"
          @update:page="setPage"
      />
    </div>
  </div>
</template>