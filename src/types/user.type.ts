import { z } from 'zod';
import { ERROR_RESPONSE } from '../utils/errors';

export const User = z.object({
  id: z.string(),
  // name: z.string({ message: 'NAME_REQUIREMENT' }),
  // email: z.string().email({ message: 'EMAIL_REQUIREMENT' }),
  // password: z.string({ message: 'PASSWORD_REQUIREMENT' }),
  name: z.string({ message: ERROR_RESPONSE.NAME_REQUIREMENT.status }),
  email: z
    .string({ message: ERROR_RESPONSE.EMAIL_REQUIREMENT.status })
    .email({ message: ERROR_RESPONSE.EMAIL_REQUIREMENT.status }),
  password: z.string({ message: ERROR_RESPONSE.PASSWORD_REQUIREMENT.status }),
});

export type User = z.infer<typeof User>;

export const createUserSchema = User.omit({ id: true }).strict();

export const updateUserSchema = User.omit({ id: true }).partial();
