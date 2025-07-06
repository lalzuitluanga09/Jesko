<template>
    <div class="flex items-center">
        <SearchBar/>
        <div class="border border-gray-400 px-3 py-2 rounded-lg">
            <button class="text-xl cursor-pointer text-gray-500" @click="openFilterDialog">
                <span class="mdi mdi-filter-outline"></span>
            </button>
        </div>
    </div>
    <div>
    <div v-if="filterOpen"
        class="fixed inset-x-0 bottom-0 flex items-end justify-center bg-black/20 z-20 min-h-screen">
    </div>
    <Transition name="slide">
    <div
      v-if="filterOpen"
      class="fixed inset-x-0 bottom-0 flex items-end justify-center z-30 min-h-screen"
      @click.self="closeFilterDialog"
    >
    <div class="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-t-2xl shadow-lg p-6 w-full mb-16">
       <div class="flex justify-between">
         <h2 class="text-xl font-semibold mb-4">Filters</h2>
            <SelectBtn />
       </div>
        <div class="mb-4">
            <label for="price-range" class="block text-gray-700 dark:text-gray-400 mb-1">Price Range</label>
            <input id="price-range" type="range" min="0" max="1000" v-model="maxPrice" step="100" class="w-full accent-pink-500" />
            <div class="flex justify-between">
                <span>₹0</span>
                <span>₹{{ maxPrice }}</span>
                <!-- <span>10000</span> -->
            </div>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-400 mb-1">Category</label>
            <div class="flex flex-wrap gap-2">
                <div class="border px-2 py-1 rounded-4xl">
                    Category
                </div>
                <div class="border px-2 py-1 rounded-4xl">
                    Category
                </div>
                <div class="border px-2 py-1 rounded-4xl">
                    Category
                </div>
                <div class="border px-2 py-1 rounded-4xl">
                    Category a
                </div>
                <div class="border px-2 py-1 rounded-4xl">
                    Category
                </div>
                <div class="border px-2 py-1 rounded-4xl">
                    Category
                </div>
            </div>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-400 mb-1">Tag</label>
            <div class="flex flex-wrap gap-2">
                <div class="border px-2 py-1 rounded-4xl">
                    #tag1
                </div>
                <div class="border px-2 py-1 rounded-4xl">
                    #tag1
                </div>
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <button class="bg-gray-100 dark:bg-transparent text-gray-700 dark:text-gray-200 border border-gray-400 px-4 py-2 rounded-lg shadow" @click="closeFilterDialog">Cancel</button>
            <button class="bg-pink-600 text-white px-4 py-2 rounded-lg border border-gray-400 shadow">Apply</button>
        </div>
    </div>
    </div>
</Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SelectBtn from '../buttons/SelectBtn.vue';
import SearchBar from '../search/SearchBar.vue';
import { useStore } from '@/composables/useStore';

const {
    filterOpen,
    openFilterDialog,
    closeFilterDialog
} = useStore()

const maxPrice = ref<number>(1000);
    
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