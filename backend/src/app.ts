import * as express from 'express';
import mongoose from 'mongoose';

import hotelRoutes from "./routes/hotel";
const app: express.Application = express();

mongoose.connect('mongodb+srv://mlatax976:JjFniAoW7OxvBkK7@cluster0.lxcsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use("/api/hotels", hotelRoutes);

export default app;
