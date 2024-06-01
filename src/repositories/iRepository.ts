import { FilterQuery } from 'mongoose';

export interface IRepository<T extends Document> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T | null>;
  delete(id: string): Promise<void>;
  find(query: FilterQuery<T>): Promise<T[]>;
  findOne(query: FilterQuery<T>): Promise<T | null>;
}
