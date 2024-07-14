'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import apiInstance from '@/api/instance';
import { REDIRECT_URI } from '@/constants/auth/oauth';
import useLoginStore from '@/store/loginStore';

export default function KakaoRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setLogin } = useLoginStore();

  const code = searchParams.get('code');

  const handleLogin = useCallback(async () => {
    if (code) {
      const { data } = await apiInstance.get('/auth/login/oauth', {
        params: {
          code,
          redirectUri: REDIRECT_URI,
        },
      });

      setLogin(data.data.jwtToken);
      router.replace('/onboarding');
    } else {
      router.push('/not-found');
    }
  }, [code]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return (
    <>
      <div className="loading loading-spinner loading-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primaryOrange"></div>
    </>
  );
}
