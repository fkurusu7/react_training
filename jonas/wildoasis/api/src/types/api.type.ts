/**
 * API Responses (success and error)
 */

interface APIResponse<T> {
  message?: string;
  success: boolean;
  data?: T;
}

export function successResponse<T>(data?: T, message?: string): APIResponse<T> {
  return { success: true, data, message };
}

interface APIErrorResponse {
  success: boolean;
  error: string;
  stack?: string;
}

export function errorResponse(error: string, stack?: string): APIErrorResponse {
  return { success: false, error, stack };
}
