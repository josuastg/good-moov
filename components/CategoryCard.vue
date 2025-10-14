<template>
  <div :title="name"
    class="flex text-ellipsis w-[120px] md:max-w-[160px] flex-shrink-0 overflow-hidden whitespace-nowrap justify-end flex-col rounded-lg bg-[#543B85] hover:bg-[#543B85]">
    <button @click="$emit('click')" class="cursor-pointer pl-0 pt-8 pb-2 pr-2 text-white text-sm font-medium transition text-end">
      {{ name }}
    </button>
  </div>

</template>

<script setup>
defineProps({
  name: String,
})
</script>
