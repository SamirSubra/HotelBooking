"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyHotel = exports.createHotel = exports.getAllHotels = void 0;
const hotel_1 = require("../models/hotel");
const fs = require("fs");
const getAllHotels = (req, res) => {
    console.log("All hotels reading");
    hotel_1.default.find().then((hotels) => {
        res.status(200).json(hotels);
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};
exports.getAllHotels = getAllHotels;
const createHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description = '', location, equipments = '', price, stars } = req.body;
        const images = req.files.map(file => `/uploads/${file.filename}`);
        const hotel = new hotel_1.default({
            name,
            description,
            location,
            equipments,
            price,
            stars,
            images,
        });
        yield hotel.save();
        console.log("New hotel created:", hotel);
        res.status(201).json({ success: true, message: 'Hotel created successfully', hotel });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in createHotel:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            console.error("Unexpected error in createHotel:", error);
            res.status(500).json({ success: false, error: 'An unexpected error occurredd.' });
        }
    }
});
exports.createHotel = createHotel;
exports.deleteHotel = (req, res) => {
    console.log("Hotel deletion");
    // Find the hotel by the ID provided in the request parameters
    hotel_1.default.findOne({ _id: req.params.id })
        .then((hotel) => {
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found!" });
        }
        // Delete each image associated with the hotel
        const imageDeletions = hotel.images.map((imagePath) => {
            const filename = imagePath.split('/uploads/')[1];
            return new Promise((resolve, reject) => {
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
            return hotel_1.default.deleteOne({ _id: req.params.id });
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
exports.getHotel = (req, res) => {
    console.log("Hotel reading");
    hotel_1.default.findOne({
        _id: req.params.id
    }).then((hotel) => {
        res.status(200).json(hotel);
        console.log(hotel);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};
const modifyHotel = (req, res) => {
    console.log("Hotel modification");
    console.log("req.body : " + JSON.stringify(req.body));
    // Initialize the hotel object
    let hotelObject;
    if (req.files) {
        // If files are uploaded, handle image updates
        const images = req.files.map(file => `/uploads/${file.filename}`);
        hotelObject = Object.assign(Object.assign({}, req.body), { images });
    }
    else {
        // If no new files are uploaded, keep existing data
        hotelObject = Object.assign({}, req.body);
    }
    hotel_1.default.findOne({ _id: req.params.id })
        .then((existingHotel) => {
        if (!existingHotel) {
            console.log('Hotel not found!');
            return res.status(404).json({ message: 'Hotel not found!' });
        }
        // Handle the deletion of old images if new ones are uploaded
        if (req.files && existingHotel.images.length > 0) {
            const imageDeletions = existingHotel.images.map((imagePath) => {
                const filename = imagePath.split('/uploads/')[1];
                return new Promise((resolve, reject) => {
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
        hotel_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, hotelObject), { _id: req.params.id }))
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
exports.modifyHotel = modifyHotel;
