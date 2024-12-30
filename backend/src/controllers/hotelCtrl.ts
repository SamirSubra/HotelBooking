import Hotel from '../models/hotel';
import {Request, Response} from 'express';
import * as fs from "fs";

export const getAllHotels = (req: Request, res: Response) => {
    Hotel.find().then(
        (hotels) => {
            res.status(200).json(hotels);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

export const createHotel = async (req: Request, res: Response) => {
    try {
        const { name, description = '', location, equipments = '', price, stars } = req.body;
        const images = (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`);

        const hotel = new Hotel({
            name,
            description,
            location,
            equipments,
            price,
            stars,
            images,
        });

        await hotel.save();
        res.status(201).json({ success: true, message: 'Hotel created successfully' });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in createHotel:", error.message);
            res.status(500).json({ success: false, error: error.message });
        } else {
            console.error("Unexpected error in createHotel:", error);
            res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
        }
    }
};




exports.deleteHotel = (req: Request, res: Response) => {
    // Find the hotel by the ID provided in the request parameters
    Hotel.findOne({ _id: req.params.id })
        .then((hotel) => {
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found!" });
            }

            // Delete each image associated with the hotel
            const imageDeletions = hotel.images.map((imagePath) => {
                const filename = imagePath.split('/uploads/')[1];
                return new Promise<void>((resolve, reject) => {
                    fs.unlink(`backend/images/${filename}`, (err) => {
                        if (err) {
                            console.error(`Failed to delete file ${filename}:`, err);
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            // Wait until all images are deleted
            Promise.all(imageDeletions)
                .then(() => {
                    // Delete the hotel from the database
                    return Hotel.deleteOne({ _id: req.params.id });
                })
                .then(() => {
                    res.status(200).json({ message: "Hotel deleted!" });
                })
                .catch((error) => {
                    console.error("Error during deletion:", error);
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            console.error("Error finding hotel:", error);
            res.status(500).json({ error });
        });
};


exports.getHotel = (req: Request, res : Response) => {
    Hotel.findOne({
        _id: req.params.id
    }).then(
        (hotel) => {
            res.status(200).json(hotel);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


exports.modifyHotel = (req: Request, res: Response) => {
    const hotelObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete hotelObject._userId;
    Hotel.findOne({_id: req.params.id})
        .then((thing) => {
                Hotel.updateOne({ _id: req.params.id}, { ...hotelObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Hotel modified!'}))
                    .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};