import UserRepository from '../repositories/user-repository';
import { IUser } from '../models/user.model';
import { FilterQuery } from 'mongoose';
import { Injectable } from '../libs/ioc.utils';

@Injectable()
export default class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async findUsers(query: FilterQuery<IUser>): Promise<IUser[]> {
    // You can add any business logic here before getting the users
    return this.userRepository.find(query);
  }

  async findOneUser(query: FilterQuery<IUser>): Promise<IUser | null> {
    // You can add any business logic here before getting the user
    return this.userRepository.findOne(query);
  }

  async createUser(user: IUser): Promise<IUser> {
    // You can add any business logic here before saving the user
    return this.userRepository.create(user);
  }

  async updateUser(id: string, user: IUser): Promise<IUser | null> {
    // You can add any business logic here before updating the user
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    // You can add any business logic here before deleting the user
    return this.userRepository.delete(id);
  }
}
