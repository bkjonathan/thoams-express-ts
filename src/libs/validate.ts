import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constant';
import { ZodSchema } from 'zod';
import { ERROR_RESPONSE } from '../utils/errors';

export enum ValidationTarget {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
}
export function validate(
  schema: Joi.ObjectSchema,
  target: ValidationTarget = ValidationTarget.BODY,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[target]);
    if (error) {
      console.log(error);
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: error.details[0].message.replace(/"/g, '') });
    } else {
      next();
    }
  };
}

export function validateZod(
  schema: ZodSchema<any>,
  target: ValidationTarget = ValidationTarget.BODY,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[target];
    const { error } = schema.safeParse(data);

    if (error) {
      const message = error?.errors[0].message;
      console.log(error?.errors);
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ ...(ERROR_RESPONSE[message] || message) });
    }

    next();
  };
}
