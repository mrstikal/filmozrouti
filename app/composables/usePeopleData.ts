import { computed, type Ref } from 'vue'
import { useFetch } from '#imports'

type MaybeRef<T> = Ref<T> | { value: T }

interface PeopleItem {
  id: number
  name: string
  profile_path: string | null
  known_for_department?: string
  popularity?: number
}

interface PeopleResponse {
  results: PeopleItem[]
  page: number
  total_pages: number
  total_results: number
}

export function usePeopleData(params: {
  searchQuery: MaybeRef<string>
  currentPage: MaybeRef<number>
}) {
  const apiEndpoint = computed(() =>
    params.searchQuery.value ? '/api/people/search' : '/api/people',
  )

  const { data, pending, error } = useFetch<PeopleResponse>(apiEndpoint, {
    query: {
      q: computed(() => params.searchQuery.value || undefined),
      page: computed(() => params.currentPage.value),
    },
    watch: [apiEndpoint, () => params.searchQuery.value, () => params.currentPage.value],
  })

  return { data, pending, error }
}