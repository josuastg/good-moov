<template>
  <div @click="goDetail(movie)"
    class="relative bg-transparent overflow-hidden rounded-lg cursor-pointer transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
    <!-- Poster -->
    <div class="relative">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
        class="w-full h-auto object-cover rounded-lg" />

      <!-- Rating (pojok kanan bawah gambar) -->
      <div
        class="absolute bottom-2 right-1 bg-black/70 text-xs px-2 py-1 rounded-md text-white font-semibold backdrop-blur-sm"
        :title="`Rating: ${movie.vote_average}`">
        ⭐ {{ movie.vote_average?.toFixed(1) }}
      </div>
    </div>

    <!-- Info -->
    <div class="py-3 px-1" :title="movie.title">
      <p class="text-sm truncate text-white font-medium">
        {{ movie.title }}
      </p>
      <p class="text-xs text-gray-300 mt-1">
        {{ movie.release_date?.split('-')[0] || 'Unknown' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ movie: any }>()

const router = useRouter()

const goDetail = (movie: any) => {
  router.push(`/movie/${movie.id}`);
}

</script>
