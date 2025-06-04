import mongoose from 'mongoose';
import { mongo, server } from './environment';
import logger from './logger';

const database = {
  connectDB: async (): Promise<void> => {
    const options = {
      autoIndex: server.nodeEnv !== 'production',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    try {
      // Connect to DB
      await mongoose.connect(mongo.uri, options);
      logger.success('MongoDB connection was successful!');

      // Set connection states (only set once, not on every connect call)
      if (!mongoose.connection.listeners('connected').length) {
        mongoose.connection.on('connected', () =>
          logger.info(`Connected to DB: ${mongo.dbName}`)
        );
        mongoose.connection.on('error', (error) =>
          logger.error('Mongoose connection error', error)
        );
        mongoose.connection.on('disconnected', () =>
          logger.error('Mongoose connection disconnected')
        );

        // Handle graceful shutdown for multiple signals
        const gracefulShutdown = async (signal: string) => {
          logger.info(`Received ${signal}. Closing MongoDB connection...`);
          try {
            await mongoose.connection.close();
            logger.info('MongoDB connection closed successfully');
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
        logger.error('MongoDB connection error: ', error);
      process.exit(1);
    }
  },

  disconnectDB: async (): Promise<void> => {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from MongoDB successfully');
    } catch (error) {
      if (error instanceof Error)
        logger.error('Error disconnecting from MongoDB', error);
    }
  },

  // Simple health check helper
  isConnected: (): boolean => {
    return mongoose.connection.readyState === 1;
  },
};

export default database;
