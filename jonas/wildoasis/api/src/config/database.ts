import mongoose from 'mongoose';
import configApp from './environment';
import logger from './logger';

interface DatabaseConfig {
  connect: () => {};
  disconnect: () => {};
  isConnected: () => {};
}

const database: DatabaseConfig = {
  connect: async (): Promise<void> => {
    const options = {
      autoIndex: configApp.server.nodeEnv !== 'production',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    try {
      console.log(configApp.mongo);
      // connect to DB
      await mongoose.connect(configApp.mongo.uri, options);
      logger.success('Connected to MongoDB');

      // Set connection States with listeners
      if (!mongoose.connection.listeners('connected').length) {
        mongoose.connection.on('connected', () =>
          logger.info(`Connected to DB: ${configApp.mongo.dbName}`)
        );
        mongoose.connection.on('error', (error) =>
          logger.error('Mongoose connection error', error)
        );
        mongoose.connection.on('disconnected', () =>
          logger.error('Mongoose connection disconnected')
        );

        // Handle gracefull shutdown for multiple signals
        const gracefulShutdown = async (signal: string) => {
          logger.info(`Received ${signal}. Closing MongoDB connection...`);
          try {
            database.disconnect();
            process.exit(0);
          } catch (error) {
            logger.error('Error closing MongoDB connection', error as Error);
            process.exit(1);
          }
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
      }
    } catch (error) {
      if (error instanceof Error)
        logger.error('MongoDB connection error', error);

      process.exit(1);
    }
  },

  disconnect: async (): Promise<void> => {
    try {
      await mongoose.disconnect();
      logger.success('Disconnected successfully from MongoDB!');
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Error disconnecting from MongoDB', error);
      }
    }
  },

  isConnected: (): boolean => {
    const connected = mongoose.connection.readyState === 1;
    logger.success(`Health check successful. Connectd: ${connected}`);
    return connected;
  },
};

export default database;
