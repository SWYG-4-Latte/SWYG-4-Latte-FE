import DrinkHistoryContainer from '@/container/Home/DrinkHistoryContainer';
import HomeBannerContainer from '@/container/Home/HomeBannerContainer';

export default function HomePage() {
  return (
    <div>
      <HomeBannerContainer />
      <DrinkHistoryContainer />
    </div>
  );
}
