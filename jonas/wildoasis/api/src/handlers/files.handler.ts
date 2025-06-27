import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import configApp from '../config/environment';
import logger from '../config/logger';
import { successResponse } from '../types/api.type';

// Get banner image URL from AWS S3
function getS3Client(): S3Client {
  return new S3Client({
    region: configApp.aws.bucketRegion,
    credentials: {
      accessKeyId: configApp.aws.accessKey,
      secretAccessKey: configApp.aws.secretAccessKey,
    },
  });
}

async function generateAWSImageUploadURL(): Promise<string> {
  const s3Client = getS3Client();
  const date = new Date();
  const imageName = `${crypto.randomUUID().slice(0, 8)}-${date.getTime()}.jpeg`;

  const command = new PutObjectCommand({
    Bucket: configApp.aws.bucketName,
    Key: imageName,
    ContentType: 'image/jpeg',
  });

  const urlUploadImage = await getSignedUrl(s3Client, command, {
    expiresIn: 1000,
  });

  return urlUploadImage;
}

export async function getImageUploadURL(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const urlUploadImage = await generateAWSImageUploadURL();
    res
      .status(200)
      .send(
        successResponse(urlUploadImage, 'Image upload URL created successfully')
      );
  } catch (error) {
    if (error instanceof Error) next(error);
  }
}

export async function deleteS3Image(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { imageUrl } = req.body;
    logger.warn(`Image received: ${imageUrl}`);
    if (!imageUrl) {
      res.statusCode = 400;
      throw new Error('Image URL is required');
    }

    // Extract key from URL by removing the leading slash from pathname
    const url = new URL(imageUrl);

    const imageKey = url.pathname.substring(1);
    logger.warn(`ImageKey: ${imageKey}`);

    // delete image from S3
    const s3Client = getS3Client();

    const command = new DeleteObjectCommand({
      Bucket: configApp.aws.bucketName,
      Key: imageKey,
    });

    await s3Client.send(command);

    res.status(204).send(successResponse(null, 'Image deleted successfully'));
  } catch (error) {
    if (error instanceof Error) next(error);
    next(error);
  }
}
