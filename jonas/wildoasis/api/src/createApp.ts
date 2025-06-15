import cookieParser from 'cookie-parser';
import express from 'express';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  return app;
}
