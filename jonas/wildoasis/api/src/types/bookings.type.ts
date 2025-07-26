import { Request } from 'express-serve-static-core';
import { z } from 'zod';

export const createBookingSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  numNights: z.coerce.number().positive(),
  numGuests: z.coerce.number().positive(),
  cabinPrice: z.coerce.number().positive(),
  extrasPrice: z.coerce.number().positive(),
  totalPrice: z.coerce.number().positive(),
  status: z.enum(['unconfirmed', 'checked-in', 'checked-out']),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  observations: z.string().optional(),
  cabin: z.string().min(10),
  guest: z.string().min(10),
});

export const updateBookingSchema = z.object({
  status: z.enum(['unconfirmed', 'checked-in', 'checked-out']),
  isPaid: z.boolean(),
});

type CreateBookingRequest = z.infer<typeof createBookingSchema>;
type UpdateBookingrequest = z.infer<typeof updateBookingSchema>;

export interface CreateBookingRequestWithBody extends Request {
  body: CreateBookingRequest;
}

export interface UpdateBookingRequestWithBody extends Request {
  body: UpdateBookingrequest;
}
