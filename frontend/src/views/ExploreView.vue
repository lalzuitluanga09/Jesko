<template>
  <div class="flex flex-row items-center w-full max-w-4xl mx-auto md:gap-1">
      <SearchBar />
      <LocationBar />
  </div>
  <div v-if="searchTerm === ''">
    <ExploreCateogry />
    <ExploreStores />
  </div>
  <div v-else>
    <Loading v-if="loading" class="min-h-[400px]"/>
    <div v-else class="flex flex-col w-full max-w-6xl mx-auto py-4 md:py-8">
      <div class="flex justify-between items-center mb-2">
        <div class="text-gray-600 text-sm ml-2 md:ml-0">Showing 4 of 4 results</div>
        <SelectBtn />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mx-2 md:mx-0">
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/search/SearchBar.vue'
import ExploreCateogry from '@/components/ExploreCateogry.vue'
import ExploreStores from '@/components/ExploreStores.vue'
import StoreCard from '@/components/cards/StoreCard.vue'
import Loading from '@/components/others/Loading.vue'
import { useStore } from '@/composables/useStore'
import SelectBtn from '@/components/buttons/SelectBtn.vue'
import LocationBar from '@/components/search/LocationBar.vue'

const { searchTerm, loading } = useStore()

</script>
