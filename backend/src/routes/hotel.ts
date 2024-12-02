import { Router } from 'express';
import { getAllHotels } from '../controllers/hotelCtrl';

const router = Router();

router.get('/', getAllHotels);

export default router;