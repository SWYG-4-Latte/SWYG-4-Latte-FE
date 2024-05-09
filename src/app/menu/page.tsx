import CategoryHeader from '@/components/category/CategoryHeader';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import CategoryMainContainer from '@/container/category/CategoryMainContainer';

export default function MenuListPage() {
  return (
    <div>
      <CategoryHeader />
      <CategoryMainContainer />
      <BottomNavigation />
    </div>
  );
}
