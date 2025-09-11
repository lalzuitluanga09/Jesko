import { adminApi } from '@/lib/axios'
import type { Pagination } from '@/types/pagination'
import type { Payment } from '@/types/payment'
import { ref, watch } from 'vue'
import { useAdmin } from './useAdmin'
import { useNotify } from './useNotify'
import { debounce } from 'chart.js/helpers'

const { storeSlug } = useAdmin()

const {
  notifyError
} = useNotify()

const loadingData = ref<boolean>(false)

const payments = ref<Payment[]>([])

const paymentStatusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' },
]

const paymentModeOptions = [
  { label: 'Cash on Delivery', value: 'cod' },
  { label: 'Card', value: 'card' },
  { label: 'UPI', value: 'upi' },
  { label: 'Net Banking', value: 'net_banking' },
]

const filter = ref<{
  searchTerm: string,
  status: string,
  paymentMode: string,
  from: Date | null,
  to: Date | null
}>({
  searchTerm: '',
  status: '',
  paymentMode: '',
  from: null,
  to: null
})

const pagination = ref<Pagination>({
  current_page: 0,
  from: 0,
  last_page: 0,
  per_page: 0,
  to: 0,
  total: 0
})

export function usePayment() {

  const getPayments = async (page: number = 1) => {
    loadingData.value = true
    try {
      const res = await adminApi.get(`/${storeSlug.value}/payments`, {
        params: {
          page: page,
          searchTerm: filter.value.searchTerm,
          status: filter.value.status,
          paymentMode: filter.value.paymentMode,
          from: filter.value.from,
          to: filter.value.to
        }
      });
      payments.value = res.data.data
      pagination.value.current_page = res.data.current_page
      pagination.value.from = res.data.from
      pagination.value.last_page = res.data.last_page
      pagination.value.per_page = res.data.per_page
      pagination.value.to = res.data.to
      pagination.value.total = res.data.total
    } catch (error) {
      notifyError('Error fetching data')
      console.log(error)
    } finally {
      loadingData.value = false
    }
  }

  const clearFilter = () => {
    filter.value = {
      searchTerm: '',
      status: '',
      paymentMode: '',
      from: null,
      to: null
    }
  }

  const debouncedGetPayments = debounce(() => {
    if (!loadingData.value)
      getPayments()
  }, 300)

  watch(
    [() => filter.value.from, () => filter.value.to, () => filter.value.status, () => filter.value.paymentMode, () => filter.value.searchTerm],
    debouncedGetPayments
  )


  return {
    loadingData,
    filter,
    paymentStatusOptions,
    paymentModeOptions,
    pagination,
    payments,
    getPayments,
    clearFilter
  }
}
