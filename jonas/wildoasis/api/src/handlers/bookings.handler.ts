import { NextFunction, Request, Response } from 'express-serve-static-core';
import configApp from '../config/environment';
import logger from '../config/logger';
import Bookings from '../models/bookings.model';
import { successResponse } from '../types/api.type';

export async function getBookings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookings = await Bookings.find({})
      .populate('cabin', 'name -_id')
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
