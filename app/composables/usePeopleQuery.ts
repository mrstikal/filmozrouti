import { computed, ref, watch } from 'vue'

export function usePeopleQuery(options?: { debounceMs?: number }) {
  const debounceMs = options?.debounceMs ?? 500

  const currentPage = ref<number>(1)

  const searchInput = ref<string>('')
  const searchQuery = ref<string>('')

  let t: ReturnType<typeof setTimeout> | null = null
  watch(searchInput, (v) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      searchQuery.value = String(v ?? '').trim()
      currentPage.value = 1
    }, debounceMs)
  })

  const setPage = (page: number) => {
    currentPage.value = page
  }

  const clearSearch = () => {
    searchInput.value = ''
    searchQuery.value = ''
    currentPage.value = 1
  }

  return {
    currentPage,
    searchInput,
    searchQuery: computed(() => searchQuery.value),
    setPage,
    clearSearch,
  }
}