interface CartItem {
  id: number
  product_id: number
  store_id: number
  quantity: number
  price_at_addition: number
  product_name?: string
  product_image?: string
  product_price?: number,
  product_categories?: string []
}

interface GroupedItems {
  store_id: number
  store_name: string
  store_slug: string
  items: CartItem[]
}

interface Cart {
  id: number
  status: string
  subTotal: number
  tax: number
  discount: number
  total: number
  items: GroupedItems[]
}

export type { Cart, GroupedItems, CartItem };