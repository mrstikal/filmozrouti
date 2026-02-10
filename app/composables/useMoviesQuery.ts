import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from '#imports'

type QueryValue = string | number | null | undefined

export function useMoviesQuery(options?: { debounceMs?: number }) {
  const debounceMs = options?.debounceMs ?? 500

  const route = useRoute()
  const router = useRouter()

  const searchInput = ref<string>(typeof route.query.q === 'string' ? route.query.q : '')

  watch(
    () => route.query.q,
    (q) => {
      const next = typeof q === 'string' ? q : ''
      if (next !== searchInput.value) searchInput.value = next
    }
  )

  const selectedGenreId = computed<string | null>(() => {
    const g = route.query.genre
    return typeof g === 'string' && g.length ? g : null
  })

  const currentPage = computed<number>(() => {
    const raw = route.query.page
    const n = typeof raw === 'string' ? Number.parseInt(raw, 10) : Number(raw)
    return Number.isFinite(n) && n > 0 ? n : 1
  })

  const searchQuery = computed<string>(() => (typeof route.query.q === 'string' ? route.query.q : ''))

  const currentSort = computed<string>(() => (typeof route.query.sort === 'string' && route.query.sort.length
    ? route.query.sort
    : 'popularity.desc'))

  const pushQuery = async (patch: Record<string, QueryValue>, { resetPage = false } = {}) => {
    const nextQuery: Record<string, any> = { ...route.query }

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value === null || value === '') {
        delete nextQuery[key]
      } else {
        nextQuery[key] = String(value)
      }
    }

    if (resetPage) delete nextQuery.page

    await router.push({ query: nextQuery })
  }

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null
  watch(searchInput, (value) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
      void pushQuery({ q: value }, { resetPage: true })
    }, debounceMs)
  })

  const setGenre = (id: string | null) => pushQuery({ genre: id }, { resetPage: true })
  const setSort = (sortValue: string | null) => pushQuery({ sort: sortValue }, { resetPage: true })
  const setPage = (page: number) => pushQuery({ page })
  const clearSearch = () => pushQuery({ q: '' }, { resetPage: true })

  return {
    selectedGenreId,
    currentPage,
    searchQuery,
    currentSort,
    searchInput,
    setGenre,
    setSort,
    setPage,
    clearSearch,
  }
}