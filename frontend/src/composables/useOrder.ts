import { type MyOrder, type OrderList } from '@/types/order'
import { ref, watch } from 'vue'
import { useNotify } from './useNotify'
import { useAdmin } from './useAdmin'
import { adminApi, api } from '@/lib/axios'
import type { Pagination } from '@/types/pagination'
import { debounce } from 'lodash-es'
import { useCartStore } from '@/stores/cart'
import { useAddress } from './useAddress'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useCoupon } from './useCoupon'

const {
    notifySuccess,
    notifyError,
    notifyWarning
} = useNotify()

const { storeSlug } = useAdmin()
const { deliveryAddress } = useAddress()
const { appliedCoupons } = useCoupon()

const auth = useAuthStore()
const cart = useCartStore()

const isOpen = ref<boolean>(false)
const isView = ref<boolean>(false)

const confirmDialogOpen = ref<boolean>(false)
const isOrderConfirmed = ref<boolean>(false)
const placingOrder = ref<boolean>(false)

const myOrders = ref<MyOrder []>([])
const selectedOrder = ref<MyOrder | null>(null)

const paymentMode = ref("")

const isDialogOpen = ref<boolean>(false)

const selected = ref<OrderList | null>(null)

const loading = ref<boolean>(false)
const loadingData = ref<boolean>(false)

const selectedStatus = ref<string>('')
const orders = ref<OrderList []>([])

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
    status: string
    from: Date | null,
    to: Date | null
}>({
    searchTerm: '',
    status: '',
    from: null,
    to: null
})

const orderFilter = ref<{
    searchTerm: string,
    status: string
}>({
    searchTerm: '',
    status: '',
})

const statusOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refuned', value: 'refunded' },
]

const orderStatus = ref<string[]>([])

const steps = [
  { key: 'pending', label: 'Pending' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
]

export function useOrder() {

  const updateOrderStatus = () => {
    const current = selectedOrder.value?.data.status
    if (!current) return

    const currentIndex = steps.findIndex(step => step.key === current)
    orderStatus.value = steps.slice(0, currentIndex + 1).map(step => step.key)
  }

    const openDialog = (order: MyOrder) => {
      selectedOrder.value = order
        isOpen.value = true
    }

    const closeDialog = () => {
        isOpen.value = false
    }

    const openViewDialog = (order: OrderList) => {
        selected.value = order
        isView.value = true
    }

    const closeViewDialog = () => {
        isView.value = false
        selected.value = null
    }

      const getData = async (page: number = 1) => {
        loadingData.value = true
        try {
            const res = await adminApi.get(`/${storeSlug.value}/orders`, {
                params: {
                    page: page,
                    searchTerm: filter.value.searchTerm,
                    status: filter.value.status,
                    from: filter.value.from,
                    to: filter.value.to
                }
            });
            orders.value = res.data.data
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

        const debouncedGetData = debounce(() => {
            if(!loadingData.value)
                getData()
        }, 300)

        watch(
        [() => filter.value.from, () => filter.value.to, () => filter.value.status, () => filter.value.searchTerm],
        debouncedGetData
        )

      const clearFilter = () => {
        filter.value = {
            searchTerm: '',
            status: '',
            from: null,
            to: null
        }
      }

      const openUpdateDialog = (item: OrderList) => {
        selected.value = item
        selectedStatus.value = selected.value.data.status
        isDialogOpen.value = true
      }

      const updateStatus = async() => {
          loading.value = true
          try {
            await adminApi.put(`/${storeSlug.value}/orders/${selected.value?.data.id}`, {
              status: selectedStatus.value 
            });
            notifySuccess('Updated Successfully')
            closeUpdateDialog()
            getData()
          } catch (error) {
            notifyError('Unable to update')
            console.log(error)
          } finally {
            loading.value = false
          }
      }

      const closeUpdateDialog = () => {
        isDialogOpen.value = false
        selected.value = null
      }

      const openConfirmDialog = () => {
        if(!deliveryAddress.value) {
          notifyWarning('Please update your delivery address')
          return
        } else if (!paymentMode.value) {
          notifyWarning('Please select a payment mode')
          return
        }
        confirmDialogOpen.value = true
      }

      const placeOrder = async () => {
          placingOrder.value = true
          try {
              await api.post(`/place_order`, {
                  items: getCartItems(),
                  paymentMode: paymentMode.value,
                  deliveryAddress: deliveryAddress.value?.id,
                  appliedCoupons: appliedCoupons.value
              })
              notifySuccess('Order placed successfully')
              isOrderConfirmed.value = true
          } catch (error) {
              notifyError('Error placing order')
              console.log(error)
          } finally {
              // placingOrder.value = false
              setTimeout(() => {
                placingOrder.value = false
              }, 700)
          }
      }

    const getCartItems = () => {
      return cart.cart?.items.map(store => ({
        store_id: store.store_id,
        items: store.items.map(item => ({
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_addition: item.price_at_addition,
          discount_price: item.discount_price,
          discount_snapshot: item.discount,
          bogoX: item.discount?.bogo?.bogoX,
          bogoY: item.discount?.bogo?.bogoY,
        })),
      })) ?? [];
    };

    const goToCart = () => {
        router.push({ name: 'cart' })
        confirmDialogOpen.value = false
        isOrderConfirmed.value = false
    }

    const goToMyOrders = () => {
      router.push({ name: 'orders' })
      confirmDialogOpen.value = false
      isOrderConfirmed.value = false
    }


    const getOrders = async (page: number = 1) => {
        loading.value = true
        try {
            const res = await api.get('/orders/', {
                params: {
                    page: page,
                    searchTerm: orderFilter.value.searchTerm,
                    status: orderFilter.value.status
                }
            });
            myOrders.value = res.data.data.data
            pagination.value.current_page = res.data.data.current_page
            pagination.value.from = res.data.data.from
            pagination.value.last_page = res.data.data.last_page
            pagination.value.per_page = res.data.data.per_page
            pagination.value.to = res.data.data.to
            pagination.value.total = res.data.data.total
            auth.userMeta.pendingOrders = res.data.pendingCount
        } catch (error) {
          notifyError('Error fetching data')
          console.log(error)
        } finally {
          loading.value = false
        }
      }

    return {
        isOpen,
        isView,
        selected,
        orders,
        pagination,
        filter,
        isDialogOpen,
        statusOptions,
        selectedStatus,
        paymentMode,
        confirmDialogOpen,
        isOrderConfirmed,
        placingOrder,
        myOrders,
        selectedOrder,
        orderStatus,
        steps,
        orderFilter,
        loading,
        loadingData,
        clearFilter,
        openDialog,
        closeDialog,
        openViewDialog,
        closeViewDialog,
        getData,
        updateStatus,
        closeUpdateDialog,
        openUpdateDialog,
        openConfirmDialog,
        placeOrder,
        goToCart,
        goToMyOrders,
        getOrders,
        updateOrderStatus
    }
}
