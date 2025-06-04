import database from './config/database';
import { server } from './config/environment';
import logger from './config/logger';
import { createApp } from './createApp';

// Connect to DB
database.connectDB();

const app = createApp();
const { port } = server;

app.listen(port, () => {
  logger.server(port);
});
