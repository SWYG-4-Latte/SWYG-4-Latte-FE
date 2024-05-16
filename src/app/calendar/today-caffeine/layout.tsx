import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오늘 마신 카페인 | 라떼 핏',
  description: '사용자가 기록한 당일 마신 음료 전체를 한눈에 확인할 수 있습니다.',
  keywords: '오늘 마신 음료, 기록',
};

export default function TodayCaffeineLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
