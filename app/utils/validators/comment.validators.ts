import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import baseValidator from '.';

export const validateCreateComment = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    content: Joi.string().trim().required(),
  });
  baseValidator(schema, req, res, next, 'body');
};
