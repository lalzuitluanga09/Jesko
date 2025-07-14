<template>
    <div v-if="loading">
        <DataLoader />
    </div>
    <div v-else>
        <div class="max-w-5xl mx-auto p-2 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 rounded-lg">
            <div class="relative flex items-center rounded-xl overflow-clip">
                <ImageSlider :images="productData.images"/>
            </div>
            <ProductData />
        </div>
        <div class="max-w-5xl mx-auto p-1 md:p-4">
            <div class="border-b border-gray-300 dark:border-gray-500 mb-4">
                <nav class="flex space-x-2 md:space-x-4">
                    <button class="py-2 px-4 font-medium"
                        :class="activeTab === 'description' ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500 dark:text-gray-300'"
                        @click="activeTab = 'description'">
                        Description
                    </button>
                    <button class="py-2 px-4 font-medium"
                        :class="activeTab === 'details' ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500 dark:text-gray-300'"
                        @click="activeTab = 'details'">
                        Details
                    </button>
                    <button class="py-2 px-4 font-medium"
                        :class="activeTab === 'reviews' ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500 dark:text-gray-300'"
                        @click="activeTab = 'reviews'">
                        Reviews
                    </button>
                </nav>
            </div>
            <div class="px-2">
                <div v-if="activeTab === 'description'"
                    class="text-gray-500 dark:text-gray-300 text-sm md:text-base pb-2">
                    {{ productData.item?.description }}
                </div>
                <div v-else-if="activeTab === 'details'"
                    class="text-gray-500 dark:text-gray-300 text-sm md:text-base pb-2">
                    Product details go here.
                </div>
                <div v-else-if="activeTab === 'reviews'"
                    class="text-gray-500 dark:text-gray-300 text-sm md:text-base pb-2">
                    Product reviews go here.
                </div>
            </div>
        </div>
        <!-- <OtherProducts title="Similar Products" /> -->
    </div>
    <ViewImageSlider />
</template>

<script setup lang="ts">
import DataLoader from '@/components/others/DataLoader.vue';
import ImageSlider from '@/components/product/ImageSlider.vue';
import OtherProducts from '@/components/product/OtherProducts.vue';
import ProductData from '@/components/product/ProductData.vue';
import ViewImageSlider from '@/components/dialogs/view/ViewImageSlider.vue';
import { useProduct } from '@/composables/useProduct';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/composables/useStore';

const {
    loading,
} = useProduct()

const {
    productData,
    getProductData
} = useStore()

const route = useRoute()


onMounted(() => {
    if(!productData.value.item) {
        getProductData(Number(route.params.id))
    }
})

const activeTab = ref('description');
</script>

<style scoped></style>