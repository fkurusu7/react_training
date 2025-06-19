import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from './config/logger';
import { createCorsOptions } from './middlewares/cors.middleware';
import { errorHandler, notFound } from './middlewares/error.middleware';
import router from './routes/routes';

export function createApp() {
  const app = express();

  app.use(cors(createCorsOptions()));
  app.use(express.json());
  app.use(cookieParser());

  // Logger Middleware - Request Capture
  app.use(logger.requestLogger);

  // Routes
  app.use(router);

  // Logger Middleware - Response Capture
  app.use(logger.responseCapture);

  // Error handler Middlewares
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
