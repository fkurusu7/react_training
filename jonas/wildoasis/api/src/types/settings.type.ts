import { Request } from 'express-serve-static-core';
import { z } from 'zod';

const settingsKey = [
  'minBookingLength',
  'maxBookingLength',
  'maxGuestsPerBooking',
  'breakfastPrice',
] as const;

export const updateSettingsSchema = z.object({
  setting: z.enum(settingsKey),
  value: z.coerce.number().positive().min(1),
});

type UpdateSettingRequest = z.infer<typeof updateSettingsSchema>;

export interface UpdateSettingRequestWithBody extends Request {
  body: UpdateSettingRequest;
}
