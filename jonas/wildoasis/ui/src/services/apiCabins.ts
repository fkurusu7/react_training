import type { Cabin, CabinFormData, CabinResponse } from '../types/cabin.type';
import { CABINS_URI } from '../types/constants';
import { deleteImageFromS3 } from './apiS3';

export async function getCabins(): Promise<CabinResponse> {
  try {
    const response = await fetch(CABINS_URI);

    if (!response.ok && response.status !== 404) {
      throw new Error('Cabins could no be loaded');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error:::::\n', error);
    if (error instanceof Error) {
      throw error;
    }
    // Handle non-Error objects
    throw new Error('An unknown error occurred');
  }
}

export async function createEditCabin(cabin: CabinFormData, id: string = '') {
  try {
    const FETCH_METHOD = !id ? 'POST' : 'PUT';
    const FETCH_URI = !id ? CABINS_URI : `${CABINS_URI}/${id}`;

    const response = await fetch(FETCH_URI, {
      method: FETCH_METHOD,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cabin),
    });

    if (!response.ok) {
      if (!id && cabin.image && typeof cabin.image === 'string') {
        try {
          await deleteImageFromS3(cabin.image);
        } catch (error) {
          console.log('error deleting image', error);
        }
      }
      throw new Error(`Cabin could not be ${!id ? 'created' : 'updated'}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
}

export async function deleteCabin(cabin: Cabin) {
  const id = cabin._id;
  try {
    const response = await fetch(`${CABINS_URI}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete cabin: ${response.status} ${response.statusText}`
      );
    }

    if (cabin.image) {
      console.log('Image delete:', cabin.image);
      await deleteImageFromS3(cabin.image);
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    // Handle non-Error objects
    throw new Error('An unknown error occurred');
  }
}
