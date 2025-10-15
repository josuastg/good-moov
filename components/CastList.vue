<template>
  <section v-if="casts.length" class="relative">

    <button v-if="canScrollLeft" @click="scrollLeft"
      class="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10">
      <LucideChevronLeft class="w-5 h-5" />
    </button>

    <button v-if="canScrollRight" @click="scrollRight"
      class="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10">
      <LucideChevronRight class="w-5 h-5" />
    </button>

    <!-- List Cast -->
    <div ref="scrollContainer" class="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-3" @scroll="checkScroll">
      <CastCard v-for="cast in casts.slice(0, limit)" :key="cast.id" :name="cast.name"
        :profilePath="cast.profile_path" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  casts: any[]
  limit?: number
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const checkScroll = () => {
  if (!scrollContainer.value) return
  const el = scrollContainer.value
  canScrollLeft.value = el.scrollLeft > 0
  canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 10
}

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
  setTimeout(checkScroll, 400)
}

const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
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
</style>
