import { server } from './config/environment';
import { createApp } from './createApp';

const app = createApp();

const { port } = server;

app.listen(port, () => {
  console.log(`Running on Port: ${port}`);
});
