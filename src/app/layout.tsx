import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

import '../styles/globals.css';
import { pretendard } from '@/styles/fonts';
import ToastMessageContainer from '@/components/common/ToastMessageContainer';
import Modals from '@/components/common/modal/Modals';

export const metadata: Metadata = {
  metadataBase: new URL('https://lattefit.swygbro.com'),
  title: {
    template: '%s | 라떼 핏 ',
    default: '라떼 핏',
  },
  description: '나에게 핏한 카페인 관리, 라떼 핏의 조언 한 잔으로 시작하세요.',
  openGraph: {
    title: '라떼 핏',
    siteName: '라떼 핏(Latte Fit)',
    description: '나에게 핏한 카페인 관리, 라떼 핏의 조언 한 잔으로 시작하세요.',
    type: 'website',
    url: 'https://lattefit.swygbro.com',
  },
};

export const viewport: Viewport = {
  themeColor: '#FCFAF8',
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={pretendard.className}>
      <body className="layout">
        <div id="modal-root">
          <Modals />
        </div>
        <main>{children}</main>
        <ToastMessageContainer />
        <Script src="https://cdn.swygbro.com/public/widget/swyg-widget.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
