
type OfferLocation = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type CityOffer = {
    name: string;
    location: OfferLocation;
}

export type HostAuthor = {
    id: string;
    username: string;
    email: string;
    userType: string;
    avatar: string;
};

export type FullOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: CityOffer;
    location: OfferLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    rooms: number;
    guests: number;
    features: string[];
    author?: HostAuthor;
    photos?: string[];
    previewImage?: string;
    commentsCount?: number;
    publishDate?: string;
    
    // Legacy mock fields (for backward compatibility)
    host?: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    images?: string[];
    bedrooms?: number;
    goods?: string[];
    maxAdults?: number;
};

export type OffersList = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: CityOffer;
    location: OfferLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
};