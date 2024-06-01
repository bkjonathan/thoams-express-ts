import express from 'express';
import { Utils } from '../utils/utils';
import { validate, validateZod, ValidationTarget } from '../libs/validate';
import createUserValidator from '../validators/create-user.validator';
import userController from '../controllers/user.controller';
import { containerResolve } from '../libs/ioc.utils';
import { createUserSchema } from '../types/user.type';

const router = express.Router();
const utils = containerResolve<Utils>(Utils.name);
utils.addInterceptor(router, utils.getFileName(__filename, __dirname));

router.post('/', validateZod(createUserSchema), userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
