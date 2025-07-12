import { NextFunction, Request, Response } from 'express-serve-static-core';
import { MongooseError } from 'mongoose';
import { z } from 'zod';
import configApp from '../config/environment';
import logger from '../config/logger';
import {
  handleMongoDBError,
  handleZodError,
} from '../middlewares/error.middleware';
import Guest from '../models/guests.model';
import { successResponse } from '../types/api.type';
import { createGuestSchema } from '../types/guests.type';

export async function getGuests(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const guests = await Guest.find({});

    if (!guests.length) {
      res.status(404);
      throw new Error('Error fetching Guests data');
    }

    res
      .status(200)
      .send(successResponse(guests, 'Guests data fetched successfully'));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('Error fetching Guests information', error);
    }
    next(error);
  }
}

export async function createGuest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = createGuestSchema.parse(req.body);

    const guest = new Guest({
      fullname: body.fullname,
      email: body.email,
      nationality: body.nationality,
      nationalId: body.nationalId,
      countryFlag: body.countryFlag,
    });

    const savedGuest = await guest.save();

    res
      .status(201)
      .send(successResponse(savedGuest, 'Guest created successfully'));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('HANDLED: Error creating a Guest: ', error);
    }

    if (error instanceof z.ZodError) {
      next(handleZodError(error, res));
    } else if (error instanceof MongooseError) {
      next(handleMongoDBError(error, res));
    } else {
      next(error);
    }
  }
}
