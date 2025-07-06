interface Product {
    id: number
    name: string
    description: string
    price: number
    stock: number
    sku: string,
    parent_id?: number
    status: string,
    type: string,
    category_ids?: string[]
    tag_ids?: string[]
}


export type { Product };