import cors from 'cors';
import { Request, Response, NextFunction, Express } from 'express';

import logger from './logger';
import routes from '../routes/v1';
import { ApiError } from '../utils/helpers/response.helpers';

const expressConfig = (app: Express) => {
  const env = app.get('env');

  logger.info('App is starting...');
  logger.info(`Environment is ${env}`);
  logger.info("Overriding 'Express' logger");

  app.disable('x-powered-by');
  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.use('/api/v1', routes);

  // catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error('Route Not Found');
    err.status = 'error';
    err.code = 404;

    return next(err);
  });

  // error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    res.status(err.code || 500).json(ApiError(err.message, err.code));
  });
};

export default expressConfig;
