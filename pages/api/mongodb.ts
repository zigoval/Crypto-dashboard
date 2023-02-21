//IMPORT MONGOOSE
import mongoose, { Model } from 'mongoose';

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { MONGODB_URI } = process.env;

const event = new mongoose.Schema({
  unitprice: String,
  qty: String,
  price: String,
  commission: String,
  commissionAsset: String,
});

// OUR CryptoEvent SCHEMA
const CryptoEventSchema = new mongoose.Schema(
  {
    symbol: String,
    transactTime: Number,
    active: Boolean,
    signalType: String,
    buy: event,
    targetOne: event,
    targetTwo: event,
    targetThree: event,
    close: event,
    currentPrice: Number,
    currentProfit: String,
    maxPrice: Number,
  },
  { collection: 'CryptoEvent' }
);

const DashboardSchema = new mongoose.Schema(
  {
    totalUSDT: Number,
    maxAmount: Number,
    updateTime: String,
  },
  { collection: 'Dashboard' }
);

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGODB_URI as string, {})
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR CryptoEvent MODEL
  const CryptoEvent =
    mongoose.models.CryptoEvent ||
    mongoose.model('CryptoEvent', CryptoEventSchema);

  // OUR CryptoEvent MODEL
  const Dashboard =
    mongoose.models.Dashboard || mongoose.model('Dashboard', DashboardSchema);

  return { conn, CryptoEvent, Dashboard };
};
