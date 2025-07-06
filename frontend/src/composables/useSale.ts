import { ref } from 'vue'

const loading = ref<boolean>(false)
const addDialogOpen = ref<boolean>(false)
const date = ref<Date | null>(null);
const isView = ref<boolean>(false)
const selected = ref<any>(null);


const sale = ref({
  name: '',
  startDate: '',
  endDate: '',
  discountType: '',
  discountAmount: '',
  status: '',
  target: ''
})

const columns = [
  'name',
  'start date',
  'end date',
  'discount type',
  'amount',
  'target',
]

const rows = [
  { name: 'Summer Sale', 'start date': '2023-06-01', 'end date': '2023-06-30', 'discount type': 'Percentage', amount: '10%', status: 'active', target: 'All Products' },
  { name: 'Winter Clearance', 'start date': '2023-12-01', 'end date': '2023-12-31', 'discount type': 'Fixed Amount', amount: '₹60', status: 'inactive', target: 'Selected Categories' },
  { name: 'Black Friday Deals', 'start date': '2023-11-24', 'end date': '2023-11-30', 'discount type': 'Percentage', amount: '15%', status: 'upcoming', target: 'All Products' },
]

const options = [
    { label: 'All Sales', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Upcoming', value: 'upcoming' },
]

export function useSale() {

  const openAddDialog = () => {
    addDialogOpen.value = true
  }

  const closeAddDialog = () => {
    addDialogOpen.value = false
  }

  const openViewDialog = (sale: any) => {
    selected.value = sale
    isView.value = true
  }

  const closeViewDialog = () => {
    isView.value = false
    selected.value = null
  }

    return {
      isView,
      selected,
      date,
      sale,
      columns,
      rows,
      options,
      loading,
      addDialogOpen,
      openAddDialog,
      closeAddDialog,
      openViewDialog,
      closeViewDialog
  }
}
