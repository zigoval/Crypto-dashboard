// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ActiveEvent, CryptoEvent } from '@/models/CryptoEvent.dto';
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
    const activeEvents: CryptoEvent[] = await CryptoEvent.find({
      active: true,
    });
    const data: ActiveEvent[] = activeEvents.map((e) => {
      return {
        symbol: e.symbol,
        cost: parseFloat(e.buy.price),
        total: +e.currentProfit,
        transactTime: e.transactTime,
        estimation:
          (parseFloat(e.buy.price) * parseFloat(e.currentProfit)) / 100,
        signalType: e.signalType,
      };
    });
    res.json(data);
  } catch (error: any) {
    console.error(error);
    throw new Error(error).message;
  }
}
