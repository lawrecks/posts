import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger';
import * as service from '../services/user.services';
import { successResponse } from '../utils/helpers/response.helpers';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.createUser(req.body);

    return successResponse(res, 'User created successfully', 201, user);
  } catch (error) {
    logger.error('register::userController', error);
    next(error);
  }
};
