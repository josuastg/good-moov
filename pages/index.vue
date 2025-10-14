<template>
  <section class="px-4 md:px-12 py-6 text-white">

    <!-- LOADING -->
    <div v-if="pending || loading" class="space-y-6">
      <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        <div v-for="n in 6" :key="n" class="w-28 h-10 bg-gray-700 rounded-full animate-pulse"></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="n in 8" :key="n" class="bg-gray-800 rounded-lg p-2 animate-pulse">
          <div class="h-48 bg-gray-700 rounded mb-3"></div>
          <div class="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="text-red-400  justify-center text-center flex-col items-center flex py-8 gap-y-4">
      {{ error }}
      <button class="ml-2 px-3 py-1 text-white max-w-max bg-purple-600 text-sm rounded hover:bg-purple-700"
        @click="loadMovies">
        Retry
      </button>
    </div>

    <!-- SUCCESS -->
    <div v-else>
      <!-- CATEGORY -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold mb-3">Categories</h2>
        <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          <CategoryCard v-for="category in genres" :key="category.id" :name="category.name"
            @click="router.push(`/category/${category.id}`)" />
        </div>
      </section>

      <!-- POPULAR -->
      <!-- <section class="mb-10">
        <h2 class="text-lg font-semibold mb-3">Popular </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MovieCard v-for="movie in popular" :key="movie.id" :movie="movie" />
        </div>
      </section> -->

      <section>
        <!-- Popular -->
        <MovieList title="Popular" :movies="popular" />

        <!-- Latest -->
        <MovieList title="Latest" :movies="latest" />
      </section>

      <!-- LATEST -->
      <!-- <section>
        <h2 class="text-lg font-semibold mb-3">Latest</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MovieCard v-for="movie in latest" :key="movie.id" :movie="movie" />
        </div>
      </section> -->
    </div>
  </section>
</template>


<script setup>

const router = useRouter()
const { isMobile } = useDevice()
const { genres, popular, latest, loading, error, loadMovies } = useTmdb()

// ✅ SSR Fetch langsung
const { pending } = await useAsyncData('home-movies', async () => {
  await loadMovies()
})


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
