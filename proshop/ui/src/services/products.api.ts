import type { ProductI } from '../types/product';
import { apiClient } from './apiClient';

export const productsAPI = {
  // Get all products
  getAll: async (signal?: AbortSignal): Promise<ProductI[]> => {
    const response = await apiClient.get<ProductI[]>('/api/products', signal);

    return response;
  },

  // Get a Product by ID
  getById: async (id: string, signal?: AbortSignal): Promise<ProductI> => {
    const response = await apiClient.get<ProductI>(
      `/api/products/${id}`,
      signal
    );
    console.log('FETCH ID: ', response);
    return response;
  },
};
