<template>
  <section class="relative">
    <SectionTitle class="text-lg mb-3">{{ title }}</SectionTitle>

    <button v-if="canScrollLeft" @click="scroll('left')" class="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10
             bg-black/50 hover:bg-black/70 text-white p-2 rounded-full
             shadow-lg backdrop-blur-sm transition cursor-pointer">
      <LucideChevronLeft class="w-6 h-6 text-white" />
    </button>

    <div ref="scrollContainer" class="flex gap-3 overflow-x-auto pb-3 no-scrollbar scroll-smooth" @scroll="checkScroll">
      <div v-for="movie in movies" :key="movie.id" class="flex-shrink-0 w-40 sm:w-48">
        <MovieCard :movie="movie" />
      </div>
    </div>

    <button v-if="canScrollRight" @click="scroll('right')" class="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10
             bg-black/50 hover:bg-black/70 text-white p-2 rounded-full
             shadow-lg backdrop-blur-sm transition cursor-pointer">
      <LucideChevronRight class="w-6 h-6 text-white" />
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  movies: any[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const checkScroll = () => {
  const el = scrollContainer.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 10
}

const scroll = (direction: 'left' | 'right') => {
  const el = scrollContainer.value
  if (!el) return
  const scrollAmount = 300
  el.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth',
  })
  setTimeout(checkScroll, 400)
}

onMounted(() => {
  checkScroll()
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

.scroll-smooth {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
