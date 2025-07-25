import { Request } from 'express-serve-static-core';
import { z } from 'zod';

// CABINS
export const createCabinSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  maxCapacity: z.coerce.number().positive(),
  regularPrice: z.coerce.number().positive(),
  discount: z.coerce.number().min(0),
});

type CreateCabinRequest = z.infer<typeof createCabinSchema>;

export interface CreateCabinRequestWithBody extends Request {
  body: CreateCabinRequest;
}

export const editCabinSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().optional().optional(),
  maxCapacity: z.coerce.number().positive().optional(),
  regularPrice: z.coerce.number().positive().optional(),
  discount: z.coerce.number().min(0).optional(),
});

type EditCabinRequest = z.infer<typeof editCabinSchema>;

export interface EditCabinRequestWithBody extends Request {
  body: EditCabinRequest;
}
