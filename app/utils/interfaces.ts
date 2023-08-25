import { Request } from 'express';

import { User } from '../models/user.model';

export interface RequestWithDecoded extends Request {
  decoded: User;
}
