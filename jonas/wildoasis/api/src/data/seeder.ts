import database from '../config/database';
import logger from '../config/logger';
import Bookings from '../models/bookings.model';
import Cabin from '../models/cabins.model';
import Settings from '../models/settings.model';
import bookings from './bookings';

const importData = async (): Promise<void> => {
  try {
    database.connect();
    // await Cabin.deleteMany();
    // await Cabin.insertMany(cabins);
    await Bookings.insertMany(bookings);

    // await Settings.create({});

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
    await Settings.deleteMany();
    logger.success('Data deleted!');
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error deleting Data:', error);
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
