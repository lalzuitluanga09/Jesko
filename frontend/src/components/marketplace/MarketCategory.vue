<template>
  <div>
    <Splide :options="sliderOptions" aria-label="Marketplace Category">
      <SplideSlide v-for="item in categories" :key="item.id" class="px-1 md:px-2 py-2">
        <div :class="filter.category_ids.includes(item.id) ? 'bg-amber-50 dark:bg-gray-600' : 'bg-gray-50 dark:bg-gray-700'"
          class="px-2 py-1 md:px-4 md:py-2 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors border border-gray-400 dark:border-gray-500 rounded text-sm md:text-base cursor-pointer"
          @click="select(item.id)">
          {{ item.name }}
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { useMarket } from '@/composables/useMarket';

const { 
  filter,
  categories,
  getData
 } = useMarket()

const sliderOptions = {
  arrows: false,
  rewind: false,
  rewindByDrag: false,
  autoWidth: true,
  autoHeight: true,
  pagination: false,
}

const select = (id: number) => {
  if(filter.value.category_ids.includes(id)) {
    filter.value.category_ids = filter.value.category_ids.filter(item => item != id)
  } else {
    filter.value.category_ids.push(id)
  }
  getData()
}

</script>

<style scoped></style>
