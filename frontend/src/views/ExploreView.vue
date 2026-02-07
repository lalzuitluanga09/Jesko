<template>
  <div class="flex flex-row items-center w-full max-w-5xl mx-auto gap-1">
    <SearchBar v-model="storeFilter.searchTerm" @clear="reset()" @search="getData"/>
    <LocationBar :options="locations" @select="(event) => select(event)"/>
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
import { useMeta } from '@/stores/meta'

const { 
  storeFilter,
  searchTitle,
  filtering,
  getData
} = useStore()

const { locations }  = useMeta()

onMounted(async() => {
  filtering.value = true 
  await getData()
})

const reset = () => {
  storeFilter.value.category_id = null
  storeFilter.value.searchTerm = ''
  getData()
}

const select = (value : number[]) => {
  storeFilter.value.locations = value
  getData()
}

</script>
