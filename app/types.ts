export type Movie = {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  genres: {
    id: number
    name: string
  }[]
}

export type MovieDetails = Movie & {
  backdrop_path: string
  tagline: string
  runtime: number
  credits: {
    cast: Array<{ name: string }>
  }
  recommendations: {
    results: Movie[]
  }
  original_title?: string
  original_language?: string
  status?: string
  budget?: number
  revenue?: number
  production_companies?: Array<{ id: number; name: string }>
  production_countries?: Array<{ iso_3166_1: string; name: string }>
}

export type Tv = {
  id: number
  name: string
  poster_path: string | null
  overview: string
  first_air_date: string
  vote_average: number
  vote_count: number
  genres: {
    id: number
    name: string
  }[]
}

export type TvDetails = Tv & {
  backdrop_path: string | null
  tagline: string
  episode_run_time: number[]
  credits: {
    cast: Array<{ name: string }>
  }
  recommendations: {
    results: Array<{
      id: number
      name: string
      poster_path: string | null
    }>
  }
  original_name?: string
  original_language?: string
  status?: string
  number_of_seasons?: number
  number_of_episodes?: number
  in_production?: boolean
  last_air_date?: string
  next_episode_to_air?: { air_date?: string; name?: string; episode_number?: number; season_number?: number } | null
  networks?: Array<{ id: number; name: string; logo_path?: string | null }>
}

export type Person = {
  id: number
  name: string
  profile_path: string | null
  known_for_department?: string
  popularity?: number
}

export type PersonDetails = Person & {
  biography?: string
  birthday?: string | null
  deathday?: string | null
  place_of_birth?: string | null

  combined_credits?: {
    cast: Array<{
      id: number
      media_type: 'movie' | 'tv'
      poster_path: string | null

      title?: string
      release_date?: string

      name?: string
      first_air_date?: string

      character?: string
      vote_average?: number
      vote_count?: number
    }>
    crew: Array<{
      id: number
      media_type: 'movie' | 'tv'
      poster_path: string | null

      title?: string
      release_date?: string

      name?: string
      first_air_date?: string

      job?: string
      department?: string
      vote_average?: number
      vote_count?: number
    }>
  }
}