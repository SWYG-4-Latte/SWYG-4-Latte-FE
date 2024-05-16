import type { Metadata, Viewport } from 'next';

import '../styles/globals.css';
import { pretendard } from '@/styles/fonts';
import ToastMessageContainer from '@/components/common/ToastMessageContainer';

export const metadata: Metadata = {
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
    <html lang="kr">
      <body className={`layout ${pretendard.className}`}>
        <div id="modal-root" />
        <main>{children}</main>
        <ToastMessageContainer />
      </body>
    </html>
  );
}
