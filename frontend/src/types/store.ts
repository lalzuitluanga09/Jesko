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
    followers: number,
    rating: number,
    social_links: {
        id: number,
        name: string,
        url: string
    }[]
}


export type { Store };