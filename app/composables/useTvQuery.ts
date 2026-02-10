import { computed, ref, watch } from 'vue'

export function useTvQuery(options?: { debounceMs?: number }) {
  const debounceMs = options?.debounceMs ?? 500

  const selectedGenreId = ref<string | null>(null)
  const currentPage = ref<number>(1)
  const currentSort = ref<string>('popularity.desc')

  const searchInput = ref<string>('')
  const searchQuery = ref<string>('')

  let t: ReturnType<typeof setTimeout> | null = null
  watch(searchInput, (v) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      searchQuery.value = String(v ?? '').trim()
      currentPage.value = 1
      if (searchQuery.value) selectedGenreId.value = null
    }, debounceMs)
  })

  const setGenre = (id: string | null) => {
    selectedGenreId.value = id
    currentPage.value = 1
  }

  const setSort = (sort: string) => {
    currentSort.value = sort
    currentPage.value = 1
  }

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const clearSearch = () => {
    searchInput.value = ''
    searchQuery.value = ''
    currentPage.value = 1
  }

  return {
    selectedGenreId,
    currentPage,
    searchQuery: computed(() => searchQuery.value),
    currentSort,
    searchInput,

    setGenre,
    setSort,
    setPage,
    clearSearch,
  }
}