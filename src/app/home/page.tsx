import axios from 'axios';

import HomeMainContainer from '@/container/home/HomeMainContainer';
import RankingContainer from '@/container/home/RankingContainer';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu/brand`);
  const brandList = data.data;

  return (
    <div className="pt-14">
      <HomeMainContainer />
      <RankingContainer brandList={brandList} />
    </div>
  );
}
