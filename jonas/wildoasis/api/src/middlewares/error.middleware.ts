import { NextFunction, Request, Response } from 'express-serve-static-core';
import configApp from '../config/environment';
import { errorResponse } from '../types/api.type';

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = res.statusCode || 500;
  let errorMessage = error.message || 'WO - Internal Server Error';
  const stack = configApp.server.nodeEnv === 'development' ? error.stack : '🥞';

  res.status(statusCode).send(errorResponse(errorMessage, stack));
}
