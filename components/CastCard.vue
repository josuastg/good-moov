<template>
  <div class="flex flex-col items-center text-center w-24 sm:w-28 flex-shrink-0">
    <img
      :src="profilePath ? `https://image.tmdb.org/t/p/w185${profilePath}` : 'https://placehold.jp/30/dddddd/ffffff/120x180.png?text=no image'"
      alt="Cast Photo" class="w-full h-auto object-cover rounded-lg" />
    <p class="text-xs text-white truncate w-full mt-2 font-normal">
      {{ name || 'Unknown' }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  profilePath: string | null
}>()
</script>
