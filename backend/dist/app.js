"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const hotel_1 = require("./routes/hotel");
const app = express();
mongoose_1.default.connect('mongodb+srv://mlatax976:JjFniAoW7OxvBkK7@cluster0.lxcsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173", // URL du frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// all images located in the HotelBooking/backend/images directory will be accessible via the base URL http://localhost:3000/uploads/.
app.use('/hotels/uploads', express.static(process.cwd() + "/backend/images"));
app.use(express.json());
// Middleware to parse form data (if classic forms are sent)
app.use(express.urlencoded({ extended: true })); // parse data sent via a classic form
app.use("/hotels", hotel_1.default);
exports.default = app;
