<template>
    <div class="flex flex-col w-full max-w-6xl mx-auto py-4">
        <div class="w-full flex items-center justify-between mb-4 md:mb-6 px-2 md:px-0">
                <h1 class="text-md md:text-lg lg:text-xl font-bold">
                    <template v-if="meta.storeCategories.find(item => item.id === storeFilter.category_id)">
                        {{ meta.storeCategories.find(item => item.id === storeFilter.category_id)?.name }}
                    </template>
                    <template v-else-if="searchTitle">
                        <span class="font-light text-sm md:text-base">Search result for </span>
                        <span class="font-semibold text-sm md:text-base">{{ searchTitle }}</span>
                    </template>
                    <template v-else>
                        All Stores
                    </template>
                </h1>
                <p v-if="pagination.total > 0" class="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Showing {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }} results</p>
        </div>
        <div v-if="loading" class="w-full h-24 md:h-32 flex items-center justify-center">
            <Loading />
        </div>
        <div v-else>
            <div v-if="pagination.total == 0"
                class="w-full h-24 md:h-32 flex items-center justify-center text-gray-500 dark:text-gray-300">
                <span class="mdi mdi-information-outline text-lg mr-2"></span>
                <span class="text-sm font-medium">No stores available.</span>
            </div>
            <div v-else
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-2 md:px-0">
                <StoreCard v-for="store in stores" :key="store.id" :store="store" />
            </div>
        </div>
        <div v-if="pagination.total > 16" class="w-full mt-7 md:mt-10 h-10 flex items-center justify-center space-x-2">
            <button
                @click="prev"
                :disabled="pagination.current_page == 1"
                class="px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
                Prev
            </button>

              <button
                v-for="page in pageNumbers"
                :key="page"
                @click="fetchPage(page)"
                :class="[
                'px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base border border-gray-400 rounded cursor-pointer',
                page === pagination.current_page ? 'bg-gray-400 dark:bg-gray-600 text-white ' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                ]"
            >
                {{ page }}
            </button>

            <button
                @click="next"
                :disabled="pagination.current_page == pagination.last_page"
                class="px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import StoreCard from './cards/StoreCard.vue';
import { useStore } from '@/composables/useStore';
import Loading from './others/Loading.vue';
import { useMeta } from '@/stores/meta';

const {
    storeFilter,
    searchTitle,
    stores,
    loading,
    pagination,
    pageNumbers,
    getData
} = useStore()

const meta = useMeta()

const prev = () => {
    getData(pagination.value.current_page - 1)
}

const next = () => {
    getData(pagination.value.current_page + 1)
}

const fetchPage = (page: number) => {
    getData(page)
}

</script>

<style scoped></style>