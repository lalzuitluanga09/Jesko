<template>
    <div v-if="loadProduct" class="flex w-full min-h-[50vh] justify-center items-center px-4 pt-2 pb-4  border border-gray-300 rounded-2xl">
        <Loading />
    </div>
    <div v-else class="flex flex-col w-full px-4 pt-2 pb-4  border border-gray-300 rounded-2xl">
        <div v-if="pagination.total > 0">
            <p class="text-gray-500 text-xs md:text-sm ml-2 mb-2">Showing {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }} results</p>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <ProductCard v-for="item in storeData.products" :key="item.id" :slug="storeData.data?.slug" :item="item" :categories="storeData.categories"/>
            </div>
        </div>
        <div  v-else class="flex w-full items-center justify-center">
            <h1 class="py-8 text-sm">No items found</h1>
        </div>
        <div v-if="pagination.total > 16" class="w-full mt-6 md:mt-8 h-10 flex items-center justify-center space-x-2">
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
import ProductCard from '../cards/ProductCard.vue';
import { useStore } from '@/composables/useStore';
import Loading from '../others/Loading.vue';

const {
    loadProduct,
    storeData,
    pagination,
    pageNumbers,
    fetchProducts
} = useStore()


const prev = () => {
    if(storeData.value.data)
    fetchProducts(storeData.value.data.id, pagination.value.current_page - 1)
}

const next = () => {
    if(storeData.value.data)
    fetchProducts(storeData.value.data.id, pagination.value.current_page + 1)
}

const fetchPage = (page: number) => {
    if(storeData.value.data)
    fetchProducts(storeData.value.data.id, page)
}
</script>

<style scoped>

</style>