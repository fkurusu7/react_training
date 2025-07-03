import console from 'console';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { MongooseError } from 'mongoose';
import { z } from 'zod';
import configApp from '../config/environment';
import logger from '../config/logger';
import {
  handleMongoDBError,
  handleZodError,
} from '../middlewares/error.middleware';
import Cabin from '../models/cabins.model';
import { successResponse } from '../types/api.type';
import {
  CreateCabinRequestWithBody,
  createCabinSchema,
  EditCabinRequestWithBody,
  editCabinSchema,
} from '../types/cabins.type';

/**
 * Get a Cabin data
 * GET /api/cabins/:id
 * @param req - Request
 * @param res - Response
 * @returns successResponse
 * @throws error
 */
export async function getCabin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const cabin = await Cabin.findById({ _id: id });

    if (!cabin) {
      res.status(404);
      throw new Error('Resources not found');
    }

    // Return cabin
    res
      .status(200)
      .send(successResponse(cabin, `Cabin ${id} fetched successfully`));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('Error fetching products', error);
    }

    next(error);
  }
}

/**
 * Get Cabins data
 * GET /api/cabins
 * @param req - Request
 * @param res - Response
 * @returns successResponse
 * @throws error
 */
export async function getCabins(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Query modifiers - For Pagination
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortDirection = req.query.order === 'asc' ? 1 : -1;

  try {
    const cabins = await Cabin.find({})
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (!cabins.length) {
      res.status(404);
      throw new Error('Resources not found');
    }

    // Return response
    res
      .status(200)
      .send(successResponse(cabins, 'Cabins fetched successfully'));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('Error fetching Products', error);
    }
    next(error);
    // throw new Error('Error fetching Resources');
  }
}

/**
 * Creates Cabin data
 * POST /api/cabins
 * @param req - createCabinSchema
 * @param res - Response
 * @returns successResponse
 * @throws error
 */
export async function createCabin(
  req: CreateCabinRequestWithBody,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = createCabinSchema.parse(req.body);

    const cabin = new Cabin({
      name: body.name,
      description: body.description,
      image: body.image,
      maxCapacity: Number(body.maxCapacity),
      regularPrice: Number(body.regularPrice),
      discount: Number(body.discount),
    });

    const savedCabin = await cabin.save();

    res
      .status(201)
      .send(successResponse(savedCabin, 'Cabin created successfully'));
  } catch (error) {
    if (configApp.server.nodeEnv === 'development' && error instanceof Error) {
      logger.error('HANDLED: Error creating a Cabin: ', error);
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

/**
 * Delete a Cabin by Id
 * DELETE /api/cabins/:id
 * @param req - Request
 * @param res - Response
 * @returns successResponse
 * @throws error
 */
export async function deleteCabin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const cabin = await Cabin.findByIdAndDelete(id);
    // logger.warn(JSON.stringify(cabin));
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) logger.error('Error deleting a Cabin: ', error);
    else if (error instanceof MongooseError) {
      next(handleMongoDBError(error, res));
    } else {
      res.statusCode = 400;
      next(error);
    }
  }
}

/**
 * Update a Cabin
 * PUT /api/cabins/:id
 * @param req - Request
 * @param res - Response
 * @returns successResponse
 * @throws error
 */
export async function updateCabin(
  req: EditCabinRequestWithBody,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, description, discount, image, maxCapacity, regularPrice } =
      editCabinSchema.partial().parse(req.body);

    const updateQuery = {
      ...(name && { name }),
      ...(description && { description }),
      ...(discount && { discount }),
      ...(image && { image }),
      ...(maxCapacity && { maxCapacity }),
      ...(regularPrice && { regularPrice }),
    };
    // logger.warn(JSON.stringify(updateQuery));
    const cabinUpdated = await Cabin.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    res
      .status(200)
      .send(successResponse(cabinUpdated, 'Cabin updated successfully'));
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
