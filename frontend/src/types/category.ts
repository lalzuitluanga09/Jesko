interface Category {
    id: number
    name: string
    slug: string
    parent_id?: number
    productsCount?: number
}


export type { Category };