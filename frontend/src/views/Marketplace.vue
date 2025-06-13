<template>
    <div>
        <div class="flex flex-row items-center w-full max-w-4xl mx-auto md:gap-1">
            <MarketSearchBar />
            <LocationBar />
        </div>
        <MarketCategory />
        <Loading v-if="loading" class="min-h-[400px]"/>
        <div v-else>
            <div class="flex items-center justify-between my-4">
                <p class="text-gray-600 dark:text-gray-400 text-sm ml-2 md:ml-0">Showing 4 items</p>
                <SelectBtn />
            </div>
            <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 md:mx-0">
                <MarketProductCard v-for="(item, index) in items" :key="index"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SelectBtn from '@/components/buttons/SelectBtn.vue';
import MarketCategory from '@/components/marketplace/MarketCategory.vue';
import MarketProductCard from '@/components/marketplace/MarketProductCard.vue';
import MarketSearchBar from '@/components/marketplace/MarketSearchBar.vue';
import Loading from '@/components/others/Loading.vue';
import LocationBar from '@/components/search/LocationBar.vue';
import { useMarket } from '@/composables/useMarket';

const { searchTerm, items, loading } = useMarket()


</script>

<style scoped>

</style>