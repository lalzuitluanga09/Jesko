import { ref, watch } from 'vue'

const searchTerm = ref<string>('')
const selectedCategory = ref<string>('')
const storeItems = ref<number>(4)
const loading = ref<boolean>(false)
const filterOpen = ref<boolean>(false)
const loadStoreData = ref<boolean>(true)

export function useStore() {
      let timeout: ReturnType<typeof setTimeout> | null = null
  
      watch(searchTerm, () => {
          loading.value = true
          if (timeout) clearTimeout(timeout)
          timeout = setTimeout(() => {
              loading.value = false
          }, 500)
      })

      const openFilterDialog = () => {
        filterOpen.value = true
      }

    const closeFilterDialog = () => {
        filterOpen.value = false
      }


    return {
        searchTerm,
        storeItems,
        selectedCategory,
        loading,
        filterOpen,
        loadStoreData,
        openFilterDialog,
        closeFilterDialog
  }
}
