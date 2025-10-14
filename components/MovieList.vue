<template>
  <section class="relative">
    <h2 class="text-lg font-semibold mb-3">{{ title }}</h2>

    <!-- Tombol Scroll Kiri -->
    <button
      class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 
             bg-black/50 hover:bg-black/70 text-white p-2 rounded-full 
             shadow-lg backdrop-blur-sm transition cursor-pointer"
      @click="scroll('left')"
    >
      <LucideChevronLeft class="w-6 h-6 text-white" />
    </button>

    <!-- Scrollable Movies -->
    <div
      ref="scrollContainer"
      class="flex gap-3 overflow-x-auto pb-3 no-scrollbar scroll-smooth"
    >
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="flex-shrink-0 w-40 sm:w-48"
      >
        <MovieCard :movie="movie" />
      </div>
    </div>

    <!-- Tombol Scroll Kanan -->
    <button
      class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 
             bg-black/50 hover:bg-black/70 text-white p-2 rounded-full 
             shadow-lg backdrop-blur-sm transition cursor-pointer"
      @click="scroll('right')"
    >
      <LucideChevronRight class="w-6 h-6 text-white" />
    </button>
  </section>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  movies: any[]
}>()

// reference ke container scroll
const scrollContainer = ref<HTMLDivElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (!scrollContainer.value) return
  const scrollAmount = 300 // pixel
  if (direction === 'left') {
    scrollContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    scrollContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
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
.scroll-smooth {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
