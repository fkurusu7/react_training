export interface APIResponse<T> {
  message?: string;
  success: boolean;
  data: T;
}

export interface APIErrorResponse {
  message: string;
  success: false;
  error?: string;
}

export class APIError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'APIError';
  }
}

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}
