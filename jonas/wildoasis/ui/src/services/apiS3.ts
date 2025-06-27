import { FILES_URI } from '../types/constants';

export async function uploadImageToS3AWS(image: File) {
  // Validate image - type and size
  if (!image.type.includes('image/')) {
    throw new Error('No image type, please upload an image file (jpeg)');
  }
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 50 * 1024 * 1024; // 50MB
  const minSize = 1024; // 1KB

  if (!allowedTypes.includes(image.type)) {
    throw new Error('Please upload a JPEG, PNG, or WebP image');
  }

  if (image.size > maxSize || image.size < minSize) {
    throw new Error('Image must be between 1KB and 50MB');
  }

  // Fetch S3 AWS URL to upload image from frontend
  const response = await fetch(`${FILES_URI}/getImageUploadURL`);
  if (!response.ok) {
    throw new Error('Failed to get upload URL');
  }

  const { data: imageUploadURL } = await response.json();
  console.log(imageUploadURL);
  // Upload to AWS S3 bucket
  const awsResponse = await fetch(imageUploadURL, {
    method: 'PUT',
    headers: { 'Content-Type': image.type },
    mode: 'cors',
    body: image,
  });

  if (!awsResponse.ok) {
    const errorText = await awsResponse.text();
    console.error('AWS Response Error:', errorText);
    throw new Error(
      `Failed to upload image to AWS-S3: ${awsResponse.status} - ${errorText}`
    );
  }

  const publicURL = imageUploadURL.split('?')[0];
  console.log(`Public AWS URL: ${publicURL}`);

  return publicURL;
}

export async function deleteImageFromS3(imageUrl: string) {
  try {
    console.log('imageUrl to send to the API:', imageUrl);
    const response = await fetch(`${FILES_URI}/deleteImage`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: imageUrl }),
    });

    if (!response.ok) {
      console.log('ERROR:::::');
      throw new Error('Failed to delete image from S3');
    }

    return true;
  } catch (error) {
    console.error('Error deleting image from S3:', error);
    throw error;
  }
}
