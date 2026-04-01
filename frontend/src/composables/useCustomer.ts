import { adminApi } from '@/lib/axios'
import type { Pagination } from '@/types/pagination'
import { ref, watch } from 'vue'
import { useAdmin } from './useAdmin'
import { debounce } from 'lodash-es'

const loading = ref<boolean>(false)
const loadingData = ref<boolean>(false)

const { storeSlug } = useAdmin()

const customers = ref<{
    id: number,
    name: string,
    phone: string,
    email: string,
    address: string
}[]>([])

const pagination = ref<Pagination>({
    current_page: 0,
    from: 0,
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0
})

const filter = ref<{
    searchTerm: string,
}>({
    searchTerm: '',
})

const getCustomers = async (page: number = 1) => {
    loadingData.value = true
    try {
        const res = await adminApi.get(`/${storeSlug.value}/customers`, {
            params: {
                page: page,
                searchTerm: filter.value.searchTerm,
            }
        });
        customers.value = res.data.data
        pagination.value = res.data
    } catch (error) {
        console.error('Error fetching customer data:', error)
    } finally { 
        loadingData.value = false
    }
  }


    const debouncedGetPayments = debounce(() => {
      if (!loadingData.value)
        getCustomers()
    }, 600)
  
    watch(
      () => filter.value.searchTerm,
      debouncedGetPayments
    )
  

export function useCustomer() {


    return {
        customers,
        loading,
        loadingData,
        filter,
        pagination,
        getCustomers,
  }
}
