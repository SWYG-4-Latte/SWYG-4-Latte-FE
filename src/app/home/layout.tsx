import { Metadata } from 'next';

import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import HomeHeader from '@/components/home/HomeHeader';

export const metadata: Metadata = {
  title: '홈',
  description: '사용자에게 적절한 하루 카페인 권장량, 최근 마신 음료 기록, 라떼 핏 내 인기 음료를 확인할 수 있습니다.',
  keywords:
    '라떼 핏, 라떼, 아메리카노 카페인, 카페인, 카페인 섭취량, 하루 카페인 ,권장량, 최근 마신 음료, 비교함, 인기 랭킹',
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-20">
      <HomeHeader />
      {children}
      <BottomNavigation />
    </div>
  );
}
