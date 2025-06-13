import { ref, watch } from 'vue'

const searchTerm = ref<String>('')
const selectedItems = ref<String []>([])
const categories = ref<String [] >(['Fashion', 'Electronics', 'Toys', 'Books', 'Food'])
const items = ref<number>(10)
const loading = ref<Boolean>(false)

export function useMarket() {

    let timeout: ReturnType<typeof setTimeout> | null = null

    watch(selectedItems, () => {
        loading.value = true
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            items.value = Math.floor(Math.random() * 10) + 1
            loading.value = false
        }, 500)
    })

          watch(searchTerm, () => {
              loading.value = true
              if (timeout) clearTimeout(timeout)
              timeout = setTimeout(() => {
                  loading.value = false
              }, 500)
          })


    return {
        items,
        searchTerm,
        selectedItems,
        categories,
        loading
  }
}
