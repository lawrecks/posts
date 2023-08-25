import { Router, Request, Response } from 'express';

import * as userController from '../../controllers/user.controllers';
import { checkIfUserExists } from '../../middlewares/user.middlewares';
import { validateCreateUser } from '../../utils/validators/user.validators';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Welcome to posts API!',
  });
});

router.post('/users', validateCreateUser, checkIfUserExists, userController.register);

export default router;
