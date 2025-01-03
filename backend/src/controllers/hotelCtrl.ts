import Hotel from '../models/hotel';
import {Request, Response} from 'express';
import * as fs from "fs";

export const getAllHotels = (req: Request, res: Response) => {
    console.log("All hotel reading");
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
        const { name, description, location, roomTypes, options, price, stars } = req.body;
        const images = (req.files as Express.Multer.File[]).map(file => `/hotels/uploads/${file.filename}`);

        const hotel = new Hotel({
            name,
            description,
            location,
            roomTypes,
            options,
            price,
            stars,
            images,
        });

        await hotel.save();

        console.log("New hotel created:", hotel);
        res.status(201).json({ success: true, message: 'Hotel created successfully', hotel });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in createHotel:", error.message);
            res.status(500).json({ success: false, error: error.message });
        } else {
            console.error("Unexpected error in createHotel:", error);
            res.status(500).json({ success: false, error: 'An unexpected error occurredd.' });
        }
    }
};




exports.deleteHotel = (req: Request, res: Response) => {
    console.log("Hotel deletion");
    // Find the hotel by the ID provided in the request parameters
    Hotel.findOne({ _id: req.params.id })
        .then((hotel) => {
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found!" });
            }

            // Delete each image associated with the hotel
            const imageDeletions = hotel.images.map((imagePath) => {
                const filename = imagePath.split('/hotels/uploads/')[1];
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
                    console.log("Hotel deleted");
                    console.log(hotel);
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
    console.log("Hotel reading");
    Hotel.findOne({
        _id: req.params.id
    }).then(
        (hotel) => {
            res.status(200).json(hotel);
            console.log(hotel);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


export const modifyHotel = (req: Request, res: Response) => {
    console.log("Hotel modification");
    // Initialize the hotel object
    let hotelObject: any;

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        // If files are uploaded, handle image updates
        console.log("req.files -->" + req.files);
        const images = (req.files as Express.Multer.File[]).map(file => `/hotels/uploads/${file.filename}`);
        hotelObject = {
            ...req.body,
            images,
        };
    } else {
        // If no new files are uploaded, keep existing data
        hotelObject = { ...req.body };
    }

    Hotel.findOne({ _id: req.params.id })
        .then((existingHotel) => {
            if (!existingHotel) {
                console.log('Hotel not found!');
                return res.status(404).json({ message: 'Hotel not found!' });
            }

            // Handle the deletion of old images if new ones are uploaded
            if (req.files && Array.isArray(req.files) && req.files.length > 0  && existingHotel.images.length > 0) {
                const imageDeletions = existingHotel.images.map((imagePath) => {
                    const filename = imagePath.split('/hotels/uploads/')[1];
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

                // Wait until all old images are deleted
                Promise.all(imageDeletions)
                    .catch((error) => console.error('Error deleting old images:', error));
            }

            // Update the hotel with the new data
            Hotel.updateOne({ _id: req.params.id }, { ...hotelObject, _id: req.params.id })
                .then(() => {
                    res.status(200).json({ message: 'Hotel modified!' });
                    console.log('Hotel modified!');
                    console.log(hotelObject);
                })

                .catch((error) => {
                    console.error('Error updating hotel:', error);
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            console.error('Error finding hotel:', error);
            res.status(500).json({ error });
        });
};