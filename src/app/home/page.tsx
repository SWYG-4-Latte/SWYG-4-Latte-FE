import HomeMainContainer from '@/container/home/HomeMainContainer';
import RankingContainer from '@/container/home/RankingContainer';
import apiInstance from '@/api/instance';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data } = await apiInstance.get('/menu/brand');
  const brandList = data.data;

  return (
    <div className="pt-14">
      <HomeMainContainer />
      <RankingContainer brandList={brandList} />
    </div>
  );
}
