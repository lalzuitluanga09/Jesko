import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { StoreCategory } from '@/types/store'
import { api } from '@/lib/axios'
import { useStoreSetting } from '@/composables/useStoreSetting'

export const useMeta = defineStore('meta', () => {

    const {
        updateForm
    } = useStoreSetting()

    const loading = ref<boolean>(false)
    const storeCategories = ref<StoreCategory[]>([])
    const storeThemes = ref<{
            id: number,
            name: string,
        }[]>([])

    const getMeta = async () => {
        loading.value = true
        try {
            const res = await api.get('/meta');
            storeCategories.value = res.data.store_categories
            storeThemes.value = res.data.store_themes
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
            updateForm()
        }
    }


    return {
        loading,
        storeCategories,
        storeThemes,
        getMeta

    }
})
