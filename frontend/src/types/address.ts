interface Address {
    id: number;
    user_id: number;
    label: string;
    name: string;
    phone: number | null;
    address: string;
    landmark?: string;
    district_id: number;
    postal_code: string;
    city: string;
    is_default: boolean;
    cityId?: number;
    stateId?: number;
    countryId?: number;
}

export type { Address };
