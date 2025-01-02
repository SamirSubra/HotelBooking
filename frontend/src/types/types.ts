export interface HotelProps {
    _id?: string; //Optional, because it does not exist before creation
    name: string;
    description: string;
    location: string;
    roomTypes: string[];
    options: string[];
    price: number;
    stars: number;
    images: string[];
}