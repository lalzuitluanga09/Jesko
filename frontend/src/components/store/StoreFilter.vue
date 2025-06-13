<template>
    <aside class="sm:w-52 lg:w-72 bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-300 space-y-8 mr-1">
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="search">Search</label>
            <input
                id="search"
                type="text"
                placeholder="Search products..."
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="sort">Sort by</label>
            <select
                id="sort"
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="relevance">Relevance</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
            <input
                type="range"
                min="0"
                max="1000"
                step="100"
                class="w-full accent-pink-500"
                v-model="maxPrice"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹{{ maxPrice }}</span>
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <ul class="space-y-1">
                <li class="hover:bg-amber-50 dark:hover:bg-gray-600">
                    <input type="checkbox" id="cat1" class="mr-2 accent-blue-500" />
                    <label for="cat1" class="text-gray-700 dark:text-gray-300">Category 1</label>
                </li>
                <li class="hover:bg-amber-50 dark:hover:bg-gray-600">
                    <input type="checkbox" id="cat2" class="mr-2 accent-blue-500" />
                    <label for="cat2" class="text-gray-700 dark:text-gray-300">Category 2</label>
                </li>
                <li class="hover:bg-amber-50 dark:hover:bg-gray-600">
                    <input type="checkbox" id="cat3" class="mr-2 accent-blue-500" />
                    <label for="cat3" class="text-gray-700 dark:text-gray-300">Category 3</label>
                </li>
            </ul>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-pink-100 dark:hover:bg-gray-500">#tag1</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-pink-100 dark:hover:bg-gray-500">#tag2</span>
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-pink-100 dark:hover:bg-gray-500">#tag3</span>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const maxPrice = ref<number>(1000)

</script>

<style scoped>

</style>