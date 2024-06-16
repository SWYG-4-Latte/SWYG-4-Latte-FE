'use client';

import { useRouter } from 'next/navigation';

import Tabs from '@/components/auth/find/Tabs';
import NavigationHeader from '@/components/common/header/NavigationHeader';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <div className="pb-20">
      <NavigationHeader title="아이디 / 비밀번호 찾기" onGoBack={() => router.push('/auth/login')}>
        <Tabs />
      </NavigationHeader>
      <section className="px-5 pt-[104px]">{children}</section>
    </div>
  );
}
