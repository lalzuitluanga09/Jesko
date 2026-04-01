import { adminApi, api } from '@/lib/axios'
import type { Pagination } from '@/types/pagination'
import { computed, ref, watch } from 'vue'
import { useAdmin } from './useAdmin'
import type { Coupon, UserCoupon } from '@/types/coupons'
import { useNotify } from './useNotify'
import { useConfirmDialog } from './useConfirmDialog'
import { debounce } from 'lodash-es'
import { useCartStore } from '@/stores/cart'

const loading = ref<boolean>(false)
const loadingData = ref<boolean>(false)
const isCheckingCoupon = ref<boolean>(false)
const addDialogOpen = ref<boolean>(false)
const isView = ref<boolean>(false)

const { storeSlug } = useAdmin()
const { isOpen, itemId } = useConfirmDialog()

const cart = useCartStore()

const coupons = ref<Coupon[]>([])
const selectedCoupon = ref<Coupon | null>(null)

//User Side
const couponCode = ref<string>('')
const isCouponFound = ref<boolean | null>(null)
const matchCoupons = ref<UserCoupon[]>([])
const appliedCoupons = ref<{
  id: number
  store_id: number
  code: string
}[]>([])

const couponDiscounts = ref<Record<number, number>>({})


const {
  notifySuccess,
  notifyError
} = useNotify()

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

const typeOptions = [
  { label: 'Percentage', value: 'percentage' },
  { label: 'Fixed', value: 'fixed' },
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Expired', value: 'expired' },
]

const pagination = ref<Pagination>({
  current_page: 0,
  from: 0,
  last_page: 0,
  per_page: 0,
  to: 0,
  total: 0,
})

const couponForm = ref<{
  code: string
  description: string
  discountType: string
  discountValue: number
  minOrderValue: number
  maxDiscountValue: number
  usageLimit: number
  perUserLimit: number
  usedCount?: number
  startAt: Date | null
  endAt: Date | null
}>({
  code: '',
  description: '',
  discountType: '',
  discountValue: 0,
  minOrderValue: 0,
  maxDiscountValue: 0,
  usageLimit: 0,
  perUserLimit: 0,
  startAt: null,
  endAt: null,
})

