import DrinkHistoryContainer from '@/container/home/DrinkHistoryContainer';
import HomeBannerContainer from '@/container/home/HomeBannerContainer';
import RankingContainer from '@/container/home/RankingContainer';

export default function HomePage() {
  return (
    <div className="pt-14">
      <HomeBannerContainer />
      <DrinkHistoryContainer />
      <RankingContainer />
    </div>
  );
}
