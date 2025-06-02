import cookieParser from 'cookie-parser';
import express from 'express';
import router from './routes/routers';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(router);

  return app;
}
