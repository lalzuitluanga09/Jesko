<template>
    <div class="flex flex-col gap-4 w-full px-2 py-6">
        <h1 class="text-lg md:text-2xl font-bold text-center">My Following</h1>
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">Total Stores: {{ followedStores.length }}</p>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 md:mx-10">
            <StoreCard v-for="item in followedStores" :key="item.id" :store="item" />
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