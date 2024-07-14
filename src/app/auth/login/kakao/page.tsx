'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import apiInstance from '@/api/instance';
import useLoginStore from '@/store/loginStore';
import Loading from '@/app/loading';

export default function KakaoRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { setLogin } = useLoginStore();

  const code = searchParams.get('code');

  const handleLogin = useCallback(async () => {
    if (code && window) {
      const { data } = await apiInstance.get('/auth/login/oauth', {
        params: {
          code,
          redirectUri: window.location.origin + '/auth/login/kakao',
        },
      });

      setLogin(data.data.jwtToken);
      if (data.data.kakaoSignUp) {
        router.replace('/onboarding');
      } else {
        router.replace('/home');
      }
    } else {
      router.push('/not-found');
    }
  }, [code, router, setLogin]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

  return <Loading />;
}
