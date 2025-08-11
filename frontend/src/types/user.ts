interface User {
    id: number,
    name: string
    email: string,
    phone: number,
    role: string,
    status: string,
    date_of_birth?: Date,
    gender?: string,
    profile_image?: string | null,
}

interface UserStore {
    id: number,
    role: string,
    status: string,
    joined_at: Date,
    store: {
        id: number,
        name: string,
        slug: string,
        logo: string
    }
}

interface UserMeta {
    followings: number[],
    cart_items: number[],
    wishlists: number []
}

export type { User, UserStore, UserMeta };