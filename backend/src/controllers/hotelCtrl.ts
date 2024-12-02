import Hotel from '../models/hotel';
import {Request, Response} from 'express';

export const getAllHotels  = (req: Request, res: Response) => {
    const hotel = new Hotel({
        name: "hotel",
        location: "mamoudzou",
        stars: 4,
        imageSrc: "test",
    });
    Hotel.find() // Mongoose method searching documents from the "hotels" collection
        // .then((hotels)  => {res.status(200).json(hotels)})
        .then((hotels)  => {res.status(200).json(hotel)})
        .catch((err: Error) => {res.status(400).json({error: err})})
}