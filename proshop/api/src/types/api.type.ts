interface APIResponse<T> {
  message?: string;
  success: boolean;
  data: T;
}

export function successResponse<T>(data: T, message?: string): APIResponse<T> {
  const response = { success: true, data, message };
  return response;
}

interface APIErrorResponse {
  message?: string;
  success: false;
  error: string;
}

export function errorResponse(
  error: string,
  message?: string
): APIErrorResponse {
  return { success: false, message, error };
}
