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
