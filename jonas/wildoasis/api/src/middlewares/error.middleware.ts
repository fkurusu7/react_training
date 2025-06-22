import { NextFunction, Request, Response } from 'express-serve-static-core';
import mongoose, { MongooseError } from 'mongoose';
import { ZodError } from 'zod';
import configApp from '../config/environment';
import logger from '../config/logger';
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

// ZOD handling errors:
export function handleZodError(error: ZodError, res: Response) {
  res.statusCode = 422;
  const errorMessage = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));

  return new Error(JSON.stringify(errorMessage));
}

export function handleMongoDBError(error: MongooseError, res: Response) {
  res.statusCode = 409;
  let errorMessage;

  if (error instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(error.errors).map((err) =>
      err.message.replace('Path ', '').replace(/`+/g, '')
    );
    errorMessage = messages.join(' ');
  }

  if (error instanceof mongoose.Error.CastError) {
    errorMessage = `CastError. ${error.message}`;
  }

  if (error instanceof mongoose.mongo.MongoError) {
    // Any MongoDB driver error
    logger.error('MongoDB Error Code:', (error as any).code);
    errorMessage = `${error.name} - ${error.message}`;
  }

  return new Error(errorMessage);
}
