<template>
    <div v-if="loading">
        <DataLoader />
    </div>
    <div v-else>
        <div class="max-w-5xl mx-auto p-2 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 rounded-lg">
            <div class="flex items-center rounded-xl overflow-clip">
                <ImageSlider />
            </div>
            <ProductData />
        </div>
        <div class="py-4 flex flex-col mx-1 px-1 md:mx-36 md:px-4  border-y border-y-gray-300">
            <label class="block mb-2 font-medium">Description</label>
            <div class="flex flex-wrap gap-2">
                <span class="text-gray-500 text-sm pb-2">
                    Description of the product
                </span>
            </div>
         </div>
         <OtherProducts title="Similar Products"/>
    </div>
</template>

<script setup lang="ts">
import DataLoader from '@/components/others/DataLoader.vue';
import ImageSlider from '@/components/product/ImageSlider.vue';
import OtherProducts from '@/components/product/OtherProducts.vue';
import ProductData from '@/components/product/ProductData.vue';
import { useProduct } from '@/composables/useProduct';
import { onMounted } from 'vue';

const {
    loading,
} = useProduct()

onMounted(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    loading.value = true
    if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
        loading.value = false
    }, 500)
})
</script>

<style scoped>

</style>