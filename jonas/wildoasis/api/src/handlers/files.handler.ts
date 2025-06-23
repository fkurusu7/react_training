import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import configApp from '../config/environment';
import { successResponse } from '../types/api.type';

// Get banner image URL from AWS S3
function getS3Client(): S3Client {
  return new S3Client({
    region: 'us-east-2',
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
