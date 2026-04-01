import { ref } from 'vue'
import { defineStore } from 'pinia'
import { adminApi } from '@/lib/axios'
import { useAdmin } from '@/composables/useAdmin'
import { useNotify } from '@/composables/useNotify'

const loading = ref<boolean>(false)
const filter = ref<string>(' ')


const { storeSlug } = useAdmin()
const { notifyError } = useNotify()

const meta = ref<{
    total_sales: number;
    pending_orders: number;
    current_stock_value: number;
    total_products: number;
}>({
    total_sales: 0,
    pending_orders: 0,
    current_stock_value: 0,
    total_products: 0
})

const pendingOrders = ref<{
    order_id: number;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
}[]>([])

const topSellingProducts = ref<{
    id: number;
    name: string;
    price: number;
    total_sold: number;
}[]>([])

const lowStockProducts = ref<{
    id: number;
    name: string;
    stock: number;
}[]>([])

const salesCategoryData = ref<{
    category: string;
    total_sales: number;
}[]>([])

const salesData = ref<{
    label: string;
    total_sales: number;
}[]>([])

export const useDashboard = defineStore('dashboard', () => {
    
    const fetchData = async (filterValue: string = 'today') => {
        try {
            const res = await adminApi.get(`/${storeSlug.value}/dashboard`, {
                params: {
                    filter: filterValue
                }
            });
            filter.value = filterValue
            meta.value.total_sales = res.data.total_sales
            meta.value.pending_orders = res.data.pending_orders
            meta.value.current_stock_value = res.data.current_stock_value
            meta.value.total_products = res.data.total_products
            pendingOrders.value = res.data.pending_orders_list
            topSellingProducts.value = res.data.top_selling_products
            lowStockProducts.value = res.data.low_stock_products
            salesCategoryData.value = res.data.sales_by_category
            salesData.value = res.data.sales_data
        } catch (error) {
            notifyError('Error fetching data')
            console.log(error)
        } finally {
            loading.value = false
        }       
  }

  return {
     meta, 
     pendingOrders,
     topSellingProducts,
     lowStockProducts,
     salesCategoryData,
     salesData,
     filter,
     fetchData,
   }
})
