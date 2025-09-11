<template>
  <div>
      <button @click="handleClick" class="text-sm md:text-base text-white px-3 py-1 bg-blue-500 rounded-md shadow-md cursor-pointer flex items-center hover:bg-blue-600">
        <span class="mdi mdi-plus text-lg md:text-2xl"></span>
        {{ title }}
    </button>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string,
}>();


const emit = defineEmits<{
  (e: 'click'): void
}>();

const handleClick = () => {
  emit('click');
}

</script>

<style scoped>

</style>