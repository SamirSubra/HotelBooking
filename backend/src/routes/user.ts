require('module-alias/register');
import { Router } from 'express';
const router = Router();

import {upload} from "@/middlewares/multer-config";
const userCtrl = require('@/controllers/userCtrl');

router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUser);
router.post('/',  userCtrl.createUser);
router.delete('/:id', userCtrl.deleteUser);
router.put('/:id', userCtrl.modifyUser);

export default router;