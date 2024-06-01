import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constant';

export enum ValidationTarget {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
}
export function validate(schema: Joi.ObjectSchema, target: ValidationTarget) {
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
