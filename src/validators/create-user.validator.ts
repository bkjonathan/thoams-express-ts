import Joi from 'joi';

const createUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default createUserValidator;
