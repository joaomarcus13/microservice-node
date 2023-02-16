import { config } from 'dotenv';
import axios from 'axios';
import Period from './enums/Period';
import Candle from './models/Candle';
import { createMessageChannel } from './messages/messageChannel';

config();

const readMarketPrice = async (): Promise<number> => {
  try {
    const { data } = await axios.get(process.env.PRICES_API as string);
    const price = data.bitcoin.usd;
    console.log(price);
    return price;
  } catch (error) {
    console.log(error);
  }
};

const generateCandles = async () => {
  const messageChannel = await createMessageChannel();
  if (!messageChannel) return;
  while (true) {
    const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS;
    const candle = new Candle('BTC');

    console.log('--------------------------------');
    console.log('generating new candle');

    for (let i = 0; i < loopTimes; i++) {
      const price = await readMarketPrice();
      candle.addValue(price);
      console.log(`Market price #${i + 1} of ${loopTimes}`);
      await new Promise(r => setTimeout(r, Period.TEN_SECONDS));
    }

    candle.closeCandle();
    console.log('candle close');
    const candleObj = candle.toSimpleObject();
    console.log(candleObj);
    const candleJson = JSON.stringify(candleObj);
    messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson));
    console.log('send to queue');
  }
};

generateCandles();
