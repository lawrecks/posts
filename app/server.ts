/* eslint-disable no-undef */
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

import config, { expressConfig } from './config';
import logger from './config/logger';
import db from './db';

const app = express();
const host = config.HOST;
const port = config.PORT || 3033;
const apiVersion = config.API_VERSION || 'v1';

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

expressConfig(app);

db.connect()
  .then((operation) => {
    app.listen(port, () => {
      operation.done();
      logger.info(`Server started at ${host}:${port}/api/${apiVersion}/`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
  });

export default app;
