// server/api/tmdb/[...path].ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.public?.tmdbApiKey || process.env.NUXT_TMDB_API_KEY
  const query = getQuery(event)

  // Pastikan path selalu string
  let path = event.context.params?.path
  if (Array.isArray(path)) {
    path = path.join('/')
  }

  // Tangani jika path tidak ditemukan
  console.log('path', path)
  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path parameter is missing',
    })
  }

  // Bangun URL TMDB API
  const url = new URL(`https://api.themoviedb.org/3/${path}`)
  url.searchParams.set('api_key', apiKey)

  // Tambahkan query tambahan (language, page, dsb)
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, String(value))
  }

  try {
    const data = await $fetch(url.toString())
    return data
  } catch (err: any) {
    console.error('TMDB Proxy Error:', err)
    throw createError({
      statusCode: err?.statusCode || 500,
      statusMessage: 'Failed to fetch data from TMDB',
    })
  }
})
