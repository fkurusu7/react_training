import { Request } from 'express-serve-static-core';
import { z } from 'zod';

// CABINS
export const createCabinSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string(),
  maxCapacity: z.number().positive(),
  regularPrice: z.number().positive(),
  discount: z.number().min(0),
});

type CreateCabinRequest = z.infer<typeof createCabinSchema>;

export interface CreateCabinRequestWithBody extends Request {
  body: CreateCabinRequest;
}
