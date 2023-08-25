import db from '../db';
import userQueries from '../db/queries/user.queries';
import { UserCreateDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { hashPassword } from '../utils/helpers/auth.helpers';

export const createUser = async (data: UserCreateDto): Promise<User> => {
  const { first_name: firstName, last_name: lastName, email, password } = data;
  const hashedPassword = hashPassword(password);
  const payload = [firstName, lastName, email, hashedPassword];
  const [user] = await db.any<User>(userQueries.createUser, payload);

  return user;
};
