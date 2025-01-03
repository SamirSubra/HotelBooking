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


export interface UserProps {
    firstName: string;
    lastName: string;
    age: number;
    username: string;
    password: string;
    profilePhoto: string;
}