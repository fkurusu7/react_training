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

const isEmptyObj = (obj: Record<string, any>): boolean =>
  Object.keys(obj).length === 0;

export async function getBookings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    /*
      filter {field: 'status', value: 'checked-out'}
      sortBy {field: 'totalPrice', direction: 'asc'}
      GET /api/bookings?
        filter=null
        &sortBy=%7B%22field%22%3A%22startDate%22%2C%22direction%22%3A%22desc%22%7D
        &limit=10
        &startIndex=31 
    */
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    console.log(!req.query);
    const filterQuery =
      !req.query.filter || req.query.filter === 'null'
        ? {}
        : (() => {
            let filter = JSON.parse(req.query.filter as string);
            return isEmptyObj(filter)
              ? filter
              : { [filter.field]: filter.value };
          })();

    const sortByQuery = !req.query.sortBy
      ? ({ startDate: -1 } as {
          [key: string]: 1 | -1;
        })
      : (() => {
          let sort = JSON.parse(req.query.sortBy as string);
          return { [sort.field]: sort.direction === 'asc' ? 1 : -1 } as {
            [key: string]: 1 | -1;
          };
        })();

    const totalDocuments = await Bookings.countDocuments(filterQuery);
    /* 
    console.log('totalDocuments', totalDocuments);
    console.log('filterQuery', filterQuery);
    console.log('sortByQuery', sortByQuery);
    console.log('limit', limit);
    console.log('startIndex', startIndex); */
    const bookings = await Bookings.find(filterQuery)
      .populate('cabin', 'name -_id')
      .populate('guest', 'fullname email -_id')
      .select(
        'createdAt startDate endDate numNights numGuests status totalPrice'
      )
      .sort(sortByQuery)
      .skip(startIndex)
      .limit(limit);

    if (!bookings.length) {
      res.status(404);
      throw new Error('Resources not found');
    }
    console.log('totalDocuments', totalDocuments);

    res
      .status(200)
      .send(
        successResponse(
          { bookings, totalDocuments },
          'Bookings fetched successfully'
        )
      );
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
