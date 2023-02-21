import { ActiveEvent, CryptoEvent } from '@/models/CryptoEvent.dto';
import moment from 'moment';
import 'moment/locale/fr';

const formatDate = (date: number) => moment(date).format('Do MMM HH:mm');

async function getActive() {
  const res = await fetch(`${process.env.BASE_URL}/api/getActive`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const data: ActiveEvent[] = await getActive();

  // function getTotal(e: CryptoEvent) {
  //   let total = 0;
  //   if (e.active && e.currentProfit) total = +e.currentProfit;
  //   else total = getAllGains(e) - parseFloat(e.buy.price);

  //   return (
  //     <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-left'>
  //       {total.toFixed(2)}
  //     </div>
  //   );
  // }

  // function getEstimation(e: CryptoEvent) {
  //   const t = (parseFloat(e.buy.price) * parseFloat(e.currentProfit)) / 100;

  //   return (
  //     <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-right'>
  //       {t.toFixed(2)} $
  //     </div>
  //   );
  // }

  return (
    <main>
      <div className='flex flex-col py-4 px-24 max-h-screen'>
        <h1 className='text-lg pt-3'>
          Crypto Dashboard - {data.length} Actifs
        </h1>
        <h2 className='text-lg py-3'>
          ${data.reduce((acc, cur) => acc + cur.estimation, 0).toFixed(2)}
        </h2>
        <div className='flex flex-col h-full overflow-hidden'>
          <div className='grow overflow-y-auto'>
            <div className='table border-collapse table-fixed text-sm w-full '>
              <div className='table-header-group'>
                <div className='table-row'>
                  <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 '>
                    Symbol
                  </div>
                  <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 text-left'>
                    Time
                  </div>
                  <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 text-left'>
                    Type
                  </div>
                  <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 text-left'>
                    Cost
                  </div>
                  <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 text-left'>
                    Gain
                  </div>
                  <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 text-right'>
                    Estimation
                  </div>
                </div>
              </div>
              <div className='table-row-group'>
                {data.map((e, i) => (
                  <div className='table-row' key={e.transactTime}>
                    <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-left'>
                      {formatSymbol(e.symbol)}
                    </div>
                    <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-left'>
                      {formatDate(e.transactTime)}
                    </div>
                    <div className='table-cell font-medium p-2 pl-8 pt-0 pb-3 text-slate-400 text-left'>
                      {e.signalType}
                    </div>
                    <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-left'>
                      ${e.cost.toFixed(2)}
                    </div>
                    <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-left'>
                      {e.total}%
                    </div>
                    <div className='table-cell border-slate-100 p-2 pl-8 text-slate-500 text-right'>
                      ${e.estimation.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const formatSymbol = (sym: string) => {
  const symbol = sym.substring(0, sym.indexOf('USDT'));
  return (
    <p className='font-bold'>
      {symbol}
      <small className='font-normal'>/USDT</small>
    </p>
  );
};
