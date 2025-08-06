import { NextFunction, Request, Response } from 'express-serve-static-core';
import { signupSchema } from '../types/auth.type';

import bcryptjs from 'bcryptjs';
import { MongooseError } from 'mongoose';
import { z } from 'zod';
import logger from '../config/logger';
import {
  handleMongoDBError,
  handleZodError,
} from '../middlewares/error.middleware';
import User from '../models/users.model';
import { successResponse } from '../types/api.type';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate req data: fullname, email, password, username
    const { fullname, email, password, username } = signupSchema.parse(
      req.body
    );

    // Hash user's password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create User object from model
    const user = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // Save user into DB
    const savedUser = await user.save();
    logger.info(`user saved: [delete this] ${savedUser}`);

    // Decide what to return, user full data?, just fullname?, username?
    // No need to create TOKEN up until signing in.
    res.status(201).send(successResponse({ username: savedUser.username }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(handleZodError(error, res));
    } else if (error instanceof MongooseError) {
      next(handleMongoDBError(error, res));
    } else {
      next(error);
    }
  }
}
