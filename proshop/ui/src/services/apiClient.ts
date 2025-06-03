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

    const response = await fetch(endpoint, config);

    if (!response.ok) {
      throw new APIError('Request failed', response.status);
    }

    const data = await response.json();

    return data;
  },

  // GET function
  get<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>(endpoint, { signal });
  },

  // POST function
  post<T>(endpoint: string, body: unknown, signal?: AbortSignal): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      signal,
    });
  },

  // UPDATE function
  put<T>(endpoint: string, body: unknown, signal?: AbortSignal): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      signal,
    });
  },

  // DELETE function
  delete<T>(endpoint: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', signal });
  },
};
