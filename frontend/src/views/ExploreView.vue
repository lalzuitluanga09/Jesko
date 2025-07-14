<template>
  <div class="flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto md:gap-1">
    <SearchBar v-model="storeFilter.searchTerm" @clear="() => storeFilter.searchTerm = ''" @search="getData"/>
      <div class="flex w-full md:w-auto justify-between items-center">
        <LocationBar />
        <button @click="reset"
                class="border border-blue-300 text-blue-400 px-3 py-2 md:w-32 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer">
            <span class="mdi mdi-close-circle md:pr-1"></span>Reset
        </button>
      </div>
  </div>
    <ExploreCateogry v-if="!searchTitle"/>
    <ExploreStores />
</template>

<script setup lang="ts">
import SearchBar from '@/components/search/SearchBar.vue'
import ExploreCateogry from '@/components/ExploreCateogry.vue'
import ExploreStores from '@/components/ExploreStores.vue'
import { useStore } from '@/composables/useStore'
import LocationBar from '@/components/search/LocationBar.vue'
import { onMounted } from 'vue'

const { 
  storeFilter,
  searchTitle,
  filtering,
  getData
} = useStore()

onMounted(async() => {
  filtering.value = true 
  await getData()
})

const reset = () => {
  storeFilter.value.category_id = null
  storeFilter.value.searchTerm = ''
  getData()
}

</script>
