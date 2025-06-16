import database from './config/database';
import configApp from './config/environment';
import logger from './config/logger';
import { createApp } from './createApp';

// Connect to DB
database.connect();

const app = createApp();

const { port } = configApp.server;

app.listen(port, () => {
  logger.server(port);
});
