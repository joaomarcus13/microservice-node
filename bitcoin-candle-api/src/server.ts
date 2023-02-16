import { config } from 'dotenv';
import { app } from './app';
import { connection } from 'mongoose';
import { connectToMongoDB } from './config/db';
import CandleMessageChannel from './messages/CandleMessageChannel';
config();
const PORT = process.env.PORT;

const createServer = async () => {
  await connectToMongoDB();
  const server = app.listen(PORT, () => {
    console.log(`app running at ${PORT}`);
  });

  const candleMsgChannel = new CandleMessageChannel(server);

  candleMsgChannel.consumeMessages();

  process.on('SIGINT', async () => {
    await connection.close();
    server.close();
    console.log('server closed');
  });
};

createServer();
