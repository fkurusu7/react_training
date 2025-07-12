import { Request } from 'express-serve-static-core';
import { z } from 'zod';

export const createGuestSchema = z.object({
  fullname: z.string().min(5),
  email: z.string().min(5),
  nationality: z.string().min(5),
  nationalId: z.string().min(5),
  countryFlag: z.string().min(1).optional(),
});

type CreateGuestRequest = z.infer<typeof createGuestSchema>;

export interface CreateGuestRequestWithBody extends Request {
  body: CreateGuestRequest;
}
