import type { Metadata } from 'next';

import '../styles/globals.css';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
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
    <html className="flex items-center justify-center" lang="kr">
      <body className={`w-[360px] bg-gray03 ${pretendard.variable} font-pretendard leading-normal -tracking-[0.01em]`}>
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
