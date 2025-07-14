import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { StoreCategory } from '@/types/store'
import { api } from '@/lib/axios'

export const useMeta = defineStore('meta', () => {

    const loading = ref<boolean>(false)
    const storeCategories = ref<StoreCategory[]>([])

    const getMeta = async () => {
        loading.value = true
        try {
            const res = await api.get('/meta');
            storeCategories.value = res.data.store_categories
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }


    return {
        loading,
        storeCategories,
        getMeta

    }
})
