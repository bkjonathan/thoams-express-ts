import { IRepository } from './iRepository';
import { IUser } from '../models/user.model';
import UserModel from '../models/user.model';
import { FilterQuery } from 'mongoose';

export default class UserRepository implements IRepository<IUser> {
  async create(data: IUser): Promise<IUser> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }
  async update(id: string, data: IUser): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
  async find(query: FilterQuery<IUser>): Promise<IUser[]> {
    return UserModel.find(query);
  }
  async findOne(query: FilterQuery<IUser>): Promise<IUser | null> {
    return UserModel.findOne(query);
  }
}
