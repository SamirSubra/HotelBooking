import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({ // creation of
    name: {type: String, required: true},
    location: {type: String, required: true},
    stars: {type: Number, required: true},
    imageSrc: {type: String, required: true},
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;