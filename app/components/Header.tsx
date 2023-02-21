import { IDashboard } from '@/models/DashboardData';
import Link from 'next/link';

async function getDashboard() {
  const res = await fetch(`${process.env.BASE_URL}/api/getDashboard`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Header() {
  const data: IDashboard = await getDashboard();
  return (
    <>
      <div className='header'>
        <h1>TOTAL: ${data.totalUSDT}</h1>
        <h1>Montant par trans: ${data.maxAmount}</h1>
        <h1>Derniere maj: {data.updateTime}</h1>
      </div>
      <div className='header'>
        <Link href='/'>Active</Link>
        <Link href='/lastEvent'>Dernier event</Link>
      </div>
    </>
  );
}
