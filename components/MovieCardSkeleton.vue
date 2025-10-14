<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    <div v-for="n in 8" :key="n" class="bg-gray-800 rounded-lg p-2 animate-pulse">
      <div class="h-48 bg-gray-700 rounded mb-3"></div>
      <div class="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div class="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
</template>
