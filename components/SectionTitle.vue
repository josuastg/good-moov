<template>
  <div class="relative inline-flex flex-col items-start">
    <!-- Garis Ungu -->
    <span class="absolute -top-1 left-0 w-3/4 h-[3px] bg-purple-500 rounded-full"></span>
    <!-- Teks Judul -->
    <h2 class="font-semibold text-white tracking-wide mt-0.5 mb-1.5">
      <slot />
    </h2>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>