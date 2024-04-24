import NavigationHeader from '@/components/common/header/NavigationHeader';
import CompareContainer from '@/container/compareDrinks/CompareContainer';
import RecentDrinksContainer from '@/container/compareDrinks/RecentDrinksContainer';

export default function CompareDrinksPage() {
  return (
    <main>
      <NavigationHeader title="음료별 카페인 비교하기" />
      <CompareContainer />
      <RecentDrinksContainer />
    </main>
  );
}
