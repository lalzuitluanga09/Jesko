<template>
    <div v-if="loadStoreData">
        <StoreLoading :title="storeData.data?.name || 'Store'" content="Welcome"/>
    </div>
    <div v-else class="flex flex-col md:gap-2">
        <StoreHeader />
        <div class="flex flex-col md:flex-row md:justify-between">
            <div v-if="!isMobile"  class="h-fit sticky top-2">
                <StoreFilter />
            </div>
            <MobileFilter v-else/>
            <StoreItems />
        </div>
    </div>
</template>

<script setup lang="ts">
import MobileFilter from '@/components/store/MobileFilter.vue';
import StoreFilter from '@/components/store/StoreFilter.vue';
import StoreHeader from '@/components/store/StoreHeader.vue';
import StoreItems from '@/components/store/StoreItems.vue';
import StoreLoading from '@/components/others/StoreLoading.vue';
import { useSetting } from '@/composables/useSetting';
import { useStore } from '@/composables/useStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const { isMobile } = useSetting()

const {
    loadStoreData,
    storeData,
    getStoreData,
    fetchProducts,
} = useStore()

onMounted(async() => {
    await getStoreData(route.params.slug as string )
    const storeId = storeData.value.data?.id
    if(storeId) {
        await fetchProducts(storeId)
    }
})


</script>

<style scoped>

</style>