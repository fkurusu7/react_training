import { NextFunction, Request, Response } from 'express-serve-static-core';
import { MongooseError } from 'mongoose';
import { z } from 'zod';
import configApp from '../config/environment';
import logger from '../config/logger';
import {
  handleMongoDBError,
  handleZodError,
} from '../middlewares/error.middleware';
import Bookings from '../models/bookings.model';
import { successResponse } from '../types/api.type';
import {
  CreateBookingRequestWithBody,
  createBookingSchema,
} from '../types/bookings.type';

export async function getBookings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookings = await Bookings.find({})
      .populate('cabin', 'name -_id')
      .populate('guest', 'fullname email -_id')
      .select(
        'createdAt startDate endDate numNights numGuests status totalPrice'
      );

    if (!bookings.length) {
      res.status(404);
      throw new Error('Resources not found');
    }

    res
      .status(200)
      .send(successResponse(bookings, 'Bookings fetched successfully'));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('Error fetching Products', error);
    }
    next(error);
  }
}

export async function createBooking(
  req: CreateBookingRequestWithBody,
  res: Response,
  next: NextFunction
) {
  try {
    const body = createBookingSchema.parse(req.body);

    const booking = new Bookings({
      guest: body.guest,
      cabin: body.cabin,
      cabinPrice: body.cabinPrice,
      startDate: body.startDate,
      endDate: body.endDate,
      extrasPrice: body.extrasPrice,
      hasBreakfast: body.hasBreakfast,
      isPaid: body.isPaid,
      numGuests: body.numGuests,
      numNights: body.numNights,
      observations: body.observations,
      status: body.status,
      totalPrice: body.totalPrice,
    });

    const savedBooking = await booking.save();

    res
      .status(201)
      .send(successResponse(savedBooking, 'Booking created successfully'));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('HANDLED: Error creating a Booking: ', error);
    }

    if (error instanceof z.ZodError) {
      console.log('zod');
      next(handleZodError(error, res));
    } else if (error instanceof MongooseError) {
      next(handleMongoDBError(error, res));
    } else {
      next(error);
    }
  }
}
