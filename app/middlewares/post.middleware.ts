import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger';
import db from '../db';
import postQueries from '../db/queries/post.queries';
import { ApiError } from '../utils/helpers/response.helpers';

export const validatePostId = async (
  { params: { postId } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await db.oneOrNone(postQueries.findById, postId);
    if (!post) {
      throw ApiError('Post not found', 404);
    }

    return next();
  } catch (error) {
    logger.error('validatePostId::postMiddleware', error);

    return next(error);
  }
};
