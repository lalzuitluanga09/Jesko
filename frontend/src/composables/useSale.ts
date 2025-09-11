import { adminApi } from '@/lib/axios'
import type { Pagination } from '@/types/pagination'
import type { Sale } from '@/types/sale'
import { ref, watch } from 'vue'
import { useNotify } from './useNotify'
import { useAdmin } from './useAdmin'
import { useConfirmDialog } from './useConfirmDialog'
import { debounce } from 'chart.js/helpers'

const loading = ref<boolean>(false)
const loadingData = ref<boolean>(false)
const addDialogOpen = ref<boolean>(false)
const isView = ref<boolean>(false)

const sales = ref<Sale[]>([])
const selectedSale = ref<Sale | null>(null)

interface items {
  id: number
  name: string
}
const allProducts = ref<items[]>([])
const allCategories = ref<items[]>([])

const { notifySuccess, notifyError } = useNotify()

const { storeSlug } = useAdmin()
const { isOpen, itemId } = useConfirmDialog()

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Expired', value: 'expired' },
]

const typeOptions = [
  { label: 'Flash Sale', value: 'flash' },
  { label: 'Special Sale', value: 'special' },
  { label: 'Clearance Sale', value: 'clearance' },
  { label: 'Seasonal Sale', value: 'seasonal' },
]

const filter = ref<{
  searchTerm: string
  type: string
  status: string
  from: Date | null
  to: Date | null
}>({
  searchTerm: '',
  type: '',
  status: '',
  from: null,
  to: null,
})

const pagination = ref<Pagination>({
  current_page: 0,
  from: 0,
  last_page: 0,
  per_page: 0,
  to: 0,
  total: 0,
})

const saleForm = ref<{
  name: string
  type: string
  description: string
  discountType: string
  discountValue: number | null
  bogoX: number | null
  bogoY: number | null
  startDate: Date | null
  endDate: Date | null
  status: string
  applyTo: string
  selectedProducts: number[]
  selectedCategories: number[]
}>({
  name: '',
  type: 'flash',
  description: '',
  discountType: 'percentage',
  discountValue: null,
  bogoX: null,
  bogoY: null,
  startDate: null,
  endDate: null,
  status: 'active',
  applyTo: 'all',
  selectedProducts: [],
  selectedCategories: [],
})

export function useSale() {
  const openAddDialog = () => {
    addDialogOpen.value = true
  }

  const closeAddDialog = () => {
    addDialogOpen.value = false
    reset()
  }

  const openEditDialog = (sale: Sale) => {
    selectedSale.value = sale
    addDialogOpen.value = true
    saleForm.value = {
      name: sale.name,
      type: sale.type,
      description: sale.description,
      discountType: sale.discount_type,
      discountValue: sale.discount_value,
      bogoX: sale.rules?.bogoX,
      bogoY: sale.rules?.bogoY,
      startDate: sale.start_at,
      endDate: sale.end_at,
      status: sale.status,
      applyTo: sale.applyTo,
      selectedProducts: sale.selectedProducts || [],
      selectedCategories: sale.selectedCategories || [],
    }
  }

  const openViewDialog = (sale: Sale) => {
    selectedSale.value = sale
    isView.value = true
  }

  const closeViewDialog = () => {
    selectedSale.value = null
    isView.value = false
  }

  const getSalesData = async (page: number = 1) => {
    loadingData.value = true
    try {
      const res = await adminApi.get(`/${storeSlug.value}/sales`, {
        params: {
          page: page,
          searchTerm: filter.value.searchTerm,
          type: filter.value.type,
          status: filter.value.status,
          from: filter.value.from,
          to: filter.value.to,
        },
      })
      sales.value = res.data.sales.data
      pagination.value.current_page = res.data.sales.current_page
      pagination.value.from = res.data.sales.from
      pagination.value.last_page = res.data.sales.last_page
      pagination.value.per_page = res.data.sales.per_page
      pagination.value.to = res.data.sales.to
      pagination.value.total = res.data.sales.total
      allProducts.value = res.data.products
      allCategories.value = res.data.categories
    } catch (error) {
      notifyError('Error fetching data')
      console.log(error)
    } finally {
      loadingData.value = false
    }
  }

  const save = async () => {
    if (saleForm.value.name.trim() == '') {
      notifyError('Name cannot be null or empty')
      return
    }
    loading.value = true
    try {
      await adminApi.post(`/${storeSlug.value}/sales`, saleForm.value)
      notifySuccess('New Sale created')
      closeAddDialog()
      getSalesData()
    } catch (error) {
      notifyError('Error adding sale')
      console.log(error)
    } finally {
      loading.value = false
    }
  }


  const update = async () => {
      loading.value = true
      try {
        await adminApi.put(`/${storeSlug.value}/sales/${selectedSale.value?.id}`, saleForm.value);
        notifySuccess('Updated Successfully')
        closeAddDialog()
        getSalesData()
      } catch (error) {
        notifyError('Unable to update')
        console.log(error)
      }
    }
  

  const deleteSale = async () => {
    try {
      await adminApi.delete(`/${storeSlug.value}/sales/${itemId.value}`)
      isOpen.value = false
      notifySuccess('Deleted successfully')
      getSalesData()
    } catch (error) {
      notifyError('Cannot delete item')
      console.log(error)
    }
  }

  const clearFilter = () => {
    filter.value = {
      searchTerm: '',
      type: '',
      status: '',
      from: null,
      to: null,
    }
  }

  const reset = () => {
    saleForm.value = {
      name: '',
      type: 'flash',
      description: '',
      discountType: 'percentage',
      discountValue: null,
      bogoX: null,
      bogoY: null,
      startDate: null,
      endDate: null,
      status: 'active',
      applyTo: 'all',
      selectedProducts: [],
      selectedCategories: [],
    }
    selectedSale.value = null
  }


    const debouncedGetPayments = debounce(() => {
      if (!loadingData.value)
        getSalesData()
    }, 300)
  
    watch(
      [() => filter.value.from, () => filter.value.to, () => filter.value.status, () => filter.value.type, () => filter.value.searchTerm],
      debouncedGetPayments
    )

  return {
    isView,
    typeOptions,
    statusOptions,
    loading,
    loadingData,
    addDialogOpen,
    pagination,
    filter,
    sales,
    selectedSale,
    saleForm,
    allProducts,
    allCategories,
    clearFilter,
    openAddDialog,
    closeAddDialog,
    openViewDialog,
    closeViewDialog,
    getSalesData,
    save,
    update,
    deleteSale,
    openEditDialog,
  }
}
