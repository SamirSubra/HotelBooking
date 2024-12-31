require('module-alias/register');
import { Router } from 'express';
const router = Router();

import {upload} from "@/middlewares/multer-config";
const hotelCtrl = require('@/controllers/hotelCtrl');

router.get('/', hotelCtrl.getAllHotels);
router.get('/:id', hotelCtrl.getHotel);
router.post('/', upload.array('images', 4), hotelCtrl.createHotel);
router.delete('/:id', hotelCtrl.deleteHotel);
router.put('/:id', upload.array('images', 4), hotelCtrl.modifyHotel);

export default router;