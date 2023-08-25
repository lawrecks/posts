import db from '../db';
import userQueries from '../db/queries/user.queries';
import { User } from '../models/user.model';
import { UserCreateDto } from '../utils/dto/user.dto';
import {
  generateToken,
  hashPassword,
  verifyPassword,
} from '../utils/helpers/auth.helpers';
import { ApiError } from '../utils/helpers/response.helpers';

export const createUser = async (data: UserCreateDto): Promise<User> => {
  const { first_name: firstName, last_name: lastName, email, password } = data;
  const hashedPassword = hashPassword(password);
  const payload = [firstName, lastName, email, hashedPassword];

  return db.one<User>(userQueries.createUser, payload);
};

export const findUserByEmail = (email: string) => {
  return db.oneOrNone<User>(userQueries.findByEmail, email);
};

const validateUser = async (email: string): Promise<User> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw ApiError('Invalid credentials', 400);
  }

  return user;
};

const comparePassword = ({
  userPassword,
  password,
}: {
  userPassword: string;
  password: string;
}) => {
  if (!verifyPassword({ password, hashedPassword: userPassword })) {
    throw ApiError('Invalid credentials', 400);
  }
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await validateUser(email);
  comparePassword({ userPassword: user.password, password });
  const token = generateToken({
    id: user.id,
    email,
  });

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    token,
  };
};

export const getAllUsers = async (): Promise<User[]> => {
  return db.many<User>(userQueries.findAll);
};
