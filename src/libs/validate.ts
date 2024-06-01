import Joi from "joi";
import {NextFunction, Request,Response} from "express";

export enum ValidationTarget {
    BODY = "body",
    PARAMS = "params",
    QUERY = "query",

}
export function validate(schema:Joi.ObjectSchema, target:ValidationTarget){
  return (req:Request, res:Response, next:NextFunction) => {
      const { error } = schema.validate(req[target]);
      if (error) {
          res.status(400).send(error.details[0].message);
      } else {
          next();
      }
  }
}