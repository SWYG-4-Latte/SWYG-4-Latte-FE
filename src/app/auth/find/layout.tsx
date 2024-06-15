import Tabs from '@/components/auth/find/Tabs';
import NavigationHeader from '@/components/common/header/NavigationHeader';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-20">
      <NavigationHeader title="아이디 / 비밀번호 찾기">
        <Tabs />
      </NavigationHeader>
      {children}
    </div>
  );
}
