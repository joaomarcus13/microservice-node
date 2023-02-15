import { config } from "dotenv";
import { Channel, connect } from "amqplib";
config();

export const createMessageChannel = async (): Promise<Channel> => {
  try {
    const connection = await connect(process.env.AMQP_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME);
    console.log("connect success");
    return channel;
  } catch (error) {
    console.log("error connect rabbitmq");
    return null;
  }
};
