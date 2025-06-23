import { config } from 'dotenv';
import logger from './logger';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const {
  PORT,
  NODE_ENV,
  CORS_ORIGINS,
  MONGO_DB_NAME,
  MONGODB_URI,
  JWT_COOKIE_NAME,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} = process.env;

console.log();
const nodeEnv =
  NODE_ENV ||
  (() => {
    logger.warn('NODE_ENV not set, defaulting to development');
    return 'development';
  })();

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

interface AWSS3Config {
  accessKey: string;
  secretAccessKey: string;
  bucketName: string;
}

interface ConfigInterface {
  server: ServerConfig;
  jwt: JwtConfig;
  mongo: MongoConfig;
  aws: AWSS3Config;
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

  // AWS settings
  aws: {
    accessKey: AWS_ACCESS_KEY!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
    bucketName: AWS_BUCKET_NAME!,
  },
};

export const { server, jwt, mongo, aws } = configApp;
export default configApp;
