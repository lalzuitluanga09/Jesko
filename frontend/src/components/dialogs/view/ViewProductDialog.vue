<template>
    <Transition name="bounce">
        <div v-if="isView" class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xs z-50"
            @click.self="closeViewDialog">
            <div
                class="flex flex-col bg-white dark:bg-gray-800 w-full max-w-xl px-6 py-4 rounded-2xl shadow-md space-y-4 mx-4 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto cursor-default">
                <h2 class="text-lg text-center font-semibold text-gray-900 dark:text-white">Product Overview</h2>
                <div class="flex gap-4 justify-center">
                    <div @click="viewMainImage"
                        class="w-60 h-60 cursor-zoom-in rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                        <img v-if="defaultImage?.image_path" :src="storageUrl(defaultImage?.image_path)"
                            :alt="selected?.name || 'Product Image'"
                            class="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
                        <span v-else class="text-gray-400 dark:text-gray-500 text-lg">No Image</span>
                    </div>
                    <div class="flex flex-col gap-2 overflow-auto max-h-60">
                        <div v-for="image in images" :key="image.id"
                            @click="viewImage(storageUrl(image.image_path || ''))"
                            class="w-20 h-20 cursor-zoom-in rounded-md overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                            <img v-if="image?.image_path" :src="storageUrl(image.image_path)"
                                :alt="selected?.name || 'Gallery Image'"
                                class="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
                            <span v-else class="text-gray-400 dark:text-gray-500 text-sm">No Image</span>
                        </div>
                    </div>
                </div>
                <div class="w-full mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                <div class="grid grid-cols-2 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm text-gray-800 dark:text-gray-100">
                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Name</p>
                        <p class="text-base font-medium">{{ selected?.name || '—' }}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Type</p>
                        <p class="capitalize text-base font-medium">
                            {{ selected?.type || '—' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">SKU</p>
                        <p>{{ selected?.sku || '—' }}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Status</p>
                        <p>
                            <span
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                            :class="{
                                'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-300': selected?.status === 'active',
                                'bg-red-100 text-yellow-700 dark:bg-yellow-700 dark:text-red-300': selected?.status === 'draft',
                            }"
                            >
                            {{ selected?.status || '—' }}
                            </span>
                        </p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Price</p>
                        <p class="font-semibold">₹ {{ selected?.price || '0.00' }}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Stock</p>
                        <p class="font-bold">{{ selected?.stock ?? '0' }} <span v-if="toInteger(selected?.stock) < 10" class="bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded text-xs">Low</span></p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Category</p>
                        <p class="line-clamp-2">
                            {{
                                selected?.category_ids
                                ?.map(id => categories.find(c => String(c.id) === String(id))?.name)
                                ?.filter(Boolean)
                                ?.join(', ') || '—'
                            }}
                        </p>
                    </div>
                       <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Tag</p>
                        <p class="line-clamp-2">
                            {{
                                selected?.tag_ids
                                ?.map(id => tags.find(c => String(c.id) === String(id))?.name)
                                ?.filter(Boolean)
                                ?.join(', ') || '—'
                            }}
                        </p>
                    </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                    <div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Description</p>
                        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {{ selected?.description || 'No description provided.' }}
                        </p>
                    </div>

                <div v-if="selected?.type == 'variable'" class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                <div v-if="selected?.type == 'variable'">
                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Variations</p>
                    <table class="min-w-full border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-800 overflow-auto">
                        <thead>
                            <tr>
                            <th
                                v-for="header in tableHeaders"
                                :key="header"
                                class="p-2 border-l border-gray-300 text-center text-xs font-semibold text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider border-b"
                            >
                                {{ header }}
                            </th>
                            <th class="p-2 border-l border-gray-300 text-center text-xs font-semibold text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider border-b">
                                Price
                            </th>
                            <th class="p-2 border-l border-gray-300 text-center text-xs font-semibold text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 uppercase tracking-wider border-b">
                                Stock
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="(variation, index) in productVariations"
                            :key="variation.id"
                            class="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                            <td
                                v-for="header in tableHeaders"
                                :key="header"
                                class="px-2 py-1 border-l text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300"
                            >
                                {{ variationDisplayValue(variation, header) }}
                            </td>
                            <td class="px-2 py-1 border-l text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300">
                                ₹ {{ updatedStocks[variation.id].price }}
                            </td>
                            <td class="px-2 py-1 border-l text-center whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300">
                                {{ updatedStocks[variation.id].stock }} <span v-if="updatedStocks[variation.id].stock < 10" class="bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded text-xs">Low</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>

                </div>


                <div class="flex justify-center w-full pt-2">
                    <button
                        class="px-6 py-2 text-base cursor-pointer font-medium border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        @click="closeViewDialog">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </Transition>
    <ViewProductImage />
    
</template>



<script setup lang="ts">
import { useProduct } from '@/composables/useProduct';
import { storageUrl } from '@/config'
import { toInteger } from 'lodash-es';
import { useCategory } from '@/composables/useCategory';
import { useTag } from '@/composables/useTag';
import ViewProductImage from './VewProductImage.vue'
import { computed, onBeforeUnmount, onMounted } from 'vue';


const {
    isView,
    selected,
    defaultImage,
    images,
    closeViewDialog,
    isMagnify,
    previewImageUrl,
    productVariations,
    updatedStocks
} = useProduct();

const {
    data: categories
} = useCategory()

const {
    data: tags
} = useTag()

const viewImage = (url: string) => {
    previewImageUrl.value = url
    isMagnify.value = true
}

const tableHeaders = computed(() => {
  if (productVariations.value.length === 0) return []
  const first = productVariations.value[0]
  return [
    ...Object.keys(first.attributes || {}),
    // 'sku'
  ]
})

const variationDisplayValue = (variation: any, key: string) => {
  if (key in variation.attributes) return variation.attributes[key]
  return variation[key]
}

const handleKeydown = (e: any) => {
  if (e.key === 'Escape') {
    closeViewDialog()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const viewMainImage = () => {
    if(defaultImage.value?.image_path) {
        viewImage(storageUrl(defaultImage.value?.image_path || ''))
    }
}
</script>

<style scoped>
.bounce-enter-active {
    animation: bounce-in 0.4s;
}

.bounce-leave-active {
    animation: bounce-in 0.4s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
