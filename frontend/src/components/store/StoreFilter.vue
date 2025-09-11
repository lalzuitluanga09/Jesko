<template>
    <aside :class="`sm:w-52 lg:w-72 bg-white dark:bg-gray-700 p-6 rounded-xl border border-${storeData.data?.theme}-300 space-y-8 mr-1`">
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="search">Search</label>
            <div class="flex">
                <input
                    id="search"
                    type="text"
                    placeholder="Search products..."
                    :class="`w-full px-3 py-2 border border-${storeData.data?.theme}-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-400`"
                    v-model="filter.searchTerm"
                    @keydown.enter.prevent="handleFilter()"
                />
                <div :class="`flex items-center border border-${storeData.data?.theme}-300 px-2 rounded-r cursor-pointer hover:bg-${storeData.data?.theme}-200 dark:hover:bg-gray-600 transition duration-300`" @click="handleFilter()">
                    <span :class="`text-${storeData.data?.theme}-500 mdi mdi-magnify text-xl`"></span>
                </div>
            </div>

        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="sort">Sort by</label>
            <select
                id="sort"
                v-model="filter.sort"
                :class="`w-full px-3 py-2 border border-${storeData.data?.theme}-300 dark:bg-gray-700 rounded`"
            >
                <option value="relevance">Relevance</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
            <VueSlider v-model="filter.price_range" tooltip="hover" :min="0" :max="maxPrice" :enableCross="false" :process-style="{ backgroundColor: colorMatch[storeData.data?.theme || 'neutral'] }" :tooltip-style="{ backgroundColor: colorMatch[storeData.data?.theme || 'neutral'] }"/>
            <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹ {{ filter.price_range[0] }}</span>
                <span>₹{{ filter.price_range[1] }}</span>
            </div>
        </div>
        <div v-if="storeData.categories.length > 0">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <ul class="space-y-1">
                <li
                v-for="category in storeData.categories"
                :key="category.id"
                :class="`hover:bg-${storeData.data?.theme}-50 dark:hover:bg-${storeData.data?.theme}-500 px-2 py-1 rounded`"
                >
                <input
                    type="checkbox"
                    :id="`cat-${category.id}`"
                    :class="`mr-2 accent-${storeData.data?.theme}-500`"
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
        <div v-if="storeData.tags.length > 0">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
            <div class="flex flex-wrap gap-2">
                <span
                v-for="tag in storeData.tags"
                :key="tag.id"
                @click="selectTag(tag.id)"
                class="px-2 py-1 rounded text-sm cursor-pointer transition"
                :class="filter.tags.includes(tag.id)
                    ? `bg-${storeData.data?.theme}-200 dark:bg-${storeData.data?.theme}-500`
                    : `bg-${storeData.data?.theme}-50 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-${storeData.data?.theme}-200 dark:hover:bg-${storeData.data?.theme}-500 select-none`"
                >
                # {{ tag.name }}
                </span>

            </div>
        </div>
        <div :class="`relative text-${storeData.data?.theme}-400 dark:text-gray-300`">
            <button @click="handleFilter"
                :class="`inline-flex items-center gap-1 px-2 py-1 text-sm hover:bg-${storeData.data?.theme}-100 dark:hover:bg-${storeData.data?.theme}-500 dark:hover:text-white font-medium border border-${storeData.data?.theme}-400 rounded-xl shadow-md active:scale-95 transition-transform duration-150 ease-in-out`">
                <span class="mdi mdi-check text-lg"></span>
                Apply
            </button>

            <button @click="reset"
                v-if="filter.searchTerm || filter.sort != 'relevance' || filter.categories.length > 0 || filter.tags.length > 0 || filter.price_range[0] > 0 || filter.price_range[1] < maxPrice"
                :class="`absolute right-0 inline-flex items-center gap-1 px-2 py-1 text-sm font-medium hover:bg-${storeData.data?.theme}-100 dark:hover:bg-${storeData.data?.theme}-500 text-${storeData.data?.theme}-400 dark:hover:text-white border border-${storeData.data?.theme}-400 rounded-xl shadow active:scale-95 transition-transform duration-150 ease-in-out`">
                <span class="mdi mdi-close-circle text-lg"></span>
                Reset
            </button>

        </div>
    </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueSlider from "vue-3-slider-component";
import { useStore } from '@/composables/useStore';
import { useTheme } from '@/composables/useTheme';

const {
    filter,
    storeData,
    clearFilter,
    handleFilter,
} = useStore()

const { colorMatch } = useTheme()

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