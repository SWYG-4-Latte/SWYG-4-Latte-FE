import HomeHeader from '@/components/Header/HomeHeader';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen pb-20">
      <HomeHeader />
      {children}
    </div>
  );
}
