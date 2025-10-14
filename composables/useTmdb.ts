// composables/useTmdb.ts
export const useTmdb = () => {
  const genres = useState<any[]>('tmdb_genres', () => [])
  const popular = useState<any[]>('tmdb_popular', () => [])
  const latest = useState<any[]>('tmdb_latest', () => [])
  const loading = useState<boolean>('tmdb_loading', () => false)
  const error = useState<string | null>('tmdb_error', () => null)

  // Proxy ke server/api/tmdb
  const fetchTmdb = async (path: string, params = {}) => {
    try {
      return await $fetch(`/api/tmdb/${path}`, { params })
    } catch (err: any) {
      console.error(`TMDB Fetch Error (${path}):`, err)
      throw new Error(err?.message || 'Failed to fetch TMDB data')
    }
  }

  // SSR-compatible data loading
  const loadMovies = async () => {
    if (genres.value.length && popular.value.length && latest.value.length) return

    loading.value = true
    error.value = null

    try {
      const [genresRes, popularRes, latestRes] = await Promise.all([
        fetchTmdb('genre/movie/list', { language: 'en-US' }),
        fetchTmdb('movie/popular', { language: 'en-US', page: 1 }),
        fetchTmdb('movie/now_playing', { language: 'en-US', page: 1 }),
      ])

      genres.value = genresRes?.genres ?? []
      popular.value = popularRes?.results ?? []
      latest.value = latestRes?.results ?? []
      // error.value = 'Failed to load movies';
    } catch (err: any) {
      error.value = err.message || 'Failed to load movies'
    } finally {
      loading.value = false
    }
  }

  return { genres, popular, latest, loading, error, loadMovies }
}