export function useCoupon() {

  const openAddDialog = () => {
    selectedCoupon.value = null
    addDialogOpen.value = true
  }

  const closeAddDialog = () => {
    addDialogOpen.value = false
    resetForm()
  }

  const openEditDialog = (coupon: Coupon) => {
    selectedCoupon.value = coupon
    couponForm.value = {
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderValue: coupon.minOrderValue,
      maxDiscountValue: coupon.maxDiscountValue,
      usageLimit: coupon.usageLimit,
      perUserLimit: coupon.perUserLimit,
      usedCount: coupon.usedCount,
      startAt: coupon.startAt ? new Date(coupon.startAt) : null,
      endAt: coupon.endAt ? new Date(coupon.endAt) : null,
    }
    addDialogOpen.value = true
  }

  const openViewDialog = (coupon: Coupon) => {
    selectedCoupon.value = coupon
    isView.value = true
  }

  const closeViewDialog = () => {
    isView.value = false
  }


  const getCoupons = async (page: number = 1) => {
    loadingData.value = true
    try {
      const res = await adminApi.get(`/${storeSlug.value}/coupons`, {
        params: {
          page: page,
          searchTerm: filter.value.searchTerm,
          type: filter.value.type,
          status: filter.value.status,
          from: filter.value.from,
          to: filter.value.to,
        },
      })
      coupons.value = res.data.coupons.data
      pagination.value.current_page = res.data.coupons.current_page
      pagination.value.from = res.data.coupons.from
      pagination.value.last_page = res.data.coupons.last_page
      pagination.value.per_page = res.data.coupons.per_page
      pagination.value.to = res.data.coupons.to
      pagination.value.total = res.data.coupons.total
    } catch (error) {
      notifyError('Error fetching data')
      console.log(error)
    } finally {
      loadingData.value = false
    }
  }

  const save = async () => {
    if (!checkFormValidity()) return
    loading.value = true
    try {
      await adminApi.post(`/${storeSlug.value}/coupons`, couponForm.value)
      notifySuccess('New Coupon created')
      closeAddDialog()
      getCoupons()
    } catch (error) {
      notifyError('Error adding coupon')
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  const checkFormValidity = (): boolean => {
    const form = couponForm.value

    if (!form.code.trim()) {
      notifyError('Code cannot be null or empty')
      return false
    }

    if (form.startAt && form.endAt && form.startAt > form.endAt) {
      notifyError('Start date cannot be greater than end date')
      return false
    }

    if (form.discountValue <= 0) {
      notifyError('Discount value must be greater than zero')
      return false
    }

    if (form.usageLimit < 0) {
      notifyError('Total uses cannot be negative')
      return false
    }

    if (form.perUserLimit < 0) {
      notifyError('Per user limit cannot be negative')
      return false
    }

    if (form.minOrderValue < 0) {
      notifyError('Minimum order value cannot be negative')
      return false
    }

    if (form.maxDiscountValue < 0) {
      notifyError('Maximum discount value cannot be negative')
      return false
    }

    return true
  }

  const update = async () => {
    loading.value = true
    try {
      await adminApi.put(`/${storeSlug.value}/coupons/${selectedCoupon.value?.id}`, couponForm.value);
      notifySuccess('Updated Successfully')
      closeAddDialog()
      getCoupons()
    } catch (error) {
      notifyError('Unable to update')
      console.log(error)
    }
  }

  const deleteCoupon = async () => {
    try {
      await adminApi.delete(`/${storeSlug.value}/coupons/${itemId.value}`)
      isOpen.value = false
      notifySuccess('Deleted successfully')
      getCoupons()
    } catch (error) {
      notifyError('Cannot delete item')
      console.log(error)
    }
  }

  const clearFilters = () => {
    filter.value.searchTerm = ''
    filter.value.type = ''
    filter.value.status = ''
    filter.value.from = null
    filter.value.to = null
  }

  const resetForm = () => {
    couponForm.value = {
      code: '',
      description: '',
      discountType: '',
      discountValue: 0,
      minOrderValue: 0,
      maxDiscountValue: 0,
      usageLimit: 0,
      perUserLimit: 0,
      startAt: null,
      endAt: null,
    }
  }

  const debouncedGetPayments = debounce(() => {
    if (!loadingData.value)
      getCoupons()
  }, 300)

  watch(
    [() => filter.value.from, () => filter.value.to, () => filter.value.status, () => filter.value.type, () => filter.value.searchTerm],
    debouncedGetPayments
  )


  const checkCoupon = async () => {
    if (!couponCode.value.trim()) {
      notifyError("Please enter code")
      return
    }
    isCheckingCoupon.value = true
    const storeIds = cart.getStoreIds()
    try {
      const { data } = await api.post("/checkout/check-coupon", {
        code: couponCode.value,
        storeIds: storeIds
      })
      if (data.valid) {
        matchCoupons.value = data.coupons
        isCouponFound.value = true
        couponCode.value = ''
      } else {
        isCouponFound.value = false
        matchCoupons.value = []
        notifyError(data.message || "Invalid or expired coupon")
      }
      console.log("Coupon Check Response:", data)
      delayCouponMessage()
    } catch (err) {
      notifyError("Something went wrong")
      console.log(err)
    } finally {
      isCheckingCoupon.value = false
    }
  }

  const delayCouponMessage = debounce(() => {
    if (isCouponFound.value) {
      applyCoupon(matchCoupons.value[0])
    }
    isCouponFound.value = null
  }, 1000)

  const applyCoupon = (coupon: UserCoupon) => {

    if (!cart) return

    const storeGroup = cart.cart?.items?.find(
      (group) => group.store_id === coupon.store_id
    )

    if (!storeGroup) return

    const storeSubtotal = storeGroup.items.reduce((sum, item) => {
      const basePrice = item.discount_price ?? item.price_at_addition
      return sum + basePrice * item.quantity
    }, 0)

    if (storeSubtotal < coupon.minOrderValue) {
      notifyError('Minimum order value for this coupon is ₹ ' + coupon.minOrderValue)
      return
    }

    let discount = 0
    if (coupon.discountType === "percentage") {
      discount = (storeSubtotal * coupon.discountValue) / 100
    } else if (coupon.discountType === "fixed") {
      discount = coupon.discountValue
    }

    if (coupon.maxDiscountValue && discount > coupon.maxDiscountValue) {
      discount = coupon.maxDiscountValue
    }

    appliedCoupons.value.push({
      id: coupon.id,
      store_id: coupon.store_id,
      code: coupon.code
    })

    couponDiscounts.value[coupon.store_id] = discount
  }

  const additionDiscount = computed(() => {
    const total = Object.values(couponDiscounts.value).reduce(
      (a, b) => a + Number(b), 
      0
    )
    return Number(total.toFixed(2))
  })


  const removeCoupon = (couponId: number) => {
    const coupon = appliedCoupons.value.find(c => c.id === couponId)
    if (!coupon) return

    delete couponDiscounts.value[coupon.store_id]

    appliedCoupons.value = appliedCoupons.value.filter(
      (c) => c.id !== couponId
    )
  }


  return {
    additionDiscount,
    typeOptions,
    statusOptions,
    loading,
    loadingData,
    addDialogOpen,
    isView,
    pagination,
    filter,
    couponForm,
    coupons,
    selectedCoupon,
    couponCode,
    matchCoupons,
    isCouponFound,
    isCheckingCoupon,
    appliedCoupons,
    removeCoupon,
    checkCoupon,
    openAddDialog,
    closeAddDialog,
    openEditDialog,
    openViewDialog,
    closeViewDialog,
    getCoupons,
    save,
    update,
    deleteCoupon,
    clearFilters
  }
}
