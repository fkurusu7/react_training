import { NextFunction, Request, Response } from 'express-serve-static-core';
import logger from '../config/logger';
import Product from '../models/product.model';
import { successResponse } from '../types/api.type';

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Query Modifiers - For Pagination!
  const startIndex = parseInt(req.query.startIndex as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortDirection = req.query.order === 'asc' ? 1 : -1;

  try {
    // Generate Find query
    const products = await Product.find({
      // by product id
      ...(req.query.productId && { _id: req.query.productId }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Return response
    res
      .status(200)
      .send(successResponse(products, 'Products Fetched successfully!'));
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error fetching Products', error);
    }
    throw new Error('Error fetching Products');
  }
}

export async function getProductById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error(`Product not found with ID ${id}`);
    res
      .status(200)
      .send(successResponse(product, 'Product fetched successfully'));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(404).send({ error: error.message });
    } else {
      console.error('Unknown error:', error);
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  }
}
