<template>
    <div v-if="loadStoreData">
        <StoreLoading title="Store Name" content="Welcome"/>
    </div>
    <div v-else class="flex flex-col gap-2">
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

const { isMobile } = useSetting()

const {
    loadStoreData,
} = useStore()

onMounted(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    loadStoreData.value = true
    if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
        loadStoreData.value = false
    }, 700)
})


</script>

<style scoped>

</style>