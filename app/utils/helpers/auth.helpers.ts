import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config';

export const hashPassword = (password: string): string => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(password, salt);
};

export const verifyPassword = ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) => {
  const validPassword = bcrypt.compareSync(password, hashedPassword);
  if (validPassword) {
    return true;
  }

  return false;
};

export const generateToken = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
};
