import HomeMainContainer from '@/container/home/HomeMainContainer';
import RankingContainer from '@/container/home/RankingContainer';

export default function HomePage() {
  return (
    <div className="pt-14">
      <HomeMainContainer />
      <RankingContainer />
    </div>
  );
}
