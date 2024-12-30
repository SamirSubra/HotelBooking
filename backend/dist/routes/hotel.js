"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const multer_config_1 = require("@/middlewares/multer-config");
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer = require("multer");
const upload = multer({ storage: multer_config_1.fileStorage, fileFilter: multer_config_1.fileFilter });
const hotelCtrl = require('@/controllers/hotelCtrl');
router.get('/', hotelCtrl.getAllHotels);
router.get('/:id', hotelCtrl.getHotel);
router.post('/', upload.array('images', 4), hotelCtrl.createHotel);
router.delete('/:id', hotelCtrl.deleteHotel);
router.post('/:id', hotelCtrl.modifyHotel);
exports.default = router;
