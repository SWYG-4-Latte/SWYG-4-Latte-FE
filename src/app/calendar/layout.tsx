import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '카페인 달력',
  description:
    '"사용자가 매일 기록한 카페인 양을 달력에서 확인할 수 있고, 섭취량 기준에 따른 적절성 여부를 판단 후 안내합니다.',
  keywords: '달력, 섭취량, 기준, 맞춤 정보',
};

export default function CaffeineCalendarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
