import type { Metadata } from 'next';

import '../styles/globals.css';
import { pretendard } from '@/styles/fonts';
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
      <body className={pretendard.className}>
        <div id="modal-root"></div>
        <main className="layout">{children}</main>
        <ToastMessageContainer />
      </body>
    </html>
  );
}
