"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
const hotel_1 = require("./routes/hotel");
const app = express();
mongoose_1.default.connect('mongodb+srv://mlatax976:JjFniAoW7OxvBkK7@cluster0.lxcsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());
app.use("/api/hotels", hotel_1.default);
exports.default = app;
