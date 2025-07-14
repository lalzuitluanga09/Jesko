<template>
    <div>
        <div class="flex items-center mb-6">
            <label class="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 mr-3">Is Variable Product?</label>
            <input type="checkbox" class="w-5 h-5 accent-blue-600 cursor-pointer" v-model="isVariable" />
        </div>
    </div>
    <div v-if="isVariable" class="bg-white dark:bg-gray-700 text-sm">
        <label class="block text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Product Variations</label>
        <div
            v-for="(variation, vIdx) in variations"
            :key="vIdx"
            class="relative border border-gray-300 p-2 mb-2 rounded-md"
        >
            <div class="flex gap-3 items-center mb-2">
                <input
                    v-model="variation.option"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 font-medium transition"
                    placeholder="Option name (e.g. Size, Color)"
                />
                <div
                    v-if="variations.length > 1"
                    @click="removeVariation(vIdx)"
                    class="mr-2 text-red-500 hover:text-red-700 transition px-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer"
                    title="Remove Option"
                >
                <span class="mdi mdi-close"></span>
                </div>
            </div>
            <div v-if="variation.option" class="flex flex-wrap gap-3 items-center">
                <div
                    v-for="(value, valIdx) in variation.values"
                    :key="valIdx"
                    class="flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md shadow-sm mb-2"
                >
                    <span class="font-medium">{{ value }}</span>
                    <div
                        @click="removeValue(vIdx, valIdx)"
                        class="ml-2 text-red-400 hover:text-red-600 transition px-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                        title="Remove Value"
                    >
                    <span class="mdi mdi-close"></span>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-2">
                    <input
                        v-model="variation.newValue"
                        @keypress.enter.prevent="addValue(vIdx)"
                        type="text"
                        class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Add value (e.g. S, Red)"
                    />
                    <div
                        @click="addValue(vIdx)"
                        class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow transition font-semibold"
                        title="Add Value"
                    >+</div>
                </div>
            </div>
        </div>
        <div
            @click="addVariation"
            class="flex items-center justify-center cursor-pointer w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition"
        >+ Add Option</div>

        <div class="mt-12">
            <label class="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Variation Stocks</label>
            <div v-if="variationCombinations.length">
                <table class="min-w-full border text-sm">
                    <thead>
                        <tr>
                            <th v-for="variation in variations" :key="variation.option" class="px-2 py-1 border">{{ variation.option }}</th>
                            <th class="px-2 py-1 border">Price</th>
                            <th class="px-2 py-1 border">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="comb in variationCombinations" :key="comb.key">
                            <td v-for="val in comb.values" :key="val" class="px-2 py-1 border text-center">{{ val }}</td>
                            <td class="px-2 py-1 border text-center">
                            ₹ <input
                                type="number"
                                min="0"
                                class="w-20 px-2 py-1 border border-gray-400 rounded"
                                v-model.number="variationData[comb.key].price"
                                />
                            </td>
                            <td class="px-2 py-1 border text-center">
                                <input
                                type="number"
                                min="0"
                                class="w-20 px-2 py-1 border border-gray-400 rounded"
                                v-model.number="variationData[comb.key].stock"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text-gray-500 mt-2">Add options and values to manage stocks.</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProduct } from '@/composables/useProduct';

const {
    isVariable,
    variations,
    variationData,
    variationCombinations,
    addVariation,
    removeVariation,
    addValue,
    removeValue,
} = useProduct()

</script>