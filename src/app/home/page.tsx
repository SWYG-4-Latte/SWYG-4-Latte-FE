import DrinkHistoryContainer from '@/container/Home/DrinkHistoryContainer';
import HomeBannerContainer from '@/container/Home/HomeBannerContainer';
import RankingContainer from '@/container/Home/RankingContainer';

export default function HomePage() {
  return (
    <div className="pt-14">
      <HomeBannerContainer />
      <DrinkHistoryContainer />
      <RankingContainer />
    </div>
  );
}
