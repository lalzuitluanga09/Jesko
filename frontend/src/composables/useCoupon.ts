import { ref } from 'vue'

const loading = ref<boolean>(false)
const addDialogOpen = ref<boolean>(false)
const date = ref<Date | null>(null);
const isView = ref<boolean>(false)
const selected = ref<any>(null);


const coupon = ref({
  code: '',
  type: '',
  value: '',
  usageLimit: '',
  appliesTo: '',
  validity: '',
  startDate: '',
    endDate: '',
  status: '',
  usageStats: '',
  used: 0,
})

const columns = [
    'code',
    'type',
    'value',
    'usage limit',
    'applies to',
    'validity',
    'usage stats',
]

const rows = [
  { code: 'SUMMER15', type: 'Percentage', value: '15%', 'usage limit': '100', 'applies to': 'All Products', 'validity': '2023-06-01 to 2023-06-30', status: 'active', 'usage stats': '50 of 100' },
  { code: 'WINTER20', type: 'Fixed Amount', value: '₹20', 'usage limit': '50', 'applies to': 'Selected Categories', 'validity': '2023-12-01 to 2023-12-31', status: 'inactive', 'usage stats': '0 of 50' },
  { code: 'BLACKFRIDAY', type: 'Percentage', value: '15%', 'usage limit': '200', 'applies to': 'All Products', 'validity': '2023-11-24 to 2023-11-30', status: 'upcoming', 'usage stats': '0 of 200' },
]

const options = [
    { label: 'All Coupons', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Upcoming', value: 'upcoming' },
]

export function useCoupon() {

  const openAddDialog = () => {
    addDialogOpen.value = true
  }

  const closeAddDialog = () => {
    addDialogOpen.value = false
  }

    const openViewDialog = (coupon: any) => {
        selected.value = coupon
        isView.value = true
    }
    
    const closeViewDialog = () => {
        isView.value = false
        selected.value = null
    }
    

    return {
      date,
      coupon,
      columns,
      rows,
      options,
      loading,
      addDialogOpen,
      isView,
      selected,
      openAddDialog,
      closeAddDialog,
      openViewDialog,
      closeViewDialog
  }
}
