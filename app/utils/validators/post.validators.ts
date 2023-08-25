import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import baseValidator from '.';

export const validateCreatePost = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim(),
    content: Joi.string().trim().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};
