<template>
    <div>
        <div class="flex flex-row items-center w-full max-w-4xl mx-auto md:gap-1">
            <SearchBar v-model="searchTerm" @clear="() => searchTerm = ''" @search="search" />
            <button @click="reset" v-if="filter.category_ids.length > 0 || filter.searchTerm"
                class="border border-blue-300 text-blue-400 px-3 py-1.5 flex rounded-md hover:bg-sky-100 dark:hover:bg-gray-600 cursor-pointer">
                <span class="mdi mdi-close-circle md:pr-1"></span>Reset
            </button>
        </div>
        <MarketCategory />
        <Loading v-if="loading" class="min-h-[400px]" />
        <div v-else>
            <div class="flex items-center justify-between my-2 mx-2 md:mx-0 md:my-4">
                <p v-if="filter.searchTerm" class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Search result
                    for : <span class="font-semibold">{{ filter.searchTerm }}</span></p>
                <p v-else-if="filter.category_ids.length > 0" class="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate max-w-1/2">
                    {{
                        filter.category_ids
                            ?.map(id => categories?.find(c => String(c.id) === String(id))?.name)
                            ?.filter(Boolean)
                            ?.join(', ') || '—'
                    }}
                </p>
                <p v-if="pagination.total > 0" class="text-gray-600 dark:text-gray-400 text-xs md:text-sm ml-2 md:ml-0">Showing {{ pagination.from
                    }}-{{ pagination.to }} of {{ pagination.total }} results</p>
            </div>
            <div v-if="pagination.total > 0"
                class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 mx-1 md:mx-0">
                <MarketProductCard v-for="item in items" :key="item.id" :item="item" />
            </div>
            <div v-else class="w-full h-24 md:h-32 flex items-center justify-center text-gray-500 dark:text-gray-300">
                <span class="mdi mdi-information-outline text-lg mr-2"></span>
                <span class="text-sm font-medium">No result found.</span>
            </div>
            <div v-if="pagination.total > 20"
                class="w-full mt-7 md:mt-10 h-10 flex items-center justify-center space-x-2">
                <button @click="prev" :disabled="pagination.current_page == 1"
                    class="px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
                    Prev
                </button>
                <button v-for="page in pageNumbers" :key="page" @click="fetchPage(page)" :class="[
                    'px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base border border-gray-400 rounded cursor-pointer',
                    page === pagination.current_page ? 'bg-gray-400 dark:bg-gray-600 text-white ' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                ]">
                    {{ page }}
                </button>

                <button @click="next" :disabled="pagination.current_page == pagination.last_page"
                    class="px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-base border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MarketCategory from '@/components/marketplace/MarketCategory.vue';
import MarketProductCard from '@/components/marketplace/MarketProductCard.vue';
import Loading from '@/components/others/Loading.vue';
import SearchBar from '@/components/search/SearchBar.vue';
import { useMarket } from '@/composables/useMarket';
import { onMounted, ref } from 'vue';

const {
    loading,
    filter,
    items,
    pagination,
    pageNumbers,
    categories,
    getData,
    clearFilter
} = useMarket()

onMounted(async () => {
    await getData()
})

const searchTerm = ref('')

const reset = () => {
    searchTerm.value = ''
    clearFilter()
    getData()
}

const search = () => {
    filter.value.searchTerm = searchTerm.value
    getData()
}

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