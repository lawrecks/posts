import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger';
import * as service from '../services/user.services';
import { successResponse } from '../utils/helpers/response.helpers';

export const register = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.createUser(body);

    return successResponse(res, 'User created successfully', 201, user);
  } catch (error) {
    logger.error('register::userController', error);

    return next(error);
  }
};

export const login = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.login(body);

    return successResponse(res, 'Login successful', 200, data);
  } catch (error) {
    logger.error('login::userController', error);

    return next(error);
  }
};
