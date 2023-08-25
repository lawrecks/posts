import 'dotenv/config';

export default {
  HOST: process.env.HOST,
  API_VERSION: process.env.API_VERSION,
  DATABASE_URL: process.env.DATABASE_DEV_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};
