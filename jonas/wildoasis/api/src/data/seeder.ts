import database from '../config/database';
import logger from '../config/logger';
import Cabin from '../models/cabins.model';
import cabins from './cabins';

const importData = async (): Promise<void> => {
  try {
    database.connect();
    await Cabin.deleteMany();
    await Cabin.insertMany(cabins);
    logger.success('Data imported!');
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error importing Data:', error);
    }
    process.exit(1);
  } finally {
    database.disconnect();
  }
  process.exit(0);
};

const destroyData = async (): Promise<void> => {
  try {
    database.connect();
    await Cabin.deleteMany();
    await Cabin.insertMany(cabins);
    logger.success('Data imported!');
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error importing Data:', error);
    }
    process.exit(1);
  } finally {
    database.disconnect();
  }
  process.exit(0);
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
