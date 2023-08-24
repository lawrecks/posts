import 'dotenv/config';

export default {
  HOST: process.env.APP_HOST,
  API_VERSION: process.env.API_VERSION,
  DATABASE_URL: process.env.DATABASE_DEV_URL,
};
