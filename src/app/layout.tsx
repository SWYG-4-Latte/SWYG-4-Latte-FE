<<<<<<< HEAD
import type { Metadata } from "next";
import "../styles/globals.css";
=======
import type { Metadata } from 'next';

import '../styles/globals.css';
import { pretendard } from '@/styles/fonts';
import BottomNavigation from '@/components/common/bottomNavigation/BottomNavigation';
import ToastMessageContainer from '@/components/common/ToastMessageContainer';
>>>>>>> develop

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
<<<<<<< HEAD
    <html className="flex justify-center items-center" lang="kr">
      <body className="w-[360px] h-screen bg-gray02">
=======
    <html lang="kr">
      <body className={`layout ${pretendard.className}`}>
>>>>>>> develop
        {children}
        {/* <BottomNavigation /> */}
        <ToastMessageContainer />
      </body>
    </html>
  );
}
