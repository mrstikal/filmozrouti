import type { Movie, Tv } from '~/types'

type HasGenres = Pick<Movie, 'genres'> | Pick<Tv, 'genres'>

export default function formatGenres(item: HasGenres): string {
  return item.genres.map((genre) => genre.name).join('/')
}