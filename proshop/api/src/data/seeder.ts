import database from '../config/database';
import logger from '../config/logger';
import Order from '../models/order.model';
import Product from '../models/product.model';
import User from '../models/user.model';
import products from './products';
import users from './users';

const importData = async (): Promise<void> => {
  try {
    database.connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    logger.success('Data imported!');
  } catch (error) {
    if (error instanceof Error) logger.error('Error importing data: ', error);
    process.exit(1);
  } finally {
    database.disconnectDB();
  }
};

const destroyData = async (): Promise<void> => {
  try {
    database.connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    logger.success('Data destroyed!');
  } catch (error) {
    if (error instanceof Error) logger.error('Error destroying data: ', error);
    process.exit(1);
  } finally {
    database.disconnectDB();
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
