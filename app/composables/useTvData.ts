import { computed, type Ref } from 'vue'
import { useFetch } from '#imports'

type MaybeRef<T> = Ref<T> | { value: T }

interface TvItem {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  first_air_date: string
  genre_ids: number[]
}

interface TvResponse {
  results: TvItem[]
  page: number
  total_pages: number
  total_results: number
}

export function useTvData(params: {
  searchQuery: MaybeRef<string>
  currentPage: MaybeRef<number>
  selectedGenreId: MaybeRef<string | null>
  currentSort: MaybeRef<string>
}) {
  const apiEndpoint = computed(() =>
    params.searchQuery.value ? '/api/tv/search' : '/api/tv',
  )

  const { data, pending, error } = useFetch<TvResponse>(apiEndpoint, {
    query: {
      q: computed(() => params.searchQuery.value || undefined),
      page: computed(() => params.currentPage.value),
      genreId: computed(() => params.selectedGenreId.value || undefined),
      sort: computed(() => params.currentSort.value),
    },
    watch: [
      apiEndpoint,
      () => params.searchQuery.value,
      () => params.currentPage.value,
      () => params.selectedGenreId.value,
      () => params.currentSort.value,
    ],
  })

  return { data, pending, error }
}