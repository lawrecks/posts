import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger';
import * as service from '../services/post.services';
import { successResponse } from '../utils/helpers/response.helpers';

export const createPost = async (
  { body, params: { id } }: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await service.createPost({ ...body, user_id: id });

    return successResponse(res, 'Post created successfully', 201, post);
  } catch (error) {
    logger.error('createPost::postController', error);

    return next(error);
  }
};
