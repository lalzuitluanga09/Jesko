import { ref, computed } from 'vue'

const isOpen = ref<boolean>(false)
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

    return {
        isOpen,
        search,
        status,
        currentPage,
        pageSize,
        allOrders,
        filteredOrders,
        totalPages,
        paginatedOrders,
        openDialog,
        closeDialog
    }
}
