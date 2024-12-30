require('module-alias/register');

import {fileFilter, fileStorage} from "@/middlewares/multer-config";
import { Router } from 'express';
const router = Router();
import * as multer from 'multer';

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
const hotelCtrl = require('@/controllers/hotelCtrl');

router.get('/', hotelCtrl.getAllHotels);
router.get('/:id', hotelCtrl.getHotel);
router.post('/', upload.array('images', 4), hotelCtrl.createHotel);
router.delete('/:id', hotelCtrl.deleteHotel);
router.post('/:id', hotelCtrl.modifyHotel);

export default router;