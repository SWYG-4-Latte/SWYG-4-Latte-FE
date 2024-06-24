'use client';

import { useEffect } from 'react';

import useMemberStore from '@/store/memberStore';
import { fetchMemberInfo } from '@/utils/mypage/isMember';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setMemberInfo } = useMemberStore();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const loadMemberInfo = async () => {
        const { member, caffeinIntake } = await fetchMemberInfo();

        setMemberInfo({ ...member, caffeineIntake: caffeinIntake });
      };

      loadMemberInfo();
    }
  }, [setMemberInfo]);

  return <>{children}</>;
}
