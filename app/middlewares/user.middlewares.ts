import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import logger from '../config/logger';
import db from '../db';
import userQueries from '../db/queries/user.queries';
import { ApiError } from '../utils/helpers/response.helpers';

export const checkIfUserExists = async (
  { body: { email } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await db.oneOrNone(userQueries.findByEmail, email);
    if (user) {
      throw ApiError('User already exists', 400);
    }

    return next();
  } catch (error) {
    logger.error('checkIfUserExists::userMiddleware', error);

    return next(error);
  }
};

export const validateUserId = async (
  { params: { id } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await db.oneOrNone(userQueries.findById, id);
    if (!user) {
      throw ApiError('User not found', 404);
    }

    return next();
  } catch (error) {
    logger.error('validateUserId::userMiddleware', error);

    return next(error);
  }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw ApiError('Access denied, a valid access token is required', 401);
    }
    try {
      jwt.verify(token, config.JWT_SECRET);
    } catch (e) {
      throw ApiError('Invalid token', 401);
    }

    return next();
  } catch (error) {
    logger.error('verifyToken::userMiddleware', error);

    return next(error);
  }
};
