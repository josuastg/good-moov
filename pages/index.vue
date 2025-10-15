<template>
  <section class="px-4 md:px-12 py-6 text-white">

    <!-- LOADING -->
    <div v-if="pending || loading" class="space-y-6">
      <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        <div v-for="n in 6" :key="n" class="w-28 h-10 bg-gray-700 rounded-full animate-pulse"></div>
      </div>
      <MovieCardSkeleton />
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="text-red-400  justify-center text-center flex-col items-center flex py-8 gap-y-4">
      {{ error }}
      <button class="ml-2 px-3 py-1 text-white max-w-max bg-purple-600 text-sm rounded hover:bg-purple-700"
        @click="loadMovies">
        Retry
      </button>
    </div>


    <!-- EMPTY STATE -->
    <div v-else-if="!loading && (!popular.length || !latest.length)"
      class="flex flex-col items-center justify-center text-center py-16 text-white">
      <LucideFilm class="w-12 h-12 mb-3 opacity-60 text-white" />
      <p class="text-lg  font-medium">No movies found in this pages</p>
    </div>

    <!-- SUCCESS -->
    <div v-else>
      <!-- CATEGORY -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold mb-3">Categories</h2>
        <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          <CategoryCard v-for="category in genres" :key="category.id" :name="category.name"
            @click="goToCategory(category)" />
        </div>
      </section>

      <section>
        <!-- Popular -->
        <MovieList title="Popular" :movies="popular" />
        <!-- Latest -->
        <MovieList title="Latest" :movies="latest" />
      </section>
    </div>
  </section>
</template>


<script setup>

const router = useRouter()
const { genres, popular, latest, loading, error, loadMovies, categoryName } = useTmdb()

// ✅ SSR Fetch langsung
const { pending } = await useAsyncData('home-movies', async () => {
  await loadMovies()
})

const goToCategory = (category) => {
  router.push(`/category/${category.id}`)
  categoryName.value = category.name
}

const goToDetail = (movie) => {
  router.push({
    path: `/movie/${movie.id}`,
  })
}


</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
