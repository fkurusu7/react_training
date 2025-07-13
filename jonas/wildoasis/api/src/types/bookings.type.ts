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

type CreateBookingRequest = z.infer<typeof createBookingSchema>;

export interface CreateBookingRequestWithBody extends Request {
  body: CreateBookingRequest;
}
