import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import HomeHeader from '@/components/home/HomeHeader';

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
