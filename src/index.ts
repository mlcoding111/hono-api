import app from './app';
import { connectMongoDB } from './db/mongo-db';
import { config } from './config/env.config';


const startServer = async () => {

  // await connectMongoDB();

  Bun.serve({
    fetch: app.fetch,
    port: config.PORT,
  });

  console.log(`Server running on http://localhost:${config.PORT}`);
};

startServer();