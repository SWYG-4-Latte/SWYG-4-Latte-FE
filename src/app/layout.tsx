import type { Metadata } from 'next';
import '../styles/globals.css';
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation';

export const metadata: Metadata = {
  title: 'LatteFit',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="flex items-center justify-center " lang="kr">
      <body className={`h-screen w-[360px] bg-gray03 px-5 font-pretendard`}>
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
