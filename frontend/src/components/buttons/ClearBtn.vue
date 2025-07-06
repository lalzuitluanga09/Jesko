<template>
    <button @click="$emit('clear')"
            class="border border-blue-300 text-blue-400 px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
        <span class="mdi mdi-close-circle pr-1"></span>Clear
    </button>
</template>

<script setup lang="ts">

// const emit = defineEmits<{
//   (e: 'clear'): void
// }>();

</script>