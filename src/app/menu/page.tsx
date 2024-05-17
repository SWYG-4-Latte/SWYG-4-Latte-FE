import { Suspense } from 'react';
import { Metadata } from 'next';

import CategoryHeader from '@/components/menu/CategoryHeader';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import SearchListSkeleton from '@/components/common/skeleton/SearchListSkeleton';
import CategoryMainContainer from '@/container/menu/CategoryMainContainer';
import MenuFilterContainer from '@/container/menu/MenuFilterContainer';

export const metadata: Metadata = {
  title: '카테고리',
  description:
    '브랜드 별 카페인이 많은 순, 적은 순으로 음료를 조회할 수 있습니다. 개별 음료 클릭 시 세부 페이지로 이동 가능합니다.',
  keywords: '카테고리, 스타벅스, 컴포즈, 투썸플레이스, 빽다방, 이디야, 카페인 많은 순, 카페인 적은 순',
};

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
