import { Request } from 'express-serve-static-core';
import { z } from 'zod';

export const signupSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).optional(),
});

type SignupRequest = z.infer<typeof signupSchema>;

export interface SignupRequestWithBody extends Request {
  body: SignupRequest;
}
