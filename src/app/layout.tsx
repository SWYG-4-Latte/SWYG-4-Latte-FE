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
    <html lang="kr">
      <body className={`layout ${pretendard.className}`}>
        {children}
        {/* <BottomNavigation /> */}
      </body>
    </html>
  );
}
