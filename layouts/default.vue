<template>
  <div class="min-h-screen flex flex-col bg-[#18191f]">
    <Navbar />
    <main class="flex-1 px-4 sm:px-8 py-6">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
</script>
