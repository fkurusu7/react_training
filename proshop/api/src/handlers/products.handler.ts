import { Request, Response } from 'express-serve-static-core';
import products from '../data/products';

export function getProducts(req: Request, res: Response): void {
  try {
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export function getProductById(req: Request, res: Response): void {
  const { id } = req.params;
  try {
    const product = products.find((product) => product._id === id);
    if (!product) throw new Error(`Product not found with ID ${id}`);
    res.status(200).send(product);
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
