import { z } from 'zod';

export const User = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }),
  email: z.string().email(),
  password: z.string({ message: 'Password is required' }),
});

export type User = z.infer<typeof User>;

export const createUserSchema = User.omit({ id: true }).required();

export const updateUserSchema = User.omit({ id: true }).optional();
