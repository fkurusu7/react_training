import type { CabinFormData, CabinResponse } from '../types/cabin.type';
import { CABINS_URI } from '../types/constants';

export async function getCabins(): Promise<CabinResponse> {
  try {
    const response = await fetch(CABINS_URI);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Cabins could no be loaded');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    // Handle non-Error objects
    throw new Error('An unknown error occurred');
  }
}

export async function createCabin(cabin: CabinFormData) {
  try {
    const response = await fetch(CABINS_URI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cabin),
    });

    if (!response.ok) {
      // TODO: remove image from S3 if there was an error creating the cabin object
      throw new Error('Cabin could not be created');
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

export async function deleteCabin(id: string) {
  console.log('ID delete:', id);
  try {
    const response = await fetch(`${CABINS_URI}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete cabin: ${response.status} ${response.statusText}`
      );
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
