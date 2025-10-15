<template>
  <section>
    <div v-if="!error" class="flex items-center justify-between mb-4">
      <!-- Tombol Back -->
      <button @click="goToHome"
        class="flex cursor-pointer items-center gap-1 text-white hover:text-gray-300 transition">
        <LucideChevronLeft class="w-8 h-8" />
      </button>

      <!-- Judul Kategori -->
      <SectionTitle class="text-2xl">
        {{ categoryName }}
      </SectionTitle>
    </div>

    <!-- LOADING -->
    <div v-if="loading">
      <MovieCardSkeleton />
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="text-red-400 justify-center text-center flex-col items-center flex py-8 gap-y-4">
      {{ error }}
      <button
        class=" cursor-pointer ml-2 px-3 py-1 text-white max-w-max bg-purple-600 text-sm rounded hover:bg-purple-700"
        @click="loadCategoryMovies(categoryId)">
        Retry
      </button>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="!loading && !categoryMovies.length"
      class="flex flex-col items-center justify-center text-center py-16 text-white">
      <LucideFilm class="w-12 h-12 mb-3 opacity-60 text-white" />
      <p class="text-lg  font-medium">No movies found in this category</p>
      <p class="text-sm text-white mt-1">Try selecting another category or refresh the page.</p>
    </div>

    <!-- MOVIE GRID -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <MovieCard v-for="movie in categoryMovies" :key="movie.id" :movie="movie" />
    </div>

    <!-- LOAD MORE -->
    <div v-if="categoryHasMore && !loading && !error && categoryMovies.length > 0" class="text-center mt-6">
      <button @click="loadMore" class="bg-[#543B85] hover:bg-purple-700 cursor-pointer text-white px-4 py-2 rounded-lg">
        Load More
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const categoryId = Number(route.params.id)
const router = useRouter()

const { categoryMovies, loading, categoryHasMore, categoryPage, loadCategoryMovies, error, categoryName } = useTmdb()

await loadCategoryMovies(categoryId)

const loadMore = async () => {
  await loadCategoryMovies(categoryId, categoryPage.value + 1)
}

const goToHome = () => {
  router.push('/');
}
</script>
