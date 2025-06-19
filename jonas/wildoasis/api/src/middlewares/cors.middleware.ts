import { CorsOptions } from 'cors';
import configApp from '../config/environment';

export function createCorsOptions(): CorsOptions {
  const allowedOrigins = configApp.server.corsOrigins;
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  const allowedHeaders = ['Content-Type', 'Authorization', 'X-Requested-With'];
  const exposedHeaders = ['Authorization'];
  const allowCredentials = true;
  const optionsSuccessStatus = 204;

  return {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS policy violation: Origin '${origin}' not allowed`),
          false
        );
      }
    },
    allowedHeaders,
    methods: allowedMethods,
    exposedHeaders,
    credentials: allowCredentials,
    optionsSuccessStatus,
  };
}
