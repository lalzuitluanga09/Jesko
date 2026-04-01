interface Store {
    id: number
    name: string,
    slug: string,
    logo: string,
    description: string
    cover_image: string,
    is_published: boolean,
    is_featured: boolean,
    launch_at: Date,
    category_id: number
    theme_id?: number
    followers_count: number,
    products_count: number,
    ratings: number,
    theme?: string,
    owner: {
        name: string
        phone: string
    }
    location: {
        id: number,
        name: string,
    }
    active_sale: string
    sale? : {
        type: string,
        value: number
    }
    isNew: boolean
}

interface StoreCategory {
    id: number,
    name: string,
    slug: string,
    icon: string,
    is_active: boolean,
    parent_id: number
}


export type { Store, StoreCategory };