import DrinkHistoryContainer from '@/container/Home/DrinkHistoryContainer';
import HomeBannerContainer from '@/container/Home/HomeBannerContainer';

export default function HomePage() {
  return (
    <div className="pt-14">
      <HomeBannerContainer />
      <DrinkHistoryContainer />
    </div>
  );
}
