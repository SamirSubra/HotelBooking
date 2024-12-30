import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    location: {type: String, required: true},
    equipments: {type: [String], required: false},
    price: {type: Number, required: true},
    stars: {type: Number, required: true, min: 1, max: 5 },
    images: {type: [String], required: true},
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;