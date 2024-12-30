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
exports.createHotel = exports.getAllHotels = void 0;
const hotel_1 = require("../models/hotel");
const fs = require("fs");
const getAllHotels = (req, res) => {
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
        res.status(201).json({ success: true, message: 'Hotel created successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in createHotel:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            console.error("Unexpected error in createHotel:", error);
            res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
        }
    }
});
exports.createHotel = createHotel;
exports.deleteHotel = (req, res) => {
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
    hotel_1.default.findOne({
        _id: req.params.id
    }).then((hotel) => {
        res.status(200).json(hotel);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};
exports.modifyHotel = (req, res) => {
    const hotelObject = req.file ? Object.assign(Object.assign({}, JSON.parse(req.body.thing)), { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }) : Object.assign({}, req.body);
    delete hotelObject._userId;
    hotel_1.default.findOne({ _id: req.params.id })
        .then((thing) => {
        hotel_1.default.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, hotelObject), { _id: req.params.id }))
            .then(() => res.status(200).json({ message: 'Hotel modified!' }))
            .catch(error => res.status(401).json({ error }));
    })
        .catch((error) => {
        res.status(400).json({ error });
    });
};
