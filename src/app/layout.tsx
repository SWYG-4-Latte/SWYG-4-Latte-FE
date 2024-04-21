import type { Metadata } from 'next';

import '../styles/globals.css';
import BottomNavigation from '@/components/BottomNavigation/BottomNavigation';
import { pretendard } from '@/styles/fonts';

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
    <html className={`flex items-center justify-center ${pretendard.variable} font-pretendard`} lang="kr">
      <body className="w-[360px] bg-gray03">
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
