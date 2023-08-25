import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger';
import db from '../db';
import userQueries from '../db/queries/user.queries';
import { ApiError } from '../utils/helpers/response.helpers';

export const checkIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await db.oneOrNone(userQueries.findByEmail, req.body.email);
    if (user) {
      throw ApiError('User already exists', 400);
    }

    return next();
  } catch (error) {
    logger.error('checkIfUserExists::userMiddleware', error);

    return next(error);
  }
};
