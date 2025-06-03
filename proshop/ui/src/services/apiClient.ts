import { APIError, type RequestOptions } from '../types/api';

export const apiClient = {
  /**
   * Resuable Request object
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    // const url = '';

    const config: RequestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(endpoint, config);

      if (!response.ok) {
        throw new APIError('Request failed', response.status);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred', 503);
    }
  },

  // GET function
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  },

  // POST function
  post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  // UPDATE function
  put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  // DELETE function
  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },
};
