import type { ProductI } from '../types/product';
import { apiClient } from './apiClient';

export const productsAPI = {
  // Get all products
  getAll: async (): Promise<ProductI[]> => {
    const response = await apiClient.get<ProductI[]>('/api/products');

    return response;
  },

  // Get a Product by ID
  getById: async (id: string): Promise<ProductI> => {
    const response = await apiClient.get<ProductI>(`/api/products/${id}`);
    return response;
  },
};
