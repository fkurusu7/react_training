import cookieParser from 'cookie-parser';
import express from 'express';
import logger from './config/logger';
import router from './routes/routers';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Logger Middleware - Request Capture
  app.use(logger.requestLogger);
  // Logger Middleware - Response Capture
  app.use(logger.responseCapture);

  app.use(router);

  return app;
}
