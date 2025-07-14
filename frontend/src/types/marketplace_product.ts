interface MarketplaceProduct {
    id: number
    user_id: number
    title: string
    description: string
    price: number
    discounted_price: number | null
    condition: string
    category_id: number
    location_id: number
    tags: string
    status: string
}

interface MarketplaceItem {
    id: number
    title: string
    price: number
    discounted_price: number | null,
    image_url: string | null
}


interface MarketplaceProductData {
    item: MarketplaceProduct | null
    images: string [],
    related_items: MarketplaceItem []
}

export type { MarketplaceProduct, MarketplaceItem, MarketplaceProductData };