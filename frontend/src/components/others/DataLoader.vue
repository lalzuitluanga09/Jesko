<template>
    <div class="w-full min-h-[66vh] flex flex-col items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <!-- <h1 class="text-2xl font-bold mb-2 animate-pulse text-gray-700 dark:text-gray-200">{{ title }}</h1> -->
        <div class="px-3 py-1 text-xs font-medium leading-none text-center text-pink-800 bg-pink-200 rounded-full animate-pulse dark:bg-pink-900 dark:text-pink-200">loading...</div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title?: string,
}>();

</script>
