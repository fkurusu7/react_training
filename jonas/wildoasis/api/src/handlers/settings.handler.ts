import { NextFunction, Request, Response } from 'express-serve-static-core';
import { MongooseError } from 'mongoose';
import { z } from 'zod';
import {
  handleMongoDBError,
  handleZodError,
} from '../middlewares/error.middleware';
import Settings from '../models/settings.model';
import { successResponse } from '../types/api.type';
import {
  UpdateSettingRequestWithBody,
  updateSettingsSchema,
} from '../types/settings.type';

export async function getSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const settings = await Settings.find({});

    if (!settings.length) {
      res.status(404);
      throw new Error('Resources not found');
    }

    res
      .status(200)
      .send(successResponse(settings[0], 'Settings fetched successfully'));
  } catch (error) {
    next(error);
  }
}

export async function updateSetting(
  req: UpdateSettingRequestWithBody,
  res: Response,
  next: NextFunction
) {
  try {
    const { setting, value } = updateSettingsSchema.parse(req.body);

    const settingUpdated = await Settings.findOneAndUpdate(
      {},
      { $set: { [setting]: value } },
      { new: true }
    );

    res
      .status(200)
      .send(successResponse(settingUpdated, `Setting ${setting} updated`));
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(handleZodError(error, res));
    } else if (error instanceof MongooseError) {
      next(handleMongoDBError(error, res));
    } else {
      next(error);
    }
  }
}
