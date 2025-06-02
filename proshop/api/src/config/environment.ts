import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const {
  PORT,
  NODE_ENV,
  CORS_ORIGINS,
  // JWT Config
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_COOKIE_NAME,
  // MongoDB Config
  MONGO_URI,
  MONGO_DB_NAME,
} = process.env;

const nodeEnv =
  NODE_ENV ||
  (() => {
    console.warn('NODE_ENV not set, defaulting to development');
    return 'development';
  })();

interface ServerConfig {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  corsOrigins: string[];
}

interface JwtConfig {
  secret: string;
  expiresIn: string | number;
  cookieName: string;
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
const configSetup: ConfigInterface = {
  // Server settings
  server: {
    port: PORT ? parseInt(PORT, 10) : 5000,
    // Node.js Environment
    nodeEnv: (nodeEnv as 'development') || 'production' || 'test',
    // CORS settings
    corsOrigins: CORS_ORIGINS
      ? CORS_ORIGINS.split(',')
      : ['http://localhost:5174'],
  },

  jwt: {
    cookieName: JWT_COOKIE_NAME || 'authToken',
    expiresIn: JWT_EXPIRES_IN || '24h',
    secret: JWT_SECRET!,
  },

  mongo: {
    dbName: MONGO_DB_NAME || 'test',
    uri: MONGO_URI!,
  },
};

// Export individual config sections for convenience
export const { server, jwt, mongo } = configSetup;
export default configSetup;
