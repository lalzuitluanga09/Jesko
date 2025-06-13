<template>
    <div class="max-w-5xl mx-2 md:mx-auto mt-12">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MarketProductCard v-for="n in 4"::key="n" :id="n"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import MarketProductCard from './MarketProductCard.vue';

const props = defineProps<{
  title: string,
}>();

</script>

<style scoped>

</style>