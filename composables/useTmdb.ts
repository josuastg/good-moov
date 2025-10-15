// composables/useTmdb.ts
export const useTmdb = () => {
  // movie genres and list popular/latest
  const genres = useState<any[]>('tmdb_genres', () => [])
  const popular = useState<any[]>('tmdb_popular', () => [])
  const latest = useState<any[]>('tmdb_latest', () => [])
  const loading = useState<boolean>('tmdb_loading', () => false)
  const error = useState<string | null>('tmdb_error', () => null)

  // movie category
  const categoryMovies = useState<any[]>('tmdb_category_movies', () => [])
  const categoryPage = useState<number>('tmdb_category_page', () => 1)
  const categoryHasMore = useState<boolean>('tmdb_category_has_more', () => true)
  const categoryName = useState<string>('tmdb_category_name', () => '')

  // movie detail
  const movieDetail = useState<any>('tmdb_movie_detail', () => null)
  const movieCast = useState<any[]>('tmdb_movie_cast', () => [])
  const recommended = useState<any[]>('tmdb_movie_recommended', () => [])

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
    } catch (err: any) {
      error.value = err.message || 'Failed to load movies'
    } finally {
      loading.value = false
    }
  }

  const loadCategoryMovies = async (categoryId: number, page = 1) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetchTmdb('discover/movie', {
        language: 'en-US',
        with_genres: categoryId,
        page,
      })

      const newMovies = res?.results ?? []

      if (page === 1) {
        categoryMovies.value = newMovies
      } else {
        categoryMovies.value = [...categoryMovies.value, ...newMovies]
      }

      categoryPage.value = page
      categoryHasMore.value = page < (res?.total_pages ?? 1)

    } catch (err: any) {
      error.value = err.message || 'Failed to load category movies'
    } finally {
      loading.value = false
    }
  }

  // 🆕 Load movie detail + cast + recommended
  const loadMovieDetail = async (movieId: number) => {
    loading.value = true
    error.value = null
    movieDetail.value = null
    movieCast.value = []
    recommended.value = []
    try {
      const [detailRes, castRes, recommendRes] = await Promise.all([
        fetchTmdb(`movie/${movieId}`, { language: 'en-US' }),
        fetchTmdb(`movie/${movieId}/credits`, { language: 'en-US' }),
        fetchTmdb(`movie/${movieId}/recommendations`, { language: 'en-US', page: 1 }),
      ])
      movieDetail.value = detailRes
      movieCast.value = castRes?.cast ?? []
      recommended.value = recommendRes?.results ?? []
    } catch (err: any) {
      error.value = err.message || 'Failed to load movie detail'
    } finally {
      loading.value = false
    }
  }

  return {
    genres, popular, latest, loading, error, loadMovies,
    categoryMovies, categoryPage, categoryHasMore, loadCategoryMovies,
    movieDetail, movieCast, recommended, loadMovieDetail, categoryName
  }
}
