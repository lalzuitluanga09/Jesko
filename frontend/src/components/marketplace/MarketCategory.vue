<template>
  <div class="py-2">
    <Splide :options="sliderOptions" aria-label="Top Stores">
      <SplideSlide v-for="(item, index) in categories" :key="index" class="px-2">
        <div :class="selectedItems.includes(item) ? 'bg-amber-50 dark:bg-gray-500' : 'bg-gray-50 dark:bg-gray-700'"
          class="px-4 py-2 hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-500 rounded text-sm md:text-base cursor-pointer"
          @click="select(item as string)">
          {{ item }}
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { useMarket } from '@/composables/useMarket';

const { 
  categories,
  selectedItems
 } = useMarket()

const sliderOptions = {
  arrows: false,
  rewind: false,
  rewindByDrag: false,
  autoWidth: true,
  autoHeight: true,
  pagination: false,
//   isNavigation: true,
}

const select = (item: string) => {
  const idx = categories.value.indexOf(item);
  if (selectedItems.value.includes(item)) {
    selectedItems.value = selectedItems.value.filter(i => i !== item);
    if (idx > -1) {
      categories.value.splice(idx, 1);
      categories.value.push(item);
    }
  } else {
    selectedItems.value = [...selectedItems.value, item];
    if (idx > -1) {
      categories.value.splice(idx, 1);
      categories.value.unshift(item);
    }
  }
}

</script>

<style scoped></style>
