// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IDashboard } from '@/models/DashboardData';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from './mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { Dashboard } = await connect();
    // const doneEvents = await CryptoEvent.find({ active: false })
    //   .sort({ transactTime: 'desc' })
    //   .limit(20);
    const dashboard: IDashboard | null = await Dashboard.findOne({});

    res.json(dashboard!);
  } catch (error: any) {
    console.error(error);
    throw new Error(error).message;
  }
}
