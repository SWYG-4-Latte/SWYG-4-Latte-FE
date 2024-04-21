import Header from '@/components/Header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen pb-20">
      <Header />
      {children}
    </div>
  );
}
