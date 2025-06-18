import { Request, Response } from 'express-serve-static-core';
import configApp from '../../config/environment';
import logger from '../../config/logger';
import { successResponse } from '../../types/api.type';
import {
  CreateCabinRequestWithBody,
  createCabinSchema,
} from '../../types/cabins.type';
import Cabin from '../cabins.model';

// /api/cabins/:id
export async function getCabin(req: Request, res: Response): Promise<void> {
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

    throw error;
  }
}

// /api/cabins
export async function getCabins(req: Request, res: Response): Promise<void> {
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
    throw error;
    // throw new Error('Error fetching Resources');
  }
}

/**
 * Creates Cabin data
 * POST /api/cabins
 * @param req - createCabinSchema
 * @param res - successResponse
 */
export async function createCabin(
  req: CreateCabinRequestWithBody,
  res: Response
): Promise<void> {
  try {
    const body = createCabinSchema.parse(req.body);

    const cabin = new Cabin({
      name: body.name,
      description: body.description,
      discount: body.discount,
      image: body.image,
      maxCapacity: body.maxCapacity,
      regularPrice: body.regularPrice,
    });

    const savedCabin = await cabin.save();

    res
      .status(201)
      .send(successResponse(savedCabin, 'Cabin created successfully'));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
