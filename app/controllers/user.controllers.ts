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

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.getAllUsers();

    return successResponse(res, 'Users fetched successfully', 200, users);
  } catch (error) {
    logger.error('getAllUsers::userController', error);

    return next(error);
  }
};

export const getTopThreeUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.getTopThreeUsers();

    return successResponse(res, 'Top users fetched successfully', 200, users);
  } catch (error) {
    logger.error('getTopThreeUsers::userController', error);

    return next(error);
  }
};
