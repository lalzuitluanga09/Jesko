interface Product {
    id: number
    name: string
    description: string
    price: number
    discount_price?: number
    discount?: {
      name: string
      type: string
      value: number
      rules: {
        bogoX: number
        bogoY: number
      }
    }
    isSale?: boolean
    badge?: string
    stock: number
    sku: string,
    parent_id?: number
    status: string,
    type: string,
    created_at?: Date,
    category_ids?: number[]
    tag_ids?: number[]
    default_image_url?: string,
    store_slug?: string,
    theme?: string
}

interface VariationAttributes {
  [key: string]: string;
}

interface ProductVariation {
  id: number;
  price: string;
  discount_price?: string;
  stock: number;
  sku: string | null;
  attributes: VariationAttributes;
}


export type { Product, ProductVariation, VariationAttributes };