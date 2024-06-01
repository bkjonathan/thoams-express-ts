import express from 'express';
import { Utils } from '../utils/utils';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const utils = new Utils();
utils.addInterceptor(router, utils.getFileName(__filename, __dirname));

router.post('/', UserController.createUser);
router.get('/', UserController.getUser);

export default router;
