import { Response, NextFunction } from 'express';

import logger from '../config/logger';
import * as service from '../services/comment.services';
import { successResponse } from '../utils/helpers/response.helpers';
import { RequestWithUser } from '../utils/interfaces';

export const createComment = async (
  { body, params: { postId }, user }: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comment = await service.createComment({ ...body, postId, userId: user?.id });

    return successResponse(res, 'Comment created successfully', 201, comment);
  } catch (error) {
    logger.error('createComment::commentController', error);

    return next(error);
  }
};
