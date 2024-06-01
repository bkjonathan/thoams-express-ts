import UserService from '../services/user.service';
import { IUser } from '../models/user.model';
import { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constant';
import { containerResolve } from '../libs/ioc.utils';
class UserController {
  userService: UserService;
  constructor() {
    this.userService = containerResolve<UserService>(UserService.name);
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    const user: IUser = req.body;
    const newUser = await this.userService.createUser(user);
    return res.status(HTTP_STATUS.CREATED).json(newUser);
  };

  getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await this.userService.findUsers({});
    return res.status(HTTP_STATUS.OK).json(users);
  };

  getOneUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.userService.findOneUser({ _id: req.params.id });
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    return res.status(HTTP_STATUS.OK).json(user);
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const updatedUser = await this.userService.updateUser(
      req.params.id,
      req.body,
    );
    if (!updatedUser) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    return res.status(HTTP_STATUS.OK).json(updatedUser);
  };

  deleteUser = async (req: Request, res: Response): Promise<Response> => {
    await this.userService.deleteUser(req.params.id);
    return res.status(HTTP_STATUS.DELETED).json({ message: 'User deleted' });
  };
}

export default new UserController();
