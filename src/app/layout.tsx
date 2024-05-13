import type { Metadata, Viewport } from 'next';

import '../styles/globals.css';
import { pretendard } from '@/styles/fonts';
import ToastMessageContainer from '@/components/common/ToastMessageContainer';

export const metadata: Metadata = {
  title: 'LatteFit',
  description: '',
};

export const viewport: Viewport = {
  themeColor: '#FCFAF8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`layout ${pretendard.className}`}>
        <div id="modal-root" />
        <main>{children}</main>
        <ToastMessageContainer />
      </body>
    </html>
  );
}
