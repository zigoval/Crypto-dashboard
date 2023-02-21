// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ActiveEvent,
  ClosedEvent,
  CryptoEvent,
} from '@/models/CryptoEvent.dto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from './mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { CryptoEvent } = await connect();
    // const doneEvents = await CryptoEvent.find({ active: false })
    //   .sort({ transactTime: 'desc' })
    //   .limit(20);
    const closedEvents: CryptoEvent[] = await CryptoEvent.find({
      active: false,
    })
      .limit(20)
      .sort({ transactTime: 'desc' });
    const data: ClosedEvent[] = closedEvents.map((e) => {
      const gain = getAllGains(e);
      return {
        symbol: e.symbol,
        cost: parseFloat(e.buy.price),
        gain,
        transactTime: e.transactTime,
        pourc: (parseFloat(e.buy.price) * gain) / 100,
        signalType: e.signalType,
      };
    });
    res.json(data);
  } catch (error: any) {
    console.error(error);
    throw new Error(error).message;
  }
}

function getAllGains(e: CryptoEvent): number {
  let gain = -parseFloat(e.buy.price);
  console.log(e);
  if (e.targetOne) {
    gain += parseFloat(e.targetOne.price);
  }
  if (e.targetTwo) {
    gain += parseFloat(e.targetTwo.price);
  }
  if (e.targetThree) {
    gain += parseFloat(e.targetThree.price);
  }
  if (e.close) {
    gain += parseFloat(e.close.price);
  }
  return gain;
}
