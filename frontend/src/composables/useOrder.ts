import { ref, computed } from 'vue'

const isOpen = ref<boolean>(false)
const isView = ref<boolean>(false)
const selected = ref<any>(null)

const search = ref('')
const status = ref('')
const currentPage = ref(1)
const pageSize = 5

const allOrders = ref([
    {
        id: 'ORD1234',
        productName: 'Wireless Headphones',
        thumbnail: '/images/product.png',
        price: 2499,
        date: '10 June 2025',
        status: 'pending',
    },
    {
        id: 'ORD1235',
        productName: 'Smart Watch',
        thumbnail: '/images/product.png',
        price: 3999,
        date: '27 May 2025',
        status: 'delivered',
    },
    // add more mock items here...
])


const columns = [
  'order id',
  'date',
  'customer',
  'payment method',
  'total',
  'items'
]

const rows = [
    { 'order id': 'ORD1234', date: '10 June 2025', customer: 'John Doe', 'payment method': 'COD', total: '$2499', items: 3, status: 'Pending' },
    { 'order id': 'ORD1234', date: '10 June 2025', customer: 'John Doe', 'payment method': 'UPI', total: '$2499', items: 3, status: 'Completed' },
    { 'order id': 'ORD1234', date: '10 June 2025', customer: 'John Doe', 'payment method': 'UPI', total: '$2499', items: 3, status: 'Completed' },
    { 'order id': 'ORD1234', date: '10 June 2025', customer: 'John Doe', 'payment method': 'COD', total: '$2499', items: 3, status: 'Pending' },
    { 'order id': 'ORD1234', date: '10 June 2025', customer: 'John Doe', 'payment method': 'Credit Card', total: '$2499', items: 3, status: 'Canceled' },
]

export function useOrder() {


    const filteredOrders = computed(() => {
        return allOrders.value.filter(order => {
            const matchesSearch =
                order.productName.toLowerCase().includes(search.value.toLowerCase()) ||
                order.id.toLowerCase().includes(search.value.toLowerCase())
            const matchesStatus = status.value ? order.status === status.value : true
            return matchesSearch && matchesStatus
        })
    })

    const totalPages = computed(() =>
        Math.ceil(filteredOrders.value.length / pageSize)
    )

    const paginatedOrders = computed(() => {
        const start = (currentPage.value - 1) * pageSize
        return filteredOrders.value.slice(start, start + pageSize)
    })

    const openDialog = () => {
        isOpen.value = true
    }

    const closeDialog = () => {
        isOpen.value = false
    }

    const openViewDialog = (order: any) => {
        selected.value = order
        isView.value = true
    }

    const closeViewDialog = () => {
        isView.value = false
        selected.value = null
    }

    return {
        isOpen,
        isView,
        selected,
        search,
        status,
        currentPage,
        pageSize,
        allOrders,
        filteredOrders,
        totalPages,
        paginatedOrders,
        columns,
        rows,
        openDialog,
        closeDialog,
        openViewDialog,
        closeViewDialog
    }
}
