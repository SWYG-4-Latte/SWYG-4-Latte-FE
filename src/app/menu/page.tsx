import { Suspense } from 'react';

import CategoryHeader from '@/components/menu/CategoryHeader';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import SearchListSkeleton from '@/components/common/skeleton/SearchListSkeleton';
import CategoryMainContainer from '@/container/menu/CategoryMainContainer';
import MenuFilterContainer from '@/container/menu/MenuFilterContainer';

export default async function MenuListPage({
  searchParams,
}: {
  searchParams: {
    brand: string;
    filter?: string;
  };
}) {
  const brand = searchParams.brand ?? 'starbucks';
  const filter = searchParams.filter || '';

  return (
    <>
      <CategoryHeader />
      <MenuFilterContainer />
      <Suspense fallback={<SearchListSkeleton />}>
        <CategoryMainContainer brand={brand} filter={filter} />
      </Suspense>
      <BottomNavigation />
    </>
  );
}