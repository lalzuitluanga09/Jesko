<template>
    <div class="relative flex flex-col gap-4 w-full max-w-6xl min-h-[60vh] mx-auto px-2 py-6">
        <h1 class="text-lg md:text-2xl font-bold text-center">My Following</h1>
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">Total Stores: {{ followedStores.length }}</p>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 md:mx-10">
            <StoreCard v-for="item in followedStores" :key="item.id" :store="item" />
            <div class="absolute inset-0 flex items-center justify-center text-center py-8 text-gray-500 dark:text-gray-400" v-if="followedStores.length === 0">
                No followed stores found.
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import StoreCard from '@/components/cards/StoreCard.vue';
import { useUser } from '@/composables/useUser';
import { onMounted } from 'vue';
import Loading from '@/components/others/Loading.vue';

const {
    loading,
    followedStores,
    getFollowedStores
} = useUser()

onMounted(async() => {
    await getFollowedStores()
})


</script>

<style scoped>

</style>