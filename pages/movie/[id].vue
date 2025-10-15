<template>
  <section class="pb-10">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-4">
      <button @click="goBack" class="text-white cursor-pointer">
        <LucideChevronLeft size="24" />
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="space-y-6">
      <!-- ✅ Skeleton Loading -->
      <div class="flex flex-col gap-6 animate-pulse">
        <!-- Poster & Info Skeleton -->
        <div class="flex flex-row gap-6">
          <div class="w-48 sm:w-64 h-72 skeleton"></div>
          <div class="flex flex-col flex-1 gap-3">
            <div class="w-24 h-4 skeleton"></div>
            <div class="w-2/3 h-6 skeleton"></div>
            <div class="w-1/3 h-4 skeleton"></div>
            <div class="w-full h-20 skeleton mt-3"></div>
          </div>
        </div>

        <!-- Cast Skeleton -->
        <div class="mt-8">
          <div class="w-28 h-5 skeleton mb-3"></div>
          <div class="flex gap-3 overflow-x-auto pb-3">
            <div v-for="i in 8" :key="i" class="w-24 h-28 flex flex-col items-center text-center flex-shrink-0">
              <div class="w-20 h-20 rounded-full skeleton mb-2"></div>
              <div class="w-16 h-3 skeleton"></div>
            </div>
          </div>
        </div>

        <!-- Recommended Skeleton -->
        <div class="mt-8">
          <div class="w-32 h-5 skeleton mb-3"></div>
          <div class="flex gap-3 overflow-x-auto pb-3">
            <div v-for="i in 5" :key="i" class="w-36 h-52 rounded-lg skeleton flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ERROR -->
    <div v-else-if="error"
      class="text-red-400 justify-center text-center flex-col items-center flex py-8 gap-y-4 animate-fadeIn">
      <p class="text-sm">{{ error }}</p>
      <button
        class="ml-2 px-4 py-2 text-white max-w-max bg-purple-600 text-sm rounded hover:bg-purple-700 active:scale-95 transition"
        @click="loadMovieDetail(movieId)">
        Retry
      </button>
    </div>

    <!-- Movie detail -->

    <div v-else>
      <div v-if="movieDetail">
        <div class="flex flex-row gap-6">
          <img :src="`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`" :alt="movieDetail.title"
            class="w-48 sm:w-64 rounded-lg object-contain" />
          <div class="flex-col flex">
            <p class="text-sm text-white">{{ movieDetail.release_date?.split('-')[0] }}</p>
            <h1 class="text-2xl text-white font-medium">
              {{ movieDetail?.title || 'Loading...' }}
            </h1>
            <p class="text-sm text-white font-normal">
              {{movieDetail.genres.map(g => g.name).join(', ')}}
            </p>
            <div class="invisible lg:visible mt-4">
              <SectionTitle class="text-lg">Overview</SectionTitle>
              <p class="text-sm text-left text-white leading-relaxed font-normal">
                {{ movieDetail.overview || 'No overview available.' }}
              </p>
            </div>

          </div>
        </div>
      </div>
      <div class="visible lg:invisible lg:hidden mt-5 lg:mt-0">
        <SectionTitle class="text-lg">Overview</SectionTitle>
        <p class=" text-sm text-white leading-relaxed font-normal text-left">
          {{ movieDetail.overview || 'No overview available.' }}
        </p>
      </div>

      <!-- Cast -->
      <section class="mt-8 lg:mt-5">
        <div v-if="movieCast.length">
          <SectionTitle class="text-lg">Cast</SectionTitle>
          <CastList :casts="movieCast" limit="15" />
        </div>
        <!-- Jika tidak ada cast -->
        <p v-else class="text-md text-white font-semibold italic">No cast information available.</p>

      </section>

      <!-- Recommended -->
      <section class="mt-8">
        <MovieList v-if="recommended.length" title="Recommended" :movies="recommended" />
        <!-- Jika tidak ada cast -->
        <p v-else class="text-md text-white font-semibold italic">No recommended information available.</p>

      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const movieId = Number(route.params.id)

const { movieDetail, movieCast, recommended, loading, error, loadMovieDetail } = useTmdb()

// SSR-friendly fetch
await useAsyncData(`movie-detail-${movieId}`, async () => {
  await loadMovieDetail(movieId)
})

const goBack = () => router.back();
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
