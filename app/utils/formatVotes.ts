export default function formatVotes(voteAverage: number, voteCount?: number): string {
  const avg = Number.isFinite(voteAverage) ? voteAverage.toFixed(1) : '0.0'
  const count = typeof voteCount === 'number' ? voteCount : 0

  const formattedCount = new Intl.NumberFormat('cs-CZ').format(count)

  const label = count === 1 ? 'hlas' : count >= 2 && count <= 4 ? 'hlasy' : 'hlasů'
  return `${avg} (${formattedCount} ${label})`
}