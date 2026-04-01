interface CartItem {
  id: number
  parent_id: number | null
  product_id: number
  store_id: number
  quantity: number
  stock: number
  price_at_addition: number
  product_name?: string
  product_image?: string
  product_price?: number,
  product_categories?: string []
  discount?: {
    name: string
    type: string
    value: number,
    bogo?: {
      bogoX: number
      bogoY: number
    }
  }
  discount_price?: number
}

interface GroupedItems {
  store_id: number
  store_name: string
  store_slug: string
  store_theme: string
  items: CartItem[]
}

interface Cart {
  id: number
  status: string
  items: GroupedItems[]
}

export type { Cart, GroupedItems, CartItem };