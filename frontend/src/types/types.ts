export interface HotelProps {
    _id?: string; //Optional, because it does not exist before creation
    name: string;
    description?: string;
    location: string;
    equipments?: string[];
    price: number;
    stars: number;
    images: string[];
}