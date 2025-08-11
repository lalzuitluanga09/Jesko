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
    images: ItemImage [],
    related_items: MarketplaceItem []
}

interface ItemImage {
    id: number | string
    file?: File
    position: number,
    image_url: string,
    preview_url?: string
}


interface MarketplaceItemForm {
    item: {
        id: number | null,
        title: string
        description: string
        price: number
        condition: string
        category_id: number | null
        location_id: number | null
        tags: string
        status: string
    }
    images: ItemImage []
}



export type { MarketplaceProduct, MarketplaceItem, MarketplaceProductData, MarketplaceItemForm, ItemImage };