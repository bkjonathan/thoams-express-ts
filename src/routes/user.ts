import express from 'express';
import { Utils } from '../utils/utils';
import { validateZod } from '../libs/validate';
import userController from '../controllers/user.controller';
import { containerResolve } from '../libs/ioc.utils';
import { createUserSchema, updateUserSchema } from '../types/user.type';

const router = express.Router();
const utils = containerResolve<Utils>(Utils.name);
utils.addInterceptor(router, utils.getFileName(__filename, __dirname));

router.post('/', validateZod(createUserSchema), userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', validateZod(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
