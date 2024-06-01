import express from 'express';
import { Utils } from '../utils/utils';
import { validate, ValidationTarget } from '../libs/validate';
import createUserValidator from '../validators/create-user.validator';
import userController from '../controllers/user.controller';
import { containerResolve } from '../libs/ioc.utils';

const router = express.Router();
const utils = containerResolve<Utils>(Utils.name);
utils.addInterceptor(router, utils.getFileName(__filename, __dirname));

router.post(
  '/',
  validate(createUserValidator, ValidationTarget.BODY),
  userController.createUser,
);
router.get('/', userController.getUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
