<template>
    <div class="flex items-center">
        <SearchBar v-model="filter.searchTerm" @clear="clearSearch" @search="applyFilter"/>
        <div class="border border-gray-400 px-3 py-2 rounded-lg  cursor-pointer" @click="openFilterDialog">
            <span class="mdi mdi-filter-outline text-xl text-gray-500"></span>
        </div>
    </div>
    <div>
        <div v-if="filterOpen"
            class="fixed inset-x-0 bottom-0 flex items-end justify-center bg-black/20 z-20 min-h-screen">
        </div>
        <Transition name="slide">
            <div v-if="filterOpen" class="fixed inset-x-0 bottom-0 flex items-end justify-center z-30 min-h-screen"
                @click.self="closeFilterDialog">
                <div class="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-t-2xl shadow-lg p-6 w-full mb-16">
                    <div class="flex justify-between">
                        <h2 class="text-xl font-semibold mb-4">Filters</h2>
                        <SelectBtn
                            :value="sortOptions.find(item => item.value === mobileFilter.sort)?.label || 'Sort By'"
                            :options="sortOptions" @select="(event) => mobileFilter.sort = event" />
                    </div>
                    <div class="mb-4">
                        <label for="price-range" class="block text-gray-700 dark:text-gray-400 mb-1">Price Range</label>
                        <VueSlider v-model="mobileFilter.price_range" tooltip="hover" :min="0" :max="maxPrice"
                            :enableCross="false"/>
                        <div class="flex justify-between text-xs text-gray-500 mt-1">
                            <span>₹ {{ mobileFilter.price_range[0] }}</span>
                            <span>₹{{ mobileFilter.price_range[1] }}</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-400 mb-1">Category</label>
                        <div class="flex flex-wrap gap-2">
                            <div class="border px-3 py-1.5 rounded-2xl dark:text-gray-300 text-sm cursor-pointer select-none"
                                :class="[
                                    mobileFilter.categories.includes(category.id)
                                        ? 'bg-pink-200 dark:bg-gray-800 '
                                        : ''
                                ]" v-for="category in storeData.categories" :key="category.id"
                                @click="selectCategory(category.id)">
                                {{ category.name }}
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 dark:text-gray-400 mb-1">Tag</label>
                        <div class="flex flex-wrap gap-2">
                            <div class="border px-2 py-1 rounded-2xl dark:text-gray-300 text-sm cursor-pointer select-none"
                                :class="[
                                    mobileFilter.tags.includes(tag.id)
                                        ? 'bg-pink-200 dark:bg-gray-800 '
                                        : ''
                                ]" v-for="tag in storeData.tags" :key="tag.id" @click="selectTag(tag.id)">
                                # {{ tag.name }}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between flex-wrap gap-2">
                        <button
                            v-if="mobileFilter.sort !== 'relevance' || mobileFilter.categories.length > 0 || mobileFilter.tags.length > 0 || mobileFilter.price_range[0] != 0 || mobileFilter.price_range[1] != maxPrice"
                            class="bg-gray-100 dark:bg-transparent text-pink-700 dark:text-pink-300 border border-pink-400 px-3 py-1 rounded-xl"
                            @click="reset">
                            Reset
                        </button>
                        <div class="flex space-x-2 ml-auto">
                            <button
                                class="bg-gray-100 dark:bg-transparent text-gray-700 dark:text-gray-200 border border-gray-400 px-4 py-2 rounded-lg shadow"
                                @click="closeFilterDialog">
                                Cancel
                            </button>
                            <button class="bg-pink-600 text-white px-4 py-2 rounded-lg border border-gray-400 shadow"
                                @click="apply">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SelectBtn from '../buttons/SelectBtn.vue';
import SearchBar from '../search/SearchBar.vue';
import { useStore } from '@/composables/useStore';
import VueSlider from 'vue-3-slider-component';

const {
    storeData,
    filter,
    mobileFilter,
    sortOptions,
    filterOpen,
    applyFilter,
    clearMobileFilter,
    openFilterDialog,
    closeFilterDialog
} = useStore()

const maxPrice = ref<number>(0);

onMounted(() => {
    maxPrice.value = mobileFilter.value.price_range[1]
})

const selectCategory = (id: number) => {
    const index = mobileFilter.value.categories.indexOf(id)
    if (index > -1) {
        mobileFilter.value.categories.splice(index, 1)
    } else {
        mobileFilter.value.categories.push(id)
    }
}

const selectTag = (id: number) => {
    const index = mobileFilter.value.tags.indexOf(id)
    if (index > -1) {
        mobileFilter.value.tags.splice(index, 1)
    } else {
        mobileFilter.value.tags.push(id)
    }
}

const apply = () => {
    applyFilter()
    filterOpen.value = false
}

const reset = () => {
    clearMobileFilter()
    filter.value.price_range[0] = 0
    filter.value.price_range[1] = maxPrice.value
    mobileFilter.value.price_range[0] = 0
    mobileFilter.value.price_range[1] = maxPrice.value
    apply()
}

const clearSearch = () => {
    filter.value.searchTerm = ''
    applyFilter()
}

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
}

.slide-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.slide-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>