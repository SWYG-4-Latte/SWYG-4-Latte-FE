import type { Metadata } from 'next';

import '../styles/globals.css';
import { pretendard } from '@/styles/fonts';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import ToastMessageContainer from '@/components/common/ToastMessageContainer';

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
        <ToastMessageContainer />
      </body>
    </html>
  );
}
