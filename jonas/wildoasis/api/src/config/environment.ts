import { config } from 'dotenv';

config({ path: `.env.{process.env.NODE_ENV} || 'development'` });

const {
  PORT,
  NODE_ENV,
  CORS_ORIGINS,
  MONGO_DB_NAME,
  MONGODB_URI,
  JWT_COOKIE_NAME,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} = process.env;

const nodeEnv =
  NODE_ENV ||
  (() => {
    console.warn('NODE_ENV not set, defaulting to development');
    return 'development';
  });

interface ServerConfig {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  corsOrigins: string[];
}

interface JwtConfig {
  secret: string;
  cookieName: string;
  expiresIn: string | number;
}

interface MongoConfig {
  uri: string;
  dbName: string;
}

interface ConfigInterface {
  server: ServerConfig;
  jwt: JwtConfig;
  mongo: MongoConfig;
}

/**
 * Environment configuration object with type safety
 */

const configApp: ConfigInterface = {
  // Server settings
  server: {
    port: PORT ? parseInt(PORT) : 3000,
    // CORS settings
    corsOrigins: CORS_ORIGINS
      ? CORS_ORIGINS.split(',')
      : ['http://localhost:5173'],
    // Node.js environment
    nodeEnv: (nodeEnv as 'development') || 'production' || 'test',
  },

  // JWT settings
  jwt: {
    cookieName: JWT_COOKIE_NAME || 'authToken',
    expiresIn: JWT_EXPIRES_IN || '24h',
    secret: JWT_SECRET!,
  },

  // MongoDB settings
  mongo: {
    dbName: MONGO_DB_NAME || 'test',
    uri: MONGODB_URI!,
  },
};

export const { server, jwt, mongo } = configApp;
export default configApp;
