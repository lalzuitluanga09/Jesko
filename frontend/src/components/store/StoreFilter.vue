<template>
    <aside class="sm:w-52 lg:w-72 bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-300 space-y-8 mr-1">
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="search">Search</label>
            <div class="flex">
                <input
                    id="search"
                    type="text"
                    placeholder="Search products..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    v-model="filter.searchTerm"
                    @keydown.enter.prevent="handleFilter()"
                />
                <div class="flex items-center border border-gray-300 px-2 rounded-r cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300" @click="handleFilter()">
                    <span class="text-gray-400 mdi mdi-magnify text-xl"></span>
                </div>
            </div>

        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="sort">Sort by</label>
            <select
                id="sort"
                v-model="filter.sort"
                class="w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
            >
                <option value="relevance">Relevance</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
            <VueSlider v-model="filter.price_range" tooltip="hover" :min="0" :max="maxPrice" :enableCross="false" />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹ {{ filter.price_range[0] }}</span>
                <span>₹{{ filter.price_range[1] }}</span>
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <ul class="space-y-1">
                <li
                v-for="category in storeData.categories"
                :key="category.id"
                class="hover:bg-amber-50 dark:hover:bg-gray-600 px-2 py-1 rounded"
                >
                <input
                    type="checkbox"
                    :id="`cat-${category.id}`"
                    class="mr-2 accent-blue-500"
                    v-model="filter.categories"
                    :value="category.id"
                />
                <label
                    :for="`cat-${category.id}`"
                    class="text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                >
                    {{ category.name }}
                </label>
                </li>
            </ul>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <div class="flex flex-wrap gap-2">
                <span
                v-for="tag in storeData.tags"
                :key="tag.id"
                @click="selectTag(tag.id)"
                class="px-2 py-1 rounded text-sm cursor-pointer transition"
                :class="[
                    filter.tags.includes(tag.id)
                    ? 'bg-sky-200 '
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-gray-500 select-none'
                ]"
                >
                # {{ tag.name }}
                </span>

            </div>
        </div>
        <div class="relative">
            <button @click="handleFilter"
                class="text-sm border border-sky-700 bg-sky-200 text-sky-700 dark:bg-sky-600 dark:text-white dark:border-gray-300 px-2 py-1 rounded-md hover:bg-sky-300 dark:hover:bg-sky-700 cursor-pointer transition">
                <span class="mdi mdi-check md:pr-1"></span>Apply
            </button>
            <button @click="reset"
                 v-if="filter.searchTerm || filter.sort != 'relevance' || filter.categories.length > 0 || filter.tags.length > 0 || filter.price_range[0] > 0 || filter.price_range[1] < maxPrice"
                class="absolute right-0 text-sm border border-blue-300 text-blue-400 px-2 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer transition">
                <span class="mdi mdi-close-circle md:pr-1"></span>Reset
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueSlider from "vue-3-slider-component";
import { useStore } from '@/composables/useStore';

const {
    filter,
    storeData,
    clearFilter,
    handleFilter,
} = useStore()

const maxPrice = ref<number>(0)

onMounted(() => {
    maxPrice.value = filter.value.price_range[1]
})

const selectTag = (id: number) => {
    const index = filter.value.tags.indexOf(id)
    if (index > -1) {
        filter.value.tags.splice(index, 1)
    } else {
        filter.value.tags.push(id)
    }
}

const reset = () => {
    filter.value.price_range[0] = 0
    filter.value.price_range[1] = maxPrice.value
    clearFilter()
    handleFilter()
}

</script>

<style scoped>

</style>