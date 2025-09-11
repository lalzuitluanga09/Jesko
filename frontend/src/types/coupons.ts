interface Coupon {
  id: number
  store_id: number
  code: string
  description: string
  discountType: string
  discountValue: number
  minOrderValue: number
  maxDiscountValue: number
  usageLimit: number
  perUserLimit: number
  usedCount: number
  startAt: Date
  endAt: Date
  status: string
}

interface UserCoupon {
  id: number
  store_id: number
  code: string
  discountType: string
  discountValue: number
  minOrderValue: number
  maxDiscountValue: number
  usageLimit: number
  perUserLimit: number
  usedCount: number
  status: string
  usageCount: number
}

export type { Coupon, UserCoupon };