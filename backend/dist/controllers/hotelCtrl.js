"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHotels = void 0;
const hotel_1 = require("../models/hotel");
const getAllHotels = (req, res) => {
    const hotel = new hotel_1.default({
        name: "hotel",
        location: "mamoudzou",
        stars: 4,
        imageSrc: "test",
    });
    hotel_1.default.find() // Mongoose method searching documents from the "hotels" collection
        // .then((hotels)  => {res.status(200).json(hotels)})
        .then((hotels) => { res.status(200).json(hotel); })
        .catch((err) => { res.status(400).json({ error: err }); });
};
exports.getAllHotels = getAllHotels;
