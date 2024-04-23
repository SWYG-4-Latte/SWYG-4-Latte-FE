import HomeHeader from '@/components/home/HomeHeader';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray02 pb-20">
      <HomeHeader />
      {children}
    </div>
  );
}
