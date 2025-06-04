interface APIResponse<T> {
  message?: string;
  success: boolean;
  data?: T;
}

export function successResponse<T>(data?: T, message?: string): APIResponse<T> {
  const response = { success: true, data, message };
  return response;
}

interface APIErrorResponse {
  success: false;
  error: string;
  stack?: string;
}

export function errorResponse(error: string, stack?: string): APIErrorResponse {
  return { success: false, error, stack };
}
