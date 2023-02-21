export interface Event {
  unitprice: string;
  qty: string;
  price: string;
  commission: string;
  commissionAsset: string;
}

export interface CryptoEvent {
  _id: string;
  symbol: string;
  transactTime: number;
  active: Boolean;
  signalType: string;
  buy: Event;
  targetOne: Event;
  targetTwo: Event;
  targetThree: Event;
  close: Event;
  currentPrice: number;
  currentProfit: string;
  maxPrice: number;
}

export interface ActiveEvent {
  symbol: string;
  transactTime: number;
  cost: number;
  total: number;
  estimation: number;
  signalType: string;
}

export interface ClosedEvent {
  symbol: string;
  transactTime: number;
  cost: number;
  gain: number;
  pourc: number;
  signalType: string;
}
