"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelCtrl_1 = require("../controllers/hotelCtrl");
const router = (0, express_1.Router)();
router.get('/', hotelCtrl_1.getAllHotels);
exports.default = router;
