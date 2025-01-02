"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    roomTypes: { type: [String], required: true },
    options: { type: [String], required: true },
    price: { type: Number, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    images: { type: [String], required: true },
});
const Hotel = mongoose_1.default.model("Hotel", hotelSchema);
exports.default = Hotel;
