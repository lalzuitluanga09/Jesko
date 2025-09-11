import type { Store } from "./store"
import type { User } from "./user"

interface Order {
  id: number
  user_id: number
  store_id: number
  order_number: string
  status: string
  subtotal: number,
  tax: number,
  shipping_fee: number,
  discount: number,
  coupon_discount: number
  total: number,
  note: string,
  placed_at: Date,
}

interface OrderItem {
    id: number,
    order_id: number,
    product_id: number,
    quantity: number,
    unit_price: number,
    total_price: number,
    product_name: string,
    paid_quantity: number,
    free_quantity: number
}

interface OrderAddress {
  id: number,
  type: string,
  label: string,
  name: string,
  phone: string,
  address: string,
  landmark: string,
  postal_code: string,
  district: string,
  city: string,
  state: string,
  country: string
}

interface OrderPayment {
  id: number,
  payment_mode: string,
  status: string
}

interface OrderList {
   data: Order,
    customer: User,
    store: Store,
    orderItems: OrderItem [],
    billingAddress: OrderAddress,
    shippingAddress: OrderAddress,
    payment: OrderPayment
}

interface MyOrder {
  data: Order,
  orderItems: OrderItem[],
  billingAddress: OrderAddress,
  shippingAddress: OrderAddress,
  payment: OrderPayment,
  store: {
    id: number,
    name: string,
    slug: string
  }
}

export type { Order, OrderItem, OrderList, OrderAddress, MyOrder, OrderPayment };