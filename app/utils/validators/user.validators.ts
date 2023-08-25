import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import baseValidator from '.';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};
